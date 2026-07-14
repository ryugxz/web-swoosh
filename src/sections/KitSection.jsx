import kitSwoosh from '../assets/images/IMG_7891.png';

function KitSection() {
  return (
    <section className="bg-swoosh-black text-white py-24 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        <div className="w-full lg:w-1/2 relative group">
          <div className="absolute top-4 left-4 z-10 bg-swoosh-gold text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
            Official Jersey
          </div>
          <div className="relative overflow-hidden border border-white/10 p-4 bg-[#f5f5f5]">
            <img 
              src={kitSwoosh} 
              alt="Swoosh FC Jersey" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-8 right-8 w-12 h-12 opacity-20 contrast-125">
               <div className="w-full h-full border-2 border-black rotate-45 flex items-center justify-center">
                  <span className="text-black text-[8px] -rotate-45 font-bold">SWO</span>
               </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <p className="text-swoosh-gold tracking-[0.4em] uppercase text-xs mb-4">The Jersey</p>
          <h2 className="text-6xl md:text-7xl font-serif italic mb-2">Wear The</h2>
          <h2 className="text-6xl md:text-7xl font-serif italic text-swoosh-gold mb-8">Crest</h2>
          
          <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light max-w-xl">
            {/* เสื้อแข่งทางการของ SWOOSH FC ลายทางขาว-ดำคลาสสิก พร้อมตราสโมสรและตัวอักษรปักทอง 
            — สง่างาม เท่ และมีคลาส ลงสนามจริงในนามของสโมสร */}
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 pr-8 min-w-[140px]">
              <div className="w-8 h-8 bg-[#111111] border border-white/20"></div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Onyx</p>
                <p className="text-xs font-bold uppercase tracking-widest text-white">Color</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 pr-8 min-w-[140px]">
              <div className="w-8 h-8 bg-[#F2F2F2] border border-white/20"></div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Ivory</p>
                <p className="text-xs font-bold uppercase tracking-widest text-white">Color</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 pr-8 min-w-[140px]">
              <div className="w-8 h-8 bg-swoosh-gold"></div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Gold</p>
                <p className="text-xs font-bold uppercase tracking-widest text-white">Color</p>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-3 bg-swoosh-gold text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20.38 3.46L16 2a4 4 0 0 0-8 0L3.62 3.46a2 2 0 0 0-1.62 1.96V10a2 2 0 0 0 2 2h2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8h2a2 2 0 0 0 2-2V5.42a2 2 0 0 0-1.62-1.96z" />
            </svg>
            Buy Jersey
          </button>

        </div>

      </div>
    </section>
  );
}

export default KitSection;
