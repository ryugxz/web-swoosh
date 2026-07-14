/**
 * EmptyState - Displayed when a list or section has no data
 */
function EmptyState({ title = 'No data found', description = '', icon = null }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {icon && <div className="text-swoosh-gold/30 mb-4">{icon}</div>}
      <h3 className="text-white/60 text-lg font-serif mb-2">{title}</h3>
      {description && (
        <p className="text-white/30 text-sm max-w-md">{description}</p>
      )}
    </div>
  );
}

export default EmptyState;
