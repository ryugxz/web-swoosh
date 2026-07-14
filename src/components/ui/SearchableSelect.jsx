import { useState, useEffect, useRef } from 'react';

/**
 * SearchableSelect - Dropdown with search/filter capability
 * Extracted from AdminDashboard.jsx for reuse
 */
function SearchableSelect({ options, value, onSelect, placeholder, disabled, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(opt => 
    opt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className || ''}`} ref={dropdownRef}>
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`bg-black border border-white/10 p-3 flex justify-between items-center cursor-pointer transition-all ${isOpen ? 'border-swoosh-gold' : ''} ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
      >
        <span className={`text-sm ${value ? 'text-white' : 'text-white/40'}`}>{value || placeholder}</span>
        <svg className={`w-4 h-4 text-white/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
      </div>

      {isOpen && (
        <div className="absolute z-[110] w-full mt-1 bg-[#1a1a1a] border border-white/10 shadow-2xl max-h-60 overflow-y-auto">
          <div className="sticky top-0 bg-[#1a1a1a] p-2 border-b border-white/5">
            <input 
              type="text"
              autoFocus
              placeholder="Search..."
              className="w-full bg-black border border-white/10 p-2 outline-none focus:border-swoosh-gold text-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, idx) => (
                <div 
                  key={opt.isoCode || `${opt.name}-${idx}`}
                  onClick={() => {
                    onSelect(opt.name);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 hover:bg-swoosh-gold hover:text-black cursor-pointer text-xs transition-colors"
                >
                  {opt.name}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-white/30 text-xs">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchableSelect;
