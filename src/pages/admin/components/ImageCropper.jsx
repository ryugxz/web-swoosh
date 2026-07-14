import Cropper from 'react-easy-crop';

function ImageCropper({ imageToCrop, crop, zoom, setCrop, setZoom, onCropComplete, onConfirm, onCancel }) {
  return (
    <div className="md:col-span-2 fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-2xl h-[65vh] bg-swoosh-card border border-white/10">
        <Cropper
          image={imageToCrop}
          crop={crop}
          zoom={zoom}
          aspect={3 / 4}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      
      {/* Zoom Slider */}
      <div className="mt-6 w-full max-w-xs flex flex-col items-center gap-2">
        <div className="flex justify-between w-full text-[10px] text-white/40 uppercase tracking-widest">
          <span>Zoom</span>
          <span>{Number(zoom).toFixed(1)}x</span>
        </div>
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-swoosh-gold"
        />
      </div>

      <div className="mt-8 flex gap-4">
        <button 
          type="button"
          onClick={onConfirm}
          className="bg-swoosh-gold text-black px-10 py-3 font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(197,160,89,0.3)]"
        >
          Crop & Use Image
        </button>
        <button 
          type="button"
          onClick={onCancel}
          className="border border-white/20 px-10 py-3 font-bold uppercase tracking-widest text-white hover:bg-white/5 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ImageCropper;
