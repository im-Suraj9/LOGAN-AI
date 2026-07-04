import { useState, useEffect, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineMenuAlt2, HiOutlineSparkles } from 'react-icons/hi';
import Sidebar from '../components/chat/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import ChatInput from '../components/chat/ChatInput';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useSpeech from '../hooks/useSpeech';
import {
  sendMessageRequest,
  getChatHistoryRequest,
  getChatByIdRequest,
  regenerateResponseRequest,
} from '../api/chatApi';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const abortRef = useRef(false);
  const speech = useSpeech();

  // Load chat history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const { data } = await getChatHistoryRequest();
        setChats(data);
      } catch {
        toast.error('Failed to load chat history');
      } finally {
        setLoadingHistory(false);
      }
    };
    loadHistory();
  }, []);

  const handleNewChat = useCallback(() => {
    setActiveChatId(null);
    setMessages([]);
    setSidebarOpen(false);
  }, []);

  const handleSelectChat = useCallback(async (chatId) => {
    setSidebarOpen(false);
    setActiveChatId(chatId);
    try {
      const { data } = await getChatByIdRequest(chatId);
      setMessages(data.messages);
    } catch {
      toast.error('Failed to load conversation');
    }
  }, []);

  const handleSend = useCallback(
    async (text) => {
      abortRef.current = false;
      const userMessage = { role: 'user', content: text, _id: `temp-${Date.now()}` };
      setMessages((prev) => [...prev, userMessage]);
      setIsGenerating(true);

      try {
        const { data } = await sendMessageRequest({ message: text, chatId: activeChatId });

        if (abortRef.current) return; // Stopped by user

        if (!activeChatId) {
          setActiveChatId(data.chatId);
          setChats((prev) => [
            { _id: data.chatId, title: data.title, lastMessageAt: new Date().toISOString() },
            ...prev,
          ]);
        } else {
          setChats((prev) =>
            prev.map((c) =>
              c._id === activeChatId ? { ...c, lastMessageAt: new Date().toISOString() } : c
            )
          );
        }

        setMessages((prev) => [...prev, data.message]);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to get a response');
        setMessages((prev) => prev.filter((m) => m._id !== userMessage._id));
      } finally {
        setIsGenerating(false);
      }
    },
    [activeChatId]
  );

  const handleStop = useCallback(() => {
    abortRef.current = true;
    setIsGenerating(false);
    toast('Generation stopped', { icon: '⏹️' });
  }, []);

  const handleRegenerate = useCallback(async () => {
    if (!activeChatId) return;
    setIsGenerating(true);
    try {
      const { data } = await regenerateResponseRequest(activeChatId);
      setMessages((prev) => {
        const withoutLastAssistant = [...prev];
        if (withoutLastAssistant[withoutLastAssistant.length - 1]?.role === 'assistant') {
          withoutLastAssistant.pop();
        }
        return [...withoutLastAssistant, data.message];
      });
    } catch {
      toast.error('Failed to regenerate response');
    } finally {
      setIsGenerating(false);
    }
  }, [activeChatId]);

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onChatsUpdate={setChats}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-800 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600 dark:text-gray-300">
            <HiOutlineMenuAlt2 className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-white">
              <HiOutlineSparkles className="h-4 w-4" />
            </div>
            <span className="font-bold gradient-text">LOGAN AI</span>
          </div>
        </header>

        {loadingHistory ? (
          <div className="flex flex-1 items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <ChatWindow
            messages={messages}
            isGenerating={isGenerating}
            onRegenerate={handleRegenerate}
            onSuggestionClick={handleSend}
            speech={speech}
          />
        )}

        <ChatInput onSend={handleSend} isGenerating={isGenerating} onStop={handleStop} speech={speech} />
      </div>
    </div>
  );
};

export default Chat;
