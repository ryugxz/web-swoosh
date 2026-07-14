import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import playerProfile from '../../assets/images/player-profile.png';
import playerPortraitStats from '../../assets/images/player-portrait-stats.png';
import { calculateAge } from '../../utils/dateHelpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorState from '../../components/ui/ErrorState';

function PlayerProfilePage() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [otherPlayers, setOtherPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPlayerData = async () => {
      const docRef = doc(db, "players", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPlayer(docSnap.data());
      }

      const q = query(collection(db, "players"), orderBy("number", "asc"));
      const querySnapshot = await getDocs(q);
      const playersList = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(p => p.id !== id);
      
      setOtherPlayers(playersList);
      setLoading(false);
    };
    fetchPlayerData();
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading Profile..." />;
  if (!player) return <ErrorState message="Player not found." />;

  return (
    <div className="min-h-screen bg-swoosh-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-8 relative">
        
        <Link to="/" className="absolute top-0 left-8 z-20 text-white/40 hover:text-swoosh-gold transition-colors text-xs uppercase tracking-widest">
          ← Back
        </Link>

        <div className="flex flex-col md:flex-row items-center min-h-[70vh]">
          
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative pr-0 md:pr-12">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-swoosh-gold/5 blur-[120px] rounded-full"></div>
            
            <img 
              src={player.photoURL || playerPortraitStats} 
              alt={player.name}
              className="relative z-10 w-full max-w-[500px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            />
          </div>

          <div className="w-full md:w-1/2 mt-12 md:mt-0 text-left">
            <div className="flex flex-col">
              
              <div className="flex items-center gap-2 text-5xl font-bold text-white mb-2">
                <span>{player.number}</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.9] uppercase tracking-tighter mb-4">
                {player.name.split(' ').map((part, index) => (
                  <span key={index} className="block">{part}</span>
                ))}
              </h1>

              <p className="text-xl font-light text-white/80 tracking-widest mb-1 uppercase">
                {player.position} {player.birthDate && <span className="text-white/30 ml-2">• AGE {calculateAge(player.birthDate)}</span>}
              </p>

              {(player.birthProvince || player.birthCountry) && (
                <p className="text-sm font-light text-swoosh-gold/60 tracking-[0.2em] mb-8 uppercase">
                  {player.birthProvince}{player.birthProvince && player.birthCountry ? ', ' : ''}{player.birthCountry}
                </p>
              )}

              <div className="mb-10">
                <a 
                  href={player.instagram || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-md hover:border-swoosh-gold hover:text-swoosh-gold transition-all"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 bg-transparent border border-white/40 text-white px-4 py-2 text-sm font-bold rounded-sm hover:bg-white/10 transition-all">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M20.38 3.46L16 2a4 4 0 0 0-8 0L3.62 3.46a2 2 0 0 0-1.62 1.96V10a2 2 0 0 0 2 2h2v8a2 2 0 0 0 2-2h8a2 2 0 0 0 2-2v-8h2a2 2 0 0 0 2-2V5.42a2 2 0 0 0-1.62-1.96z" />
                  </svg>
                  Buy jersey
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-32 pb-20 border-t border-white/5 pt-16">
        <p className="text-swoosh-gold uppercase tracking-[0.3em] text-[10px] mb-8 text-center">Explore Squad</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {otherPlayers.map(p => (
            <Link 
              key={p.id} 
              to={`/player/${p.id}`} 
              className="bg-swoosh-card border border-white/5 p-4 flex flex-col items-center group hover:border-swoosh-gold transition-all"
            >
              <div className="w-14 h-14 mb-3 rounded-full overflow-hidden border border-white/10 group-hover:border-swoosh-gold/50 transition-all bg-black/40">
                <img 
                  src={p.photoURL || playerProfile} 
                  alt={p.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
              <div className="text-xl font-bold text-swoosh-gold/40 group-hover:text-swoosh-gold transition-colors mb-1">
                {p.number?.toString().padStart(2, '0')}
              </div>
              <p className="text-[9px] text-white/50 uppercase tracking-widest text-center truncate w-full">
                {p.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayerProfilePage;
