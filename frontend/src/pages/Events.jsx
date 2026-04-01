import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import { useAuth } from '../context/AuthContext';

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);


  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All Categories');

  const categories = [
    'All Categories',
    'Outdoor & Adventure',
    'Technology',
    'Health & Wellness',
    'Food & Drink',
    'Arts & Culture'
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events.');
      }
    };
    fetchEvents();
  }, []);

  // Filtering and key word search 
  const filteredEvents = events.filter(e => {
    const matchCategory = filter === 'All Categories' || e.category === filter;
    const matchSearch = e.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.details?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-8">


        <header className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-black mb-4 tracking-wide" style={{ fontFamily: "'Caveat', cursive" }}>
            Discover Local Events
          </h1>
          <p className="text-gray-500 text-sm">
            Connect with people who share the same interests. Find events, join groups, and build life long relationships.
          </p>
        </header>


        <div className="flex flex-col md:flex-row gap-4 mb-8">

          {/* Left side：Search Bar */}
          <div className="flex-grow flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 transition shadow-sm">
            <span className="text-gray-400 mr-3">🔍</span>
            <input
              type="text"
              placeholder="Search events here by name, interests"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Right side：Category Filter Dropdown */}
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 min-w-[240px] shadow-sm hover:bg-gray-100 transition cursor-pointer">
            <span className="text-gray-400 mr-2">▽</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-800 font-bold cursor-pointer appearance-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Only logged in users can create events */}
        {user && (
          <div className="mb-12 max-w-3xl mx-auto">
            <EventForm
              events={events}
              setEvents={setEvents}
              editingEvent={editingEvent}
              setEditingEvent={setEditingEvent}
            />
          </div>
        )}

        {/* Events List */}
        <div className="mt-8">
          <div className="flex items-center mb-6">
            <span className="text-green-600 mr-2 font-bold">📈</span>
            <h2 className="text-2xl font-bold text-gray-900">
              {filter === 'All Categories' ? 'Featured Events' : `${filter} Events`}
            </h2>
            <span className="ml-2 text-gray-400 font-medium">({filteredEvents.length})</span>
          </div>

          <EventList
            events={filteredEvents}
            setEvents={setEvents}
            setEditingEvent={setEditingEvent}
          />
        </div>
      </div>
    </div>
  );
};

export default Events;