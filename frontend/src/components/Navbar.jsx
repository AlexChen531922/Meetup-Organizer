import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Which page? For dynamic styling

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // dynamic Navbar button styling (if on the page, turn green; otherwise transparent)
  const navItemClass = (path) => `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition duration-200 ${location.pathname === path || (path === '/events' && location.pathname === '/')
    ? 'bg-[#10B981] text-white'
    : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-white px-6 py-3 flex justify-between items-center border-b border-gray-200 sticky top-0 z-50">
      {/* Left side：Logo and web app name */}
      <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
        <div className="bg-[#10B981] text-white p-1.5 rounded-lg">
          {/* calender Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <span className="text-3xl font-extrabold text-black tracking-tight" style={{ fontFamily: "'Caveat', cursive" }}>
          MeetHub
        </span>
      </Link>

      {/* Navbarlinks */}
      <div className="hidden md:flex items-center gap-2">
        <Link to="/events" className={navItemClass('/events')}>📅 Events</Link>
        <Link to="/groups" className={navItemClass('/groups')}>👥 Groups</Link>

        {user && (
          <>
            <Link to="/my-events" className={navItemClass('/my-events')}>🗓️ My Events</Link>
            {/* Only Host or Admin can see the Dashboard */}
            {(user.role === 'host' || user.role === 'admin') && (
              <Link to="/dashboard" className={navItemClass('/dashboard')}>🎛️ Host Dashboard</Link>
            )}
            {/* Only Admin can see the Admin panel */}
            {user.role === 'admin' && (
              <Link to="/admin" className={navItemClass('/admin')}>🛡️ Admin</Link>
            )}
          </>
        )}
      </div>

      {/* Right side: User avatar and logout */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <button onClick={handleLogout} className="text-sm font-bold text-gray-500 hover:text-gray-800 transition">
              Logout
            </button>
            {/* User Avatar (Picture or UI Avatars) */}
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name || 'User'}&background=10B981&color=fff&bold=true`}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-gray-200 object-cover"
            />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-gray-600 font-bold hover:text-green-600">Login</Link>
            <Link to="/register" className="bg-gray-900 text-white px-5 py-2 rounded-lg font-bold hover:bg-gray-800 transition">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
