import { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Country, State } from 'country-state-city';
import { getCroppedImg, getCloudinaryThumbnail } from '../../utils/imageHelpers';
import { CLOUDINARY_CONFIG } from '../../config';
import { DEFAULT_PLAYER_FORM } from '../../constants';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';

function AdminDashboardPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_PLAYER_FORM);

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

  const fetchPlayers = useCallback(async () => {
    setLoading(true);
    const q = query(collection(db, "players"), orderBy("number", "asc"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPlayers(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPlayers();
  }, [fetchPlayers]);

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
        // Limit file size to 2MB
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
        data.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
        data.append("cloud_name", CLOUDINARY_CONFIG.cloudName);

        const res = await fetch(CLOUDINARY_CONFIG.uploadUrl, { method: "POST", body: data });
        const fileData = await res.json();
        
        finalPhotoURL = fileData.secure_url; 
        thumbnailURL = getCloudinaryThumbnail(finalPhotoURL);
        
        alert("Image uploaded successfully!");
      }

      const playerToSave = { 
        ...formData, 
        photoURL: finalPhotoURL, 
        thumbnailURL: thumbnailURL || finalPhotoURL
      };

      if (editId) {
        await updateDoc(doc(db, "players", editId), playerToSave);
      } else {
        await addDoc(collection(db, "players"), playerToSave);
      }
      
      handleCancel();
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
    setSelectedFile(null);
    setPreviewUrl(player.photoURL || null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    window.scrollTo(0, 0);
  };

  const handleCancel = () => {
    setEditId(null); 
    setFormData(DEFAULT_PLAYER_FORM); 
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      await deleteDoc(doc(db, "players", id));
      fetchPlayers();
    }
  };

  if (loading) return <LoadingSpinner message="Loading Dashboard..." />;

  return (
    <div className="min-h-screen bg-swoosh-black text-white pt-32 px-8 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif italic text-swoosh-gold mb-10 underline underline-offset-8 decoration-white/10">Player Management</h1>

        <PlayerForm 
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editId={editId}
          handleCancel={handleCancel}
          countries={countries}
          provinces={provinces}
          fileInputRef={fileInputRef}
          isCropping={isCropping}
          imageToCrop={imageToCrop}
          crop={crop}
          setCrop={setCrop}
          zoom={zoom}
          setZoom={setZoom}
          onCropComplete={onCropComplete}
          handleConfirmCrop={handleConfirmCrop}
          setIsCropping={setIsCropping}
          previewUrl={previewUrl}
          selectedFile={selectedFile}
        />

        <PlayerList 
          players={players}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterPosition={filterPosition}
          setFilterPosition={setFilterPosition}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>
    </div>
  );
}
export default AdminDashboardPage;
