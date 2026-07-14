import playerProfile from '../../../assets/images/player-profile.png';
import { POSITIONS, PLAYER_STATUSES } from '../../../constants';

function PlayerList({ 
  players, 
  handleEdit, 
  handleDelete, 
  searchTerm, 
  setSearchTerm,
  filterPosition,
  setFilterPosition,
  filterStatus,
  setFilterStatus
}) {
  return (
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
            {POSITIONS.map(pos => <option key={pos} value={pos}>{pos}</option>)}
          </select>
        </div>
        <div className="w-full md:w-auto">
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Status</p>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full bg-black border border-white/10 p-3 outline-none text-sm focus:border-swoosh-gold min-w-[140px]">
            <option value="All">All Status</option>
            {PLAYER_STATUSES.map(status => <option key={status.value} value={status.value}>{status.label}</option>)}
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
  );
}

export default PlayerList;
