import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants';
import logo from '../../assets/images/logo-swoosh.png';

/**
 * Navbar - Main site navigation
 * Moved from src/components/Navbar.jsx with dead code removed
 */
function Navbar() {
  const { isAuthenticated, isAdmin, profile, logout } = useAuth();

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-swoosh-black/80 backdrop-blur-md border-b border-swoosh-gold/20 px-8 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <img src={logo} alt="Swoosh Logo" className="w-8 h-8 object-contain" />
        <span className="text-swoosh-gold tracking-[0.3em] font-serif uppercase text-lg">Swoosh</span>
      </Link>
      
      <div className="hidden md:flex gap-8 text-white/70 uppercase tracking-widest text-xs font-light">
        <a 
          href="#squad-section" 
          onClick={(e) => handleScroll(e, 'squad-section')}
          className="hover:text-swoosh-gold transition-colors"
        >
          Squad
        </a>
        <a 
          href="#kit-section" 
          onClick={(e) => handleScroll(e, 'kit-section')}
          className="hover:text-swoosh-gold transition-colors"
        >
          Kit
        </a>
        <a 
          href="#league-section" 
          onClick={(e) => handleScroll(e, 'league-section')}
          className="hover:text-swoosh-gold transition-colors"
        >
          Leagues
        </a>
        <a 
          href="#connect-section" 
          onClick={(e) => handleScroll(e, 'connect-section')}
          className="hover:text-swoosh-gold transition-colors"
        >
          Connect
        </a>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link 
                to="/admin"
                className="border border-white/10 px-4 py-2 hover:border-swoosh-gold hover:text-swoosh-gold transition-all cursor-pointer text-[10px]"
              >
                Manage Squad
              </Link>
            )}
            <Link to={ROUTES.PROFILE} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                {profile?.photoURL ? (
                  <img src={profile.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-swoosh-gold text-xs font-bold">{profile?.displayName?.charAt(0).toUpperCase() || '?'}</span>
                )}
              </div>
              <span className="hidden md:block text-white text-xs">{profile?.displayName}</span>
            </Link>
            <button 
              onClick={() => logout()}
              className="text-white/50 hover:text-swoosh-gold text-xs uppercase tracking-widest transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link 
              to={ROUTES.LOGIN}
              className="text-white/70 hover:text-swoosh-gold text-xs uppercase tracking-widest transition-colors"
            >
              Login
            </Link>
            <Link 
              to={ROUTES.REGISTER}
              className="bg-swoosh-gold text-black px-6 py-1.5 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all"
            >
              Join Us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
