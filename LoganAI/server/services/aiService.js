const axios = require('axios');

/**
 * AI Service Layer
 * Abstracts communication with an OpenAI-compatible chat completions API.
 * Configured entirely through environment variables so the underlying
 * provider can be swapped (OpenAI, Azure OpenAI, OpenRouter, local LLMs, etc.)
 * without changing any application code.
 */

const AI_BASE_URL = process.env.AI_BASE_URL || 'https://api.openai.com/v1';
const AI_API_KEY = process.env.AI_API_KEY || '';
const AI_MODEL = process.env.AI_MODEL || 'gpt-4o-mini';

/**
 * Sends a conversation to the configured AI provider and returns the assistant's reply.
 * @param {Array<{role: 'user'|'assistant'|'system', content: string}>} messages
 * @returns {Promise<string>} the assistant's text response
 */
const getAIResponse = async (messages) => {
  // If no API key is configured, return a helpful mock response so the app
  // remains fully functional for local development/demo purposes.
  if (!AI_API_KEY) {
    return generateMockResponse(messages);
  }

  try {
    const response = await axios.post(
      `${AI_BASE_URL}/chat/completions`,
      {
        model: AI_MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful, friendly, and knowledgeable virtual assistant. Provide clear, concise, and accurate answers. Use markdown formatting (including code blocks with language tags) when appropriate.',
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1500,
      },
      {
        headers: {
          Authorization: `Bearer ${AI_API_KEY}`,
          'Content-Type': 'application/json',
          "HTTP-Referer": "http://localhost:5173"
        },
        timeout: 60000,
      }
    );

    const reply = response.data?.choices?.[0]?.message?.content;
    if (!reply) {
      throw new Error('No response received from AI provider');
    }
    return reply.trim();
  } catch (error) {
    const providerMessage =
      error.response?.data?.error?.message || error.message || 'Unknown AI provider error';
    console.error('AI Service Error:', providerMessage);
    throw new Error(`AI service failed: ${providerMessage}`);
  }
};

/**
 * Provides a lightweight, deterministic mock reply when no AI_API_KEY is set.
 * This keeps the app demoable out-of-the-box without external dependencies.
 */
const generateMockResponse = (messages) => {
  const lastUserMessage =
    [...messages].reverse().find((m) => m.role === 'user')?.content || '';

  return (
    `I'm currently running in **demo mode** because no \`AI_API_KEY\` was configured on the server.\n\n` +
    `You asked: _"${lastUserMessage}"_\n\n` +
    `To enable real AI responses, set \`AI_API_KEY\`, \`AI_BASE_URL\`, and \`AI_MODEL\` in your server's \`.env\` file. ` +
    `This service layer is compatible with OpenAI and any OpenAI-compatible API (Azure OpenAI, OpenRouter, local LLM servers, etc.).\n\n` +
    '```js\n// Example .env configuration\nAI_API_KEY=sk-...\nAI_BASE_URL=https://api.openai.com/v1\nAI_MODEL=gpt-4o-mini\n```'
  );
};

module.exports = { getAIResponse };
