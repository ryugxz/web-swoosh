import React from 'react';
import logo from './images/logo-swoosh.png';

function Home() {
  return (
    <div className="relative min-h-screen bg-swoosh-black overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-swoosh-gold/10 rounded-full blur-[120px]"></div>

      <div className="relative pt-32 px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="md:w-1/2 mt-10">
          <div className="inline-block border border-swoosh-gold/40 px-3 py-1 mb-8">
            <span className="text-swoosh-gold text-[10px] uppercase tracking-[0.4em] font-light">
              • PRO CLUBS • 
            </span>
          </div>
          
          <h1 className="text-white text-7xl md:text-9xl font-serif italic leading-none mb-4">The</h1>
          <h1 className="text-swoosh-gold text-7xl md:text-9xl font-serif uppercase tracking-widest leading-none mb-10">
            Swoosh
          </h1>
          
          <p className="text-swoosh-gold italic tracking-[0.3em] text-lg font-light mb-12 opacity-80">
            ELEGANCE • POWER • GLORY
          </p>

          <div className="flex gap-4">
            <button 
              onClick={() => document.getElementById('squad-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-swoosh-gold text-black px-8 py-4 font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Meet The Squad
            </button>
            {/* <a 
              href="https://fifathailand.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-swoosh-gold/50 text-swoosh-gold px-8 py-4 font-bold uppercase tracking-widest hover:bg-swoosh-gold/10 transition-all text-center"
            >
              View Leagues
            </a> */}
          </div>
        </div>

        {/* Right Content - Logo Showcase */}
        <div className="md:w-1/2 flex justify-center mt-20 md:mt-0">
          <img 
            src={logo} 
            alt="Swoosh Club Logo"
            className="w-72 h-72 md:w-96 md:h-96 object-contain drop-shadow-[0_0_60px_rgba(197,160,89,0.4)] transition-all duration-500" 
          />
        </div>
      </div>

      {/* Stats Footer (รูปด้านล่างของรูปที่ 1) */}
      <div className="absolute bottom-0 w-full border-t border-white/10 grid grid-cols-3 py-8 bg-black/40 backdrop-blur-sm">
        <div className="text-center border-r border-white/10">
          <h3 className="text-swoosh-gold text-2xl font-serif">16</h3>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Players</p>
        </div>
        <div className="text-center border-r border-white/10">
          <h3 className="text-swoosh-gold text-2xl font-serif">02</h3>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Active Leagues</p>
        </div>
        <div className="text-center">
          <h3 className="text-swoosh-gold text-2xl font-serif">2024</h3>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Established</p>
        </div>
      </div>
    </div>
  );
}

export default Home;