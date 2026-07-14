function ConnectSection() {
  return (
    <section className="bg-swoosh-black text-white py-24 px-8 border-t border-white/5">
      <div className="max-w-5xl mx-auto border border-white/10 p-12 md:p-20 relative overflow-hidden bg-gradient-to-br from-swoosh-card to-black">
        
        {/* Background Glow */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-swoosh-gold/5 rounded-full blur-[80px]"></div>

        <p className="text-swoosh-gold tracking-[0.4em] uppercase text-[10px] mb-6">Connect</p>
        <h2 className="text-6xl md:text-7xl font-serif italic mb-4">Join The <span className="text-swoosh-gold">Swoosh</span></h2>
        
        <p className="text-gray-400 text-lg font-light mb-12 max-w-2xl">
          ติดตามข่าวสารแมตช์ ไฮไลต์ คุยกันเรื่องแทคติก หรือมาร่วมทีมกับเรา — เลือกช่องทางที่ถนัดได้เลย
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="https://www.facebook.com/profile.php?id=61557700601275" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-6 bg-black/50 border border-white/10 p-6 hover:border-swoosh-gold/50 transition-all group"
          >
            <div className="opacity-50 group-hover:opacity-100 group-hover:text-swoosh-gold transition-all">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold tracking-wider">Facebook</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">Follow our page</p>
            </div>
          </a>

          <a 
            href="https://discord.gg/82gJ2W9pp" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-6 bg-black/50 border border-white/10 p-6 hover:border-swoosh-gold/50 transition-all group"
          >
            <div className="opacity-50 group-hover:opacity-100 group-hover:text-swoosh-gold transition-all">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m7 18 3-3h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2v3Z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold tracking-wider">Discord</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">Join the squad</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ConnectSection;
