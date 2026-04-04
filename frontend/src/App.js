import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import Groups from './pages/Groups';
import EventDetails from './pages/EventDetails';
import MyEvents from './pages/MyEvents';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';

// Import newly added pages
import HostDashboard from './pages/HostDashboard';
import Admin from './pages/Admin';

function App() {
  return (
    <AuthProvider>
      <div className="App flex flex-col min-h-screen bg-gray-50">
        <Router>
          <Navbar />

          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Events />} />
              <Route path="/events" element={<Events />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/my-events" element={<MyEvents />} />
              <Route path="/groups" element={<Groups />} />

              {/* Protected / Dashboard routes */}
              <Route path="/dashboard" element={<HostDashboard />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>

          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;