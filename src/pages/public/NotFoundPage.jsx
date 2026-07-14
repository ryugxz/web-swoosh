import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-swoosh-black flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-serif italic text-swoosh-gold mb-4">404</h1>
      <p className="text-white/60 text-lg mb-8 uppercase tracking-[0.2em]">Page not found</p>
      <Link 
        to={ROUTES.HOME}
        className="border border-swoosh-gold text-swoosh-gold px-8 py-3 text-xs uppercase tracking-widest hover:bg-swoosh-gold/10 transition-all"
      >
        Return to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
