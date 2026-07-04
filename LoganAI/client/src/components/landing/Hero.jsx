import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineSparkles, HiOutlineChatAlt2 } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-primary-400/30 blur-3xl animate-blob" />
        <div className="absolute top-40 right-1/4 h-96 w-96 rounded-full bg-accent-400/30 blur-3xl animate-blob [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-primary-300/20 blur-3xl animate-blob [animation-delay:4s]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
            <HiOutlineSparkles className="h-4 w-4" /> Meet your new AI companion
          </span>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Your Personal <span className="gradient-text">AI Assistant</span>,
            <br /> Always Ready to Help
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-300">
            LOGAN AI blends natural conversation, voice interaction, and lightning-fast
            intelligence into one premium experience — helping you write, brainstorm, code,
            and get things done.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to={user ? '/chat' : '/signup'} className="btn-primary text-base">
              {user ? 'Open Chat' : 'Start for Free'} <HiOutlineArrowRight />
            </Link>
            <a href="#how-it-works" className="btn-secondary text-base">
              See How It Works
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex -space-x-3">
              {['A', 'B', 'C', 'D'].map((letter, i) => (
                <div
                  key={letter}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-primary-400 to-accent-500 text-xs font-bold text-white dark:border-gray-950"
                  style={{ zIndex: 4 - i }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <span>Loved by 25,000+ users worldwide</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="glass-card relative w-full max-w-md rounded-3xl p-6 animate-float">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white">
                <HiOutlineChatAlt2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">LOGAN AI</p>
                <p className="text-xs text-green-500">● Online</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2.5 text-sm text-white shadow-md">
                Plan a 3-day trip to Kyoto
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-2.5 text-sm text-gray-800 shadow-md dark:bg-gray-800 dark:text-gray-100">
                Here&apos;s an itinerary — Day 1: Fushimi Inari & Gion district. Day 2: Arashiyama
                bamboo grove...
              </div>
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3 text-gray-500 dark:bg-gray-800 w-16">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-2xl bg-gradient-to-br from-accent-400 to-primary-500 opacity-80 blur-xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
