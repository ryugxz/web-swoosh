/**
 * Footer - Site footer
 * Extracted from App.jsx for reuse in layouts
 */
function Footer() {
  return (
    <section className="bg-swoosh-black text-white py-24 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center text-[10px] text-white/20 uppercase tracking-[0.3em] gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-swoosh-gold rounded-full"></div>
          <span>Swoosh • Pro Clubs</span>
        </div>
        <div>© 2026 — All Rights Reserved</div>
      </div>
    </section>
  );
}

export default Footer;
