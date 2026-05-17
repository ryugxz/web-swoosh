import React, { useState, useEffect, useRef, useCallback } from 'react';
import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import Cropper from 'react-easy-crop';
import playerProfile from './images/player-profile.png';
import { Country, State } from 'country-state-city';

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (error) => reject(error));
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = imageSrc;
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg');
  });
};

const SearchableSelect = ({ options, value, onSelect, placeholder, disabled, className }) => {
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
    <div className={`relative ${className}`} ref={dropdownRef}>
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
};

function AdminDashboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    position: 'GK',
    status: 'official',
    photoURL: '',
    instagram: '',
    birthProvince: '',
    birthCountry: '',
    birthDate: ''
  });

  const [countries] = useState(Country.getAllCountries());
  const [provinces, setProvinces] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const fileInputRef = useRef(null);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchPlayers = async () => {
    setLoading(true);
    const q = query(collection(db, "players"), orderBy("number", "asc"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPlayers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirmCrop = async () => {
    try {
      const croppedImageBlob = await getCroppedImg(imageToCrop, croppedAreaPixels);
      setSelectedFile(croppedImageBlob);
      setPreviewUrl(URL.createObjectURL(croppedImageBlob));
      setIsCropping(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'birthCountry') {
      const countryCode = countries.find(c => c.name === value)?.isoCode;
      
      setFormData(prev => ({ 
        ...prev, 
        birthCountry: value, 
        birthProvince: '' 
      }));

      if (countryCode) {
        setProvinces(State.getStatesOfCountry(countryCode));
      } else {
        setProvinces([]);
      }
      return;
    }

    if (name === 'photoFile') {
      const file = e.target.files[0];
      if (file) {
        // ตรวจสอบขนาดไฟล์ไม่ให้เกิน 2MB
        if (file.size > 2 * 1024 * 1024) {
          alert("ไฟล์รูปภาพมีขนาดใหญ่เกินไป (จำกัดไม่เกิน 2MB)");
          e.target.value = ''; 
          return;
        }
        setImageToCrop(URL.createObjectURL(file));
        setIsCropping(true);
      }
    } else {
      setFormData({ ...formData, [name]: name === 'number' ? Number(value) : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalPhotoURL = formData.photoURL;
    let thumbnailURL = '';

    try {
      if (selectedFile) {
        const data = new FormData();
        data.append("file", selectedFile);
        data.append("upload_preset", "swoosh_uploads");
        data.append("cloud_name", "dskqfmmgm");

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dskqfmmgm/image/upload`,
          { method: "POST", body: data }
        );
        
        const fileData = await res.json();
        
        finalPhotoURL = fileData.secure_url; 
        
        // f_auto,q_auto (ลดขนาดไฟล์) / c_fill,g_face (ตัดรูปเน้นใบหน้า)
        thumbnailURL = finalPhotoURL.replace('/upload/', '/upload/w_300,h_300,c_fill,g_face,f_auto,q_auto/');        
        alert("Image uploaded to Cloudinary successfully!");
      }

      const playerToSave = { 
        ...formData, 
        photoURL: finalPhotoURL, 
        thumbnailURL: thumbnailURL || finalPhotoURL // ถ้าไม่มีรูปใหม่ ให้ใช้รูปเดิม
      };

      if (editId) {
        await updateDoc(doc(db, "players", editId), playerToSave);
      } else {
        await addDoc(collection(db, "players"), playerToSave);
      }
      
      setEditId(null);
      setFormData({ 
        name: '', 
        number: '', 
        position: 'GK', 
        status: 'official', 
        photoURL: '', 
        instagram: '', 
        birthProvince: '', 
        birthCountry: '',
        birthDate: ''
      });
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchPlayers();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleEdit = (player) => {
    setEditId(player.id);
    const countryCode = countries.find(c => c.name === player.birthCountry)?.isoCode;
    if (countryCode) {
      setProvinces(State.getStatesOfCountry(countryCode));
    }
    setFormData({
      name: player.name,
      number: player.number || 0,
      position: player.position || 'GK',
      status: player.status || 'official',
      photoURL: player.photoURL || '',
      instagram: player.instagram || '',
      birthProvince: player.birthProvince || '',
      birthCountry: player.birthCountry || '',
      birthDate: player.birthDate || '',
    });
    setSelectedFile(null); // Clear any selected file when editing
    setPreviewUrl(player.photoURL || null);
    if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      await deleteDoc(doc(db, "players", id));
      fetchPlayers();
    }
  };

  if (loading) return <div className="min-h-screen bg-swoosh-black flex items-center justify-center text-swoosh-gold uppercase tracking-[0.5em]">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-swoosh-black text-white pt-32 px-8 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif italic text-swoosh-gold mb-10 underline underline-offset-8 decoration-white/10">Player Management</h1>

        <div className="bg-swoosh-card border border-white/10 p-8 mb-12">
          <h2 className="text-xl mb-6 font-bold uppercase tracking-widest">{editId ? 'Edit Player' : 'Add New Player'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="bg-black border border-white/10 p-3 focus:border-swoosh-gold outline-none transition-all" />
            <input type="number" name="number" placeholder="Number" value={formData.number} onChange={handleChange} required className="bg-black border border-white/10 p-3 focus:border-swoosh-gold outline-none transition-all" />
            <select name="position" value={formData.position} onChange={handleChange} className="bg-black border border-white/10 p-3 outline-none transition-all">
              <option value="GK">GK</option><option value="DEF">DEF</option><option value="MID">MID</option><option value="FWD">FWD</option>
            </select>
            <select name="status" value={formData.status} onChange={handleChange} className="bg-black border border-white/10 p-3 outline-none transition-all">
              <option value="official">Official Roster</option><option value="spare">Spare Player</option>
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

            {/* <input 
              type="text" 
              name="photoURL" 
              placeholder="Photo URL (Optional)" 
              value={formData.photoURL} 
              onChange={handleChange} 
              className="md:col-span-2 bg-black border border-white/10 p-3 focus:border-swoosh-gold outline-none transition-all" 
            /> */}
            <label className="md:col-span-2 text-white/70 text-sm">อัปโหลดรูปภาพ:</label>
            <input type="file" name="photoFile" onChange={handleChange} ref={fileInputRef} accept="image/*" className="md:col-span-2 bg-black border border-white/10 p-3 focus:border-swoosh-gold outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-swoosh-gold file:text-black hover:file:bg-white" />

            {isCropping && (
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
                    onClick={handleConfirmCrop}
                    className="bg-swoosh-gold text-black px-10 py-3 font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(197,160,89,0.3)]"
                  >
                    Crop & Use Image
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsCropping(false)}
                    className="border border-white/20 px-10 py-3 font-bold uppercase tracking-widest text-white hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
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
                  onClick={() => { 
                    setEditId(null); 
                    setFormData({ name: '', number: '', position: 'GK', status: 'official', photoURL: '', instagram: '', birthProvince: '', birthCountry: '', birthDate: '' }); 
                    setPreviewUrl(null);
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }} 
                  className="border border-white/20 px-10 py-3 font-bold uppercase tracking-widest"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Search</p>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search by player name..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black border border-white/10 p-3 pl-10 focus:border-swoosh-gold outline-none transition-all text-sm"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Position</p>
              <select value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)} className="w-full bg-black border border-white/10 p-3 outline-none text-sm focus:border-swoosh-gold min-w-[120px]">
                <option value="All">All Positions</option>
                <option value="GK">GK</option>
                <option value="DEF">DEF</option>
                <option value="MID">MID</option>
                <option value="FWD">FWD</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Status</p>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full bg-black border border-white/10 p-3 outline-none text-sm focus:border-swoosh-gold min-w-[140px]">
                <option value="All">All Status</option>
                <option value="official">Official</option>
                <option value="spare">Spare</option>
              </select>
            </div>
          </div>

          <h2 className="text-sm uppercase tracking-[0.3em] text-white/40 pt-4 border-t border-white/5">Current Squad</h2>
          {players
            .filter(p => {
              const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesPosition = filterPosition === 'All' || p.position === filterPosition;
              const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
              return matchesSearch && matchesPosition && matchesStatus;
            })
            .map(p => (
            <div key={p.id} className="flex items-center justify-between bg-swoosh-card border border-white/5 p-3 hover:border-swoosh-gold/30 transition-all">
              <div className="flex items-center gap-6">
                <span className="text-2xl font-bold text-swoosh-gold w-8">{p.number?.toString().padStart(2, '0')}</span>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-black flex-shrink-0">
                  <img src={p.thumbnailURL || p.photoURL || playerProfile} alt="" className="w-full h-full object-cover" />
                </div>
                <div><p className="font-bold leading-tight">{p.name}</p><p className="text-[9px] text-gray-500 uppercase tracking-widest">{p.position} • {p.status}</p></div>
              </div>
              <div className="flex gap-6">
                <button onClick={() => handleEdit(p)} className="text-[10px] uppercase font-bold text-blue-400 hover:text-blue-300 transition-colors">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-[10px] uppercase font-bold text-red-500 hover:text-red-400 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;