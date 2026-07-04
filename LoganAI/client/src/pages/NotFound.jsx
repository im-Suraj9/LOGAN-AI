import { Link } from 'react-router-dom';
import { HiOutlineHome, HiOutlineSparkles } from 'react-icons/hi';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white via-primary-50/30 to-white px-6 text-center dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-xl">
        <HiOutlineSparkles className="h-8 w-8" />
      </div>
      <h1 className="text-6xl font-extrabold gradient-text">404</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link to="/" className="btn-primary mt-8">
        <HiOutlineHome /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
