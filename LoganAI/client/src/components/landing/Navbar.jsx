import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX, HiOutlineSparkles } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg">
            <HiOutlineSparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold gradient-text">LOGAN AI</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <button onClick={() => navigate('/chat')} className="btn-primary !py-2.5 !px-5">
              Go to Chat
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-gray-700 hover:text-primary-500 dark:text-gray-200"
              >
                Log In
              </Link>
              <Link to="/signup" className="btn-primary !py-2.5 !px-5">
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="text-2xl text-gray-700 dark:text-gray-200 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </nav>

      {isOpen && (
        <div className="glass mx-4 mb-4 flex flex-col gap-4 rounded-2xl p-6 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              {link.label}
            </a>
          ))}
          <hr className="border-gray-300 dark:border-gray-700" />
          {user ? (
            <button onClick={() => navigate('/chat')} className="btn-primary w-full">
              Go to Chat
            </button>
          ) : (
            <>
              <Link to="/login" className="btn-secondary w-full">
                Log In
              </Link>
              <Link to="/signup" className="btn-primary w-full">
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
