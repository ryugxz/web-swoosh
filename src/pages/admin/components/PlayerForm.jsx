import SearchableSelect from '../../../components/ui/SearchableSelect';
import ImageCropper from './ImageCropper';
import { POSITIONS, PLAYER_STATUSES } from '../../../constants';

function PlayerForm({
  formData,
  handleChange,
  handleSubmit,
  editId,
  handleCancel,
  countries,
  provinces,
  fileInputRef,
  isCropping,
  imageToCrop,
  crop,
  setCrop,
  zoom,
  setZoom,
  onCropComplete,
  handleConfirmCrop,
  setIsCropping,
  previewUrl,
  selectedFile
}) {
  return (
    <div className="bg-swoosh-card border border-white/10 p-8 mb-12">
      <h2 className="text-xl mb-6 font-bold uppercase tracking-widest">{editId ? 'Edit Player' : 'Add New Player'}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="bg-black border border-white/10 p-3 focus:border-swoosh-gold outline-none transition-all" />
        <input type="number" name="number" placeholder="Number" value={formData.number} onChange={handleChange} required className="bg-black border border-white/10 p-3 focus:border-swoosh-gold outline-none transition-all" />
        <select name="position" value={formData.position} onChange={handleChange} className="bg-black border border-white/10 p-3 outline-none transition-all">
          {POSITIONS.map(pos => <option key={pos} value={pos}>{pos}</option>)}
        </select>
        <select name="status" value={formData.status} onChange={handleChange} className="bg-black border border-white/10 p-3 outline-none transition-all">
          {PLAYER_STATUSES.map(status => <option key={status.value} value={status.value}>{status.label}</option>)}
        </select>
        
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-white/40 uppercase">Birth Date</label>
          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="bg-black border border-white/10 p-3 focus:border-swoosh-gold outline-none transition-all w-full" />
        </div>
        <div className="flex flex-col gap-1"></div>

        <SearchableSelect 
          options={countries}
          value={formData.birthCountry}
          placeholder="Select Country"
          onSelect={(val) => handleChange({ target: { name: 'birthCountry', value: val } })}
        />

        <SearchableSelect 
          options={provinces}
          value={formData.birthProvince}
          placeholder="Select Province/State"
          disabled={!formData.birthCountry}
          onSelect={(val) => handleChange({ target: { name: 'birthProvince', value: val } })}
        />

        <label className="md:col-span-2 text-white/70 text-sm">อัปโหลดรูปภาพ:</label>
        <input type="file" name="photoFile" onChange={handleChange} ref={fileInputRef} accept="image/*" className="md:col-span-2 bg-black border border-white/10 p-3 focus:border-swoosh-gold outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-swoosh-gold file:text-black hover:file:bg-white" />

        {isCropping && (
          <ImageCropper
            imageToCrop={imageToCrop}
            crop={crop}
            zoom={zoom}
            setCrop={setCrop}
            setZoom={setZoom}
            onCropComplete={onCropComplete}
            onConfirm={handleConfirmCrop}
            onCancel={() => setIsCropping(false)}
          />
        )}

        {previewUrl && (
          <div className="md:col-span-2 flex flex-col items-center gap-3 p-4 border border-white/5 bg-white/5 rounded-lg">
            <p className="text-[10px] text-swoosh-gold uppercase tracking-[0.3em] font-bold">Image Preview</p>
            <div className="w-32 h-40 overflow-hidden rounded border border-swoosh-gold/40 shadow-xl">
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        <input type="text" name="instagram" placeholder="Instagram URL (Optional)" value={formData.instagram} onChange={handleChange} className="md:col-span-2 bg-black border border-white/10 p-3 outline-none" />
        <div className="md:col-span-2 flex gap-4">
          <button type="submit" className="bg-swoosh-gold text-black px-10 py-3 font-bold uppercase tracking-widest hover:bg-white transition-all">{editId ? 'Update' : 'Save Player'}</button>
          {(editId || selectedFile) && (
            <button 
              type="button" 
              onClick={handleCancel} 
              className="border border-white/20 px-10 py-3 font-bold uppercase tracking-widest"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PlayerForm;
