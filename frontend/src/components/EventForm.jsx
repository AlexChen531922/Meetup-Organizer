import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const EventForm = ({ events, setEvents, editingEvent, setEditingEvent }) => {
  const { user } = useAuth();

  const initialState = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    group: '',
    attendeeLimit: '',
    image: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title || '',
        description: editingEvent.details || editingEvent.summary || '',
        date: editingEvent.date || '',
        time: editingEvent.time || '',
        location: editingEvent.location || '',
        category: editingEvent.category || '',
        group: editingEvent.group || '',
        attendeeLimit: editingEvent.attendeeLimit || '',
        image: editingEvent.image || '',
      });
      setError('');
    } else {
      setFormData(initialState);
    }
  }, [editingEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // filed validation 
    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.location || !formData.category || !formData.group) {
      setError('Please fill in all required fields (*).');
      return;
    }

    // data format to send to backend
    const payload = {
      ...formData,
      attendeeLimit: parseInt(formData.attendeeLimit) || 0,
      details: formData.description, // Backend field name mapping
    };

    try {
      if (editingEvent) {
        const response = await axiosInstance.put(`/api/events/${editingEvent._id}`, payload, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEvents(events.map((event) => (event._id === response.data._id ? response.data : event)));
        alert('Event updated successfully!');
      } else {
        const response = await axiosInstance.post('/api/events', payload, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEvents([...events, response.data]);
        alert('Event created successfully!');
      }

      setEditingEvent(null);
      setFormData(initialState);
    } catch (error) {
      setError('Failed to save event. Please check your connection.');
    }
  };

  const handleCancel = () => {
    setEditingEvent(null);
    setFormData(initialState);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 shadow-2xl rounded-2xl border border-gray-100 relative">
      {/* Close button (top right X) */}
      <button
        type="button"
        onClick={handleCancel}
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {editingEvent ? 'Edit Event' : 'Create New Event'}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Fill in the details to create a new event
        </p>
      </div>

      {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-6 text-sm">{error}</div>}

      <div className="space-y-5">
        {/* Event Title */}
        <div>
          <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
            <span className="text-green-600 mr-2">🏷️</span> Event Title *
          </label>
          <input
            type="text"
            placeholder="e.g., Mountain Hiking"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-lg outline-none transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-2">
            Description *
          </label>
          <textarea
            rows="4"
            placeholder="Provide details about your event"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-lg outline-none transition resize-none"
          ></textarea>
          <div className="text-xs text-gray-400 mt-1">{formData.description.length} characters</div>
        </div>

        {/* Date & Time Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <span className="text-green-600 mr-2">📅</span> Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-lg outline-none transition text-gray-700"
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <span className="text-green-600 mr-2">🕒</span> Time *
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-lg outline-none transition text-gray-700"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
            <span className="text-green-600 mr-2">📍</span> Location *
          </label>
          <input
            type="text"
            placeholder="e.g., Queen. street, Brisbane"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full p-3 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-lg outline-none transition"
          />
        </div>

        {/* Category & Group Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-lg outline-none transition text-gray-700"
            >
              <option value="" disabled>Select categor</option>
              <option value="Outdoor & Adventure">Outdoor & Adventure</option>
              <option value="Technology">Technology</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Food & Drink">Food & Drink</option>
              <option value="Arts & Culture">Arts & Culture</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Group *</label>
            <select
              value={formData.group}
              onChange={(e) => setFormData({ ...formData, group: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-lg outline-none transition text-gray-700"
            >
              <option value="" disabled>Select group</option>
              <option value="Weekend Hikers">Weekend Hikers</option>
              <option value="Tech Talks">Tech Talks</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>

        {/* Maximum Attendees */}
        <div>
          <label className="flex items-center text-sm font-bold text-gray-800 mb-1">
            <span className="text-green-600 mr-2">👥</span> Maximum Attendees
          </label>
          <input
            type="number"
            placeholder="optional"
            min="0"
            value={formData.attendeeLimit}
            onChange={(e) => setFormData({ ...formData, attendeeLimit: e.target.value })}
            className="w-full p-3 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-lg outline-none transition mb-1"
          />
          <p className="text-xs text-gray-400">How many people can attend this event?</p>
        </div>

        {/* Event Image URL */}
        <div>
          <label className="flex items-center text-sm font-bold text-gray-800 mb-1">
            <span className="text-green-600 mr-2">🖼️</span> Event Image URL (Optional)
          </label>
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full p-3 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-lg outline-none transition mb-1"
          />
          <p className="text-xs text-gray-400">Add a cover image to make your event more attractive</p>
        </div>
      </div>

      {/* Buttons - according to  Figma style */}
      <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 bg-[#10B981] text-white font-bold py-3 rounded-lg hover:bg-[#059669] transition shadow-sm"
        >
          {editingEvent ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;