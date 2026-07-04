import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlineChat,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineLogout,
  HiOutlineCog,
  HiOutlineUserCircle,
  HiOutlineMenuAlt2,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { renameChatRequest, deleteChatRequest } from '../../api/chatApi';

/**
 * Sidebar showing chat history with search, rename, delete, and new chat actions.
 */
const Sidebar = ({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onChatsUpdate,
  isOpen,
  onToggle,
}) => {
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const filteredChats = useMemo(() => {
    if (!search.trim()) return chats;
    return chats.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));
  }, [chats, search]);

  const startRename = (chat) => {
    setEditingId(chat._id);
    setEditTitle(chat.title);
  };

  const confirmRename = async (id) => {
    if (!editTitle.trim()) {
      setEditingId(null);
      return;
    }
    try {
      const { data } = await renameChatRequest(id, editTitle.trim());
      onChatsUpdate(chats.map((c) => (c._id === id ? data : c)));
      toast.success('Chat renamed');
    } catch {
      toast.error('Failed to rename chat');
    } finally {
      setEditingId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteChatRequest(id);
      onChatsUpdate(chats.filter((c) => c._id !== id));
      if (activeChatId === id) onNewChat();
      toast.success('Chat deleted');
    } catch {
      toast.error('Failed to delete chat');
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-gray-200 bg-white/95 backdrop-blur-xl transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900/95 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onNewChat}
            className="btn-primary flex-1 !py-2.5 text-sm"
          >
            <HiOutlinePlus /> New Chat
          </button>
          <button onClick={onToggle} className="ml-2 text-gray-500 lg:hidden">
            <HiOutlineMenuAlt2 className="h-6 w-6" />
          </button>
        </div>

        <div className="px-4 pb-2">
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="input-field !py-2 pl-9 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          {filteredChats.length === 0 ? (
            <p className="mt-8 text-center text-sm text-gray-400">
              {search ? 'No matching conversations' : 'No conversations yet'}
            </p>
          ) : (
            <ul className="space-y-1">
              {filteredChats.map((chat) => (
                <li key={chat._id}>
                  <div
                    className={`group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors cursor-pointer ${
                      activeChatId === chat._id
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => editingId !== chat._id && onSelectChat(chat._id)}
                  >
                    <HiOutlineChat className="h-4 w-4 flex-shrink-0" />
                    {editingId === chat._id ? (
                      <input
                        autoFocus
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && confirmRename(chat._id)}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 rounded border border-primary-400 bg-transparent px-1 py-0.5 text-sm outline-none"
                      />
                    ) : (
                      <span className="flex-1 truncate">{chat.title}</span>
                    )}

                    {editingId === chat._id ? (
                      <div className="flex gap-1">
                        <button onClick={(e) => { e.stopPropagation(); confirmRename(chat._id); }}>
                          <HiOutlineCheck className="h-4 w-4 text-green-500" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); setEditingId(null); }}>
                          <HiOutlineX className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    ) : (
                      <div className="hidden gap-1 group-hover:flex">
                        <button onClick={(e) => { e.stopPropagation(); startRename(chat); }}>
                          <HiOutlinePencil className="h-4 w-4 text-gray-400 hover:text-primary-500" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(chat._id); }}>
                          <HiOutlineTrash className="h-4 w-4 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-sm font-bold text-white">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                user?.name?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <HiOutlineUserCircle /> Profile
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <HiOutlineCog /> Settings
            </button>
            <button
              onClick={logout}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <HiOutlineLogout /> Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
