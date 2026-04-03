import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

// events = [], to make sure it never becomes undefined
const EventList = ({ events = [], setEvents, setEditingEvent }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await axiosInstance.delete(`/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      alert('Failed to delete event.');
    }
  };

  // No events found placement
  if (!events || events.length === 0) {
    return (
      <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
        <span className="text-4xl mb-4 block">🏜️</span>
        <h3 className="text-xl font-bold text-gray-700 mb-2">No events found</h3>
        <p className="text-gray-500">There are no events in this category yet. Be the first to host one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => {

        // 🌟 FULL-STACK FIX: Safely extract the host ID whether it's populated (object) or plain string
        const currentHostId = typeof event.hostId === 'object' && event.hostId !== null
          ? event.hostId._id
          : event.hostId;

        // Check if current user is the host or an admin
        const isAuthorized = user && (user.id === currentHostId || user._id === currentHostId || user.role === 'admin');

        return (
          <div key={event._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-100 relative">

            <div className="h-48 bg-gray-200 relative">
              <img
                src={event.image || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              {/* category label */}
              <span className="absolute top-3 right-3 bg-[#10B981] text-white text-[11px] font-bold px-3 py-1.5 rounded shadow-sm">
                {event.category || 'Outdoor & Adventure'}
              </span>
            </div>

            <div className="p-5 flex-grow">
              <p className="text-[#10B981] text-xs font-bold mb-1 uppercase tracking-wider">
                {event.group || 'Community Host'}
              </p>

              <h2 className="text-xl font-extrabold text-gray-900 mb-3 leading-tight">
                {event.title}
              </h2>

              <div className="space-y-2 mb-4">
                <p className="text-gray-600 text-sm flex items-center gap-2">
                  <span className="text-[#10B981]">📅</span> {event.date} {event.time && `• ${event.time}`}
                </p>
                <p className="text-gray-600 text-sm flex items-center gap-2">
                  <span className="text-[#10B981]">📍</span> {event.location}
                </p>
                <p className="text-gray-500 text-sm flex items-center gap-2 mt-2">
                  <span className="text-[#10B981]">👥</span>
                  {event.attendees?.length || 0} attending
                  <span className="ml-auto text-gray-400 text-xs font-medium">
                    {event.attendeeLimit > 0 ? `${event.attendeeLimit - (event.attendees?.length || 0)} spots left` : 'Unlimited'}
                  </span>
                </p>
              </div>

              {/* Progress Bar */}
              {event.attendeeLimit > 0 && (
                <div className="w-full bg-gray-100 h-1.5 rounded-full mb-2 overflow-hidden">
                  <div
                    className="bg-[#10B981] h-full rounded-full"
                    style={{ width: `${Math.min(((event.attendees?.length || 0) / event.attendeeLimit) * 100, 100)}%` }}
                  ></div>
                </div>
              )}
            </div>

            <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center mt-auto">

              {/* 🌟 FEATURE ADDED: Navigate to Event Details Page */}
              <button
                onClick={() => navigate(`/events/${event._id}`)}
                className="bg-[#10B981] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-[#059669] transition shadow-sm w-full text-sm"
              >
                View Details
              </button>

              {/* Only Host or Admin can see Edit/Delete (using the safe authorization check) */}
              {isAuthorized && (
                <div className="flex gap-2 ml-3">
                  <button onClick={() => setEditingEvent(event)} className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded transition">✏️</button>
                  <button onClick={() => handleDelete(event._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition">🗑️</button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventList;