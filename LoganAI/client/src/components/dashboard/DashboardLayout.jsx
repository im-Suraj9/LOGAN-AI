import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineArrowLeft, HiOutlineUserCircle, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

/**
 * Shared layout wrapper for authenticated dashboard-style pages
 * (Profile, Settings) with a consistent top nav and back-to-chat link.
 */
const DashboardLayout = ({ children, title }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/dashboard', label: 'Profile', icon: HiOutlineUserCircle },
    { path: '/settings', label: 'Settings', icon: HiOutlineCog },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/20 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <header className="glass sticky top-0 z-20 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate('/chat')}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary-500 dark:text-gray-300"
          >
            <HiOutlineArrowLeft /> Back to Chat
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-white">
              <HiOutlineSparkles className="h-4 w-4" />
            </div>
            <span className="font-bold gradient-text">LOGAN AI</span>
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:underline"
          >
            <HiOutlineLogout /> Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="mb-8 text-3xl font-extrabold text-gray-900 dark:text-white">{title}</h1>

        <div className="mb-8 flex gap-2 border-b border-gray-200 dark:border-gray-800">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                location.pathname === tab.path
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <tab.icon /> {tab.label}
            </Link>
          ))}
        </div>

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
