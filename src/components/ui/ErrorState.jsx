/**
 * ErrorState - Displayed when an error occurs
 */
function ErrorState({ message = 'Something went wrong', onRetry = null }) {
  return (
    <div className="min-h-screen bg-swoosh-black flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border border-red-500/30 flex items-center justify-center">
        <span className="text-red-500 text-xl">!</span>
      </div>
      <p className="text-white/60 text-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="border border-swoosh-gold/30 text-swoosh-gold px-6 py-2 text-xs uppercase tracking-widest hover:bg-swoosh-gold/10 transition-all"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
