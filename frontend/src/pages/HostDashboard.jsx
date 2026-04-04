import React, { useState, useEffect } from 'react';
import EventForm from '../components/EventForm';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const HostDashboard = () => {
  const { user } = useAuth();

  // Core state management
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal and editing state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Derived stats for the top cards
  const totalEvents = events.length;
  // Placeholder logic for attendees (assuming your backend returns an attendee array or count)
  const totalAttendees = events.reduce((sum, event) => sum + (event.attendees?.length || 0), 0);
  const avgAttendance = totalEvents > 0 ? Math.round(totalAttendees / totalEvents) : 0;

  // Fetch user's events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get('/api/events/hosted', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchEvents();
    }
  }, [user]);

  // Open modal for creating a new event
  const handleOpenCreateModal = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing event
  const handleEditClick = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  // Handle event deletion
  const handleDeleteClick = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axiosInstance.delete(`/api/events/${eventId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        // Remove the deleted event from the UI
        setEvents(events.filter(event => event._id !== eventId));
      } catch (error) {
        alert('Failed to delete event');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">

      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 italic font-serif">Host Dashboard</h1>
          <p className="text-gray-600 mt-2 text-lg">Manage your events and interact with your communities</p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="bg-[#10B981] hover:bg-[#059669] text-white font-medium py-2.5 px-5 rounded-md shadow-sm transition flex items-center gap-2"
        >
          <span>+</span> Create Event
        </button>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Total Events Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-gray-500 font-medium text-sm">Total Events</span>
            <span className="text-green-500">📅</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{totalEvents}</h2>
            <p className="text-gray-400 text-xs mt-1">Active events</p>
          </div>
        </div>

        {/* Total Attendees Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-gray-500 font-medium text-sm">Total Attendees</span>
            <span className="text-green-500">👥</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{totalAttendees}</h2>
            <p className="text-gray-400 text-xs mt-1">Across all events</p>
          </div>
        </div>

        {/* Avg. Attendance Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-gray-500 font-medium text-sm">Avg. Attendance</span>
            <span className="text-green-500">📈</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{avgAttendance}</h2>
            <p className="text-gray-400 text-xs mt-1">Per event</p>
          </div>
        </div>
      </div>

      {/* Events List Section */}
      <h3 className="text-lg font-bold text-gray-900 mb-4">Your Events</h3>

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="text-center text-gray-500 bg-white py-12 rounded-xl border border-dashed border-gray-300">
          <p>No events found. Click "+ Create Event" to host one!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm hover:shadow-md transition">

              {/* Left Column: Title, Category, Location, Date */}
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-bold text-gray-900">{event.title}</h4>
                  <span className="bg-[#10B981] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {event.category || 'General'}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row md:gap-12 text-sm text-gray-500">
                  <div className="flex flex-col gap-2">
                    <span className="flex items-center gap-2">
                      <span className="text-gray-400">📅</span> {event.date}
                    </span>
                    <span className="flex items-center gap-2 truncate max-w-md">
                      <span className="text-gray-400">📍</span> {event.location}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 mt-2 md:mt-0">
                    <span className="flex items-center gap-2">
                      <span className="text-gray-400">🕒</span> {event.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-gray-400">👥</span>
                      {event.attendees?.length || 0} {event.attendeeLimit ? `/ ${event.attendeeLimit}` : ''} attendees
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Edit & Delete Buttons */}
              <div className="flex items-center gap-2 mt-4 md:mt-0 self-end md:self-auto">
                <button
                  onClick={() => handleEditClick(event)}
                  className="p-2 border border-gray-200 rounded text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition"
                  title="Edit Event"
                >
                  {/* Simple Edit Icon (SVG) */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteClick(event._id)}
                  className="p-2 border border-gray-200 rounded text-red-400 hover:bg-red-50 hover:text-red-600 transition"
                  title="Delete Event"
                >
                  {/* Simple Trash Icon (SVG) */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Render the Modal if isModalOpen is true */}
      {isModalOpen && (
        <EventForm
          events={events}
          setEvents={setEvents}
          editingEvent={editingEvent}
          setEditingEvent={setEditingEvent}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default HostDashboard;