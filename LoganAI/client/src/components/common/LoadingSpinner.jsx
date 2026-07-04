const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-4',
};

/**
 * Simple animated gradient-ring loading spinner.
 */
const LoadingSpinner = ({ size = 'md', className = '' }) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-solid border-primary-500 border-t-transparent ${sizeMap[size]} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

export default LoadingSpinner;
