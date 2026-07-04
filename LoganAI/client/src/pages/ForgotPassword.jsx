import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiOutlineMail, HiOutlineSparkles, HiOutlineArrowLeft } from 'react-icons/hi';
import { forgotPasswordRequest } from '../api/authApi';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await forgotPasswordRequest({ email });
      setSubmitted(true);
      toast.success('Check your email for reset instructions');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white px-6 py-12 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-primary-400/20 blur-3xl animate-blob" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card relative w-full max-w-md rounded-3xl p-8 sm:p-10"
      >
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg">
            <HiOutlineSparkles className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold gradient-text">LOGAN AI</span>
        </Link>

        {!submitted ? (
          <>
            <h1 className="text-center text-2xl font-extrabold text-gray-900 dark:text-white">
              Forgot your password?
            </h1>
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              Enter your email and we&apos;ll send you instructions to reset it.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="relative">
                  <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-field pl-11"
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? <LoadingSpinner size="sm" /> : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div className="mt-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <HiOutlineMail className="h-7 w-7" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Check your inbox</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              If an account exists for <strong>{email}</strong>, you&apos;ll receive password reset
              instructions shortly.
            </p>
          </div>
        )}

        <Link
          to="/login"
          className="mt-8 flex items-center justify-center gap-1.5 text-sm font-semibold text-primary-500 hover:underline"
        >
          <HiOutlineArrowLeft /> Back to login
        </Link>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
