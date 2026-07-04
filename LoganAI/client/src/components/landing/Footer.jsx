import { Link } from 'react-router-dom';
import { HiOutlineSparkles } from 'react-icons/hi';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative border-t border-gray-200 py-12 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white">
                <HiOutlineSparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold gradient-text">LOGAN AI</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-gray-500 dark:text-gray-400">
              Your premium AI-powered virtual assistant for chat, ideas, and productivity.
            </p>
            <div className="mt-6 flex gap-4 text-gray-500 dark:text-gray-400">
              <a href="#" aria-label="Twitter" className="hover:text-primary-500">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-primary-500">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-primary-500">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-gray-900 dark:text-white">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#features" className="hover:text-primary-500">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary-500">Pricing</a></li>
              <li><a href="#how-it-works" className="hover:text-primary-500">How It Works</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-gray-900 dark:text-white">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#faq" className="hover:text-primary-500">FAQ</a></li>
              <li><a href="#contact" className="hover:text-primary-500">Contact</a></li>
              <li><Link to="/login" className="hover:text-primary-500">Log In</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
          © {new Date().getFullYear()} SURAJ - LOGAN AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
