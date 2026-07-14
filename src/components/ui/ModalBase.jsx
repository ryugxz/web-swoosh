import { useEffect } from 'react';

/**
 * ModalBase - Base modal wrapper with overlay
 * Provides consistent modal behavior (overlay, close on escape, scroll lock)
 */
function ModalBase({ isOpen, onClose, children, className = '' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/95" onClick={onClose}></div>
      <div className={`relative z-10 ${className}`}>
        {children}
      </div>
    </div>
  );
}

export default ModalBase;
