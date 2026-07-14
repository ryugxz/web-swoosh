/**
 * PageHeader - Reusable section header pattern
 * Matches the subtitle + title pattern used in Squad, Kit, League, Connect sections
 */
function PageHeader({ subtitle, title, centered = true }) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      {subtitle && (
        <p className="text-swoosh-gold tracking-[0.4em] uppercase text-[10px] mb-4">
          {subtitle}
        </p>
      )}
      {title && (
        <h2 className="text-6xl font-serif italic text-swoosh-gold">{title}</h2>
      )}
    </div>
  );
}

export default PageHeader;
