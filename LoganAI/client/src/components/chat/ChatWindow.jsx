import { useEffect, useRef } from 'react';
import { HiOutlineSparkles } from 'react-icons/hi';
import MessageBubble from './MessageBubble';

const suggestions = [
  'Explain quantum computing simply',
  'Write a Python function to reverse a string',
  'Draft a professional email to a client',
  'Give me 5 healthy breakfast ideas',
];

/**
 * Displays the scrolling message list for the active chat, including
 * an empty state with suggestion chips and a typing indicator while
 * the AI is generating a response.
 */
const ChatWindow = ({ messages, isGenerating, onRegenerate, onSuggestionClick, speech }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const lastAssistantIndex = [...messages]
    .map((m, i) => ({ ...m, i }))
    .reverse()
    .find((m) => m.role === 'assistant')?.i;

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-xl animate-float">
          <HiOutlineSparkles className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          How can I help you today?
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Ask me anything, or try one of these:
        </p>

        <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onSuggestionClick(s)}
              className="glass-card rounded-xl p-4 text-left text-sm text-gray-700 transition-transform hover:-translate-y-0.5 dark:text-gray-300"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-3xl">
        {messages.map((msg, idx) => (
          <MessageBubble
            key={msg._id || idx}
            message={msg}
            isLatestAssistant={idx === lastAssistantIndex && !isGenerating}
            onRegenerate={onRegenerate}
            speech={speech}
          />
        ))}

        {isGenerating && (
          <div className="flex gap-3 bg-gray-50/70 px-4 py-5 dark:bg-gray-900/40">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-md">
              <HiOutlineSparkles className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1 pt-2 text-gray-400">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
