import { useEffect, useState } from 'react';
import { db } from './firebase';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import playerProfile from './images/player-profile.png';

function Squad() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const q = query(collection(db, "players"), orderBy("number", "asc"));
      const querySnapshot = await getDocs(q);
      const playerData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlayers(playerData);
    };
    fetchPlayers();
  }, []);

  const officialRoster = players.filter(p => p.status === 'official');
  const sparePlayers = players.filter(p => p.status === 'spare');

  return (
    <div className="bg-swoosh-black text-white min-h-screen font-serif">
      <div className="text-center py-16">
        <p className="text-swoosh-gold tracking-widest uppercase text-sm mb-2">The Roster</p>
        <h1 className="text-5xl md:text-6xl text-swoosh-gold italic">Meet The Squad</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {officialRoster.map(player => (
          <Link to={`/player/${player.id}`} key={player.id} className="bg-swoosh-card border border-gray-800 p-6 flex items-center group hover:border-swoosh-gold transition-all cursor-pointer">
            <div className="text-4xl font-bold text-swoosh-gold mr-6 opacity-80">
              {player.number.toString().padStart(2, '0')}
            </div>
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 mr-4 bg-black/40 flex-shrink-0">
              <img 
                src={player.photoURL || playerProfile} 
                alt={player.name} 
                className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div>
              <p className="text-xl font-semibold tracking-wide leading-tight">{player.name}</p>
              <p className="text-swoosh-gold text-[10px] uppercase tracking-[0.2em] mt-1">{player.position || 'Player'}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 pb-20">
        <div className="flex items-center justify-center mb-10">
           <div className="h-[1px] w-20 bg-swoosh-gold opacity-30"></div>
           <h2 className="mx-4 text-swoosh-gold uppercase tracking-[0.3em] text-sm">Spare Players</h2>
           <div className="h-[1px] w-20 bg-swoosh-gold opacity-30"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {sparePlayers.map(player => (
            <Link to={`/player/${player.id}`} key={player.id} className="bg-swoosh-card border border-gray-900 p-4 flex items-center group hover:border-swoosh-gold transition-all cursor-pointer">
              <div className="w-8 h-8 bg-black border border-swoosh-gold flex items-center justify-center text-[10px] text-swoosh-gold mr-4 flex-shrink-0">S</div>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 mr-4 bg-black/40 flex-shrink-0">
                <img 
                  src={player.photoURL || playerProfile} 
                  alt={player.name} 
                  className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div>
                <p className="text-lg leading-tight">{player.name}</p>
                <p className="text-swoosh-gold text-[9px] uppercase tracking-[0.2em] mt-0.5">{player.position || 'Spare'}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Squad;