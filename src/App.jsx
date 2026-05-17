import Navbar from './components/Navbar';
import Home from './Home';
import Squad from './Squad'
import Kit from './Kit';
import League from './League';
import Connect from './Connect';
// import { uploadPlayers } from './UploadData';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PlayerProfile from './PlayerProfile';
import AdminDashboard from './AdminDashboard';

function App() {

  return (
    <Router>
      <div className="App bg-swoosh-black min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Home />
                <div id="squad-section">
                  <Squad />
                </div>
                <div id="kit-section">
                  <Kit />
                </div>
                <div id="league-section">
                  <League />
                </div>
                <div id="connect-section">
                  <Connect />
                </div>
              </>
            } />

            <Route path="/player/:id" element={<PlayerProfile />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <section className="bg-swoosh-black text-white py-24 px-8 border-t border-white/5">
        {/* Footer */}
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center text-[10px] text-white/20 uppercase tracking-[0.3em] gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-swoosh-gold rounded-full"></div>
            <span>Swoosh • Pro Clubs</span>
          </div>
          <div>© 2026 — All Rights Reserved</div>
        </div>
      </section>
      </div>
    </Router>
  )
}

export default App