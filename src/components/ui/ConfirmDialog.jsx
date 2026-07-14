import ModalBase from './ModalBase';

/**
 * ConfirmDialog - Reusable confirmation modal
 * Replaces window.confirm() with a themed dialog
 */
function ConfirmDialog({ isOpen, onClose, onConfirm, title = 'Confirm', message = 'Are you sure?', confirmText = 'Confirm', cancelText = 'Cancel' }) {
  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      <div className="bg-swoosh-card border border-white/10 p-8 max-w-md w-full mx-4">
        <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-4">{title}</h3>
        <p className="text-white/60 text-sm mb-8">{message}</p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="border border-white/20 px-6 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/5 transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-swoosh-gold text-black px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </ModalBase>
  );
}

export default ConfirmDialog;
