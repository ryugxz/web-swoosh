import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo-swoosh.png';

function Navbar() {
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
        <Link 
          to="/admin"
          className="border border-white/10 px-4 py-2 hover:border-swoosh-gold hover:text-swoosh-gold transition-all cursor-pointer text-[10px]"
        >
          Manage Squad
        </Link>
        <button className="bg-swoosh-gold text-black px-6 py-1.5 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all">
          Join Us
        </button>
      </div>
    </nav>
  );
}

export default Navbar;


<button 
    onClick={() => document.getElementById('squad-section')?.scrollIntoView({ behavior: 'smooth' })}
    className="bg-swoosh-gold text-black px-8 py-4 font-bold uppercase tracking-widest hover:scale-105 transition-transform"
>
    Meet The Squad
</button>