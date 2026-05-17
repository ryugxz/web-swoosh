import React from 'react';

function League() {
  const leagues = [
    {
      name: "FIFA Thailand",
      description: "ลีกการแข่งขัน EAFC/FIFA ระดับประเทศประเทศไทย",
      status: "ACTIVE",
      link: "https://fifathailand.com/"
    },
    {
      name: "TEL Super League",
      description: "Thailand Esports League — Super League division",
      status: "ACTIVE",
      link: "https://www.telsuperleague.com/"
    }
  ];

  return (
    <section className="bg-swoosh-black text-white py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-swoosh-gold tracking-[0.4em] uppercase text-[10px] mb-4">Competitions</p>
          <h2 className="text-6xl font-serif italic text-swoosh-gold">Leagues & Cups</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leagues.map((league, index) => (
            <a 
              key={index} 
              href={league.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative bg-swoosh-card border border-white/10 p-8 hover:border-swoosh-gold/50 transition-all cursor-pointer block"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 border border-swoosh-gold/30 flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-swoosh-gold"
                  >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </div>
                <div className="text-white/30 group-hover:text-swoosh-gold transition-colors">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </div>
              </div>
              
              <div className="inline-block bg-swoosh-gold/10 border border-swoosh-gold/30 px-2 py-0.5 mb-4">
                <span className="text-swoosh-gold text-[9px] font-bold tracking-widest uppercase">{league.status}</span>
              </div>
              
              <h3 className="text-2xl font-serif mb-2 tracking-wide">{league.name}</h3>
              <p className="text-gray-500 text-sm font-light">{league.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default League;