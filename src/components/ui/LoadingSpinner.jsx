/**
 * LoadingSpinner - Swoosh-themed loading indicator
 * Replaces inline "Loading..." text across the app
 */
function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen bg-swoosh-black flex flex-col items-center justify-center gap-4">
      <div className="w-8 h-8 border-2 border-swoosh-gold/30 border-t-swoosh-gold rounded-full animate-spin"></div>
      <p className="text-swoosh-gold uppercase tracking-[0.5em] text-xs">{message}</p>
    </div>
  );
}

export default LoadingSpinner;
