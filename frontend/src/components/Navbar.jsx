import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold flex items-center gap-2"><span>📅</span> MeetHub</Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/events" className="hover:text-green-200 font-medium">Events</Link>
            <Link to="/groups" className="hover:text-green-200 font-medium">Groups</Link>
            <Link to="/profile" className="hover:text-green-200 font-medium">My Events</Link>

            {/*UserStory 5, 6: link shows only for admin */}
            {user.role === 'admin' && (
              <Link to="/admin" className="hover:text-green-200 font-bold border-b-2 border-white">Admin</Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-white text-green-600 px-4 py-2 rounded font-bold hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-200 font-medium">Login</Link>
            <Link
              to="/register"
              className="bg-white text-green-600 px-4 py-2 rounded font-bold hover:bg-gray-100 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
