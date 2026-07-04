import { useState, useEffect, useRef } from 'react';
import { HiOutlinePaperAirplane, HiOutlineMicrophone, HiOutlineStop } from 'react-icons/hi';
import toast from 'react-hot-toast';

/**
 * Text input for composing chat messages. Supports auto-resize,
 * Enter-to-send (Shift+Enter for newline), microphone dictation,
 * and a "stop generating" state while the AI is responding.
 */
const ChatInput = ({ onSend, isGenerating, onStop, speech }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  // Sync dictated speech transcript into the input field
  useEffect(() => {
    if (speech.transcript) {
      setText(speech.transcript);
    }
  }, [speech.transcript]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [text]);

  const handleSend = () => {
    if (!text.trim() || isGenerating) return;
    onSend(text.trim());
    setText('');
    speech.setTranscript('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMicClick = () => {
    if (!speech.isSupported) {
      toast.error('Speech recognition is not supported in this browser');
      return;
    }
    if (speech.isListening) {
      speech.stopListening();
    } else {
      speech.startListening();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white/90 p-4 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/90">
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-gray-300 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <button
          onClick={handleMicClick}
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-colors ${
            speech.isListening
              ? 'animate-pulse bg-red-500 text-white'
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title="Voice input"
        >
          <HiOutlineMicrophone className="h-5 w-5" />
        </button>

        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={speech.isListening ? 'Listening...' : 'Message LOGAN AI...'}
          className="max-h-48 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-gray-900 outline-none placeholder-gray-400 dark:text-gray-100"
        />

        {isGenerating ? (
          <button
            onClick={onStop}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500 text-white transition-transform hover:scale-105"
            title="Stop generating"
          >
            <HiOutlineStop className="h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-md transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            title="Send message"
          >
            <HiOutlinePaperAirplane className="h-5 w-5 rotate-90" />
          </button>
        )}
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-gray-400">
        LOGAN AI can make mistakes. Consider checking important information.
      </p>
    </div>
  );
};

export default ChatInput;
