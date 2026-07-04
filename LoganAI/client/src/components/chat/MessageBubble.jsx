import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  HiOutlineClipboardCopy,
  HiOutlineCheck,
  HiOutlineRefresh,
  HiOutlineVolumeUp,
  HiOutlineVolumeOff,
  HiOutlineSparkles,
  HiOutlineUser,
} from 'react-icons/hi';

/**
 * Renders a single chat message bubble (user or assistant), with markdown
 * rendering, syntax-highlighted code blocks, copy-to-clipboard, and
 * (for the latest assistant message) a regenerate button.
 */
const MessageBubble = ({ message, isLatestAssistant, onRegenerate, speech }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (speech.isSpeaking) {
      speech.stopSpeaking();
    } else {
      speech.speak(message.content.replace(/[*#`]/g, ''));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 px-4 py-5 ${isUser ? '' : 'bg-gray-50/70 dark:bg-gray-900/40'}`}
    >
      <div
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white shadow-md ${
          isUser
            ? 'bg-gradient-to-br from-gray-500 to-gray-700'
            : 'bg-gradient-to-br from-primary-500 to-accent-500'
        }`}
      >
        {isUser ? <HiOutlineUser className="h-4 w-4" /> : <HiOutlineSparkles className="h-4 w-4" />}
      </div>

      <div className="min-w-0 flex-1">
        <p className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
          {isUser ? 'You' : 'LOGAN AI'}
        </p>

        <div className="markdown-content max-w-none text-[15px] leading-relaxed text-gray-800 dark:text-gray-200">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="relative">
                    <div className="flex items-center justify-between rounded-t-xl bg-gray-800 px-4 py-2 text-xs text-gray-300">
                      <span>{match[1]}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(String(children));
                          toast.success('Code copied');
                        }}
                        className="flex items-center gap-1 hover:text-white"
                      >
                        <HiOutlineClipboardCopy /> Copy
                      </button>
                    </div>
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ margin: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        {!isUser && (
          <div className="mt-2 flex items-center gap-3 text-gray-400">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs hover:text-primary-500"
              title="Copy response"
            >
              {copied ? <HiOutlineCheck className="text-green-500" /> : <HiOutlineClipboardCopy />}
              {copied ? 'Copied' : 'Copy'}
            </button>

            {speech.isTTSSupported && (
              <button
                onClick={handleSpeak}
                className="flex items-center gap-1 text-xs hover:text-primary-500"
                title="Read aloud"
              >
                {speech.isSpeaking ? <HiOutlineVolumeOff /> : <HiOutlineVolumeUp />}
                {speech.isSpeaking ? 'Stop' : 'Listen'}
              </button>
            )}

            {isLatestAssistant && (
              <button
                onClick={onRegenerate}
                className="flex items-center gap-1 text-xs hover:text-primary-500"
                title="Regenerate response"
              >
                <HiOutlineRefresh /> Regenerate
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
