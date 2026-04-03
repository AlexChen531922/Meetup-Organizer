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

  const handleSeedData = async () => {
    if (!window.confirm('Are you sure you want to generate 8 dummy events?')) return;

    const seedData = [
      {
        title: "Mountain Trail Hiking Adventure",
        description: "Join us for scenic hikes and outdoor adventures. All skill levels welcome!",
        date: "2026-03-22",
        time: "08:00",
        location: "1012 Sir Samuel Griffith Dr, Mount Coot-Tha",
        category: "Outdoor & Adventure",
        group: "Weekend Hikers",
        attendeeLimit: 0, // Unlimited
        image: "https://source.unsplash.com/Yizrl9N_eDA/800x600"
      },
      {
        title: "AI & Machine Learning Workshop",
        description: "Monthly meetups for tech professionals to share knowledge and network.",
        date: "2026-03-20",
        time: "18:00",
        location: "V Block, Gardens Point Campus, 2 George St",
        category: "Technology",
        group: "Tech Talks",
        attendeeLimit: 50, // 48 left + 2 attending in Figma = 50
        image: "https://source.unsplash.com/2EJCSULRwC8/800x600"
      },
      {
        title: "Sunrise Yoga Session",
        description: "Practice yoga and meditation in a supportive community environment.",
        date: "2026-03-19",
        time: "06:30",
        location: "Central Park Lawn, Brisbane City",
        category: "Health & Wellness",
        group: "None",
        attendeeLimit: 25,
        image: "https://source.unsplash.com/vDV-JauWp3Q/800x600"
      },
      {
        title: "Book Discussion: \"The Midnight Library\"",
        description: "Monthly book discussions, author meet-ups, and literary events.",
        date: "2026-03-25",
        time: "19:00",
        location: "Cultural Precinct, Stanley Pl, South Brisbane",
        category: "Arts & Culture",
        group: "None",
        attendeeLimit: 20,
        image: "https://source.unsplash.com/xrbbXIXAWY0/800x600"
      },
      {
        title: "Farm-to-Table Dinner Experience",
        description: "Explore new restaurants, cooking classes, and food tasting events.",
        date: "2026-03-28",
        time: "18:30",
        location: "942 Brunswick St, New Farm QLD",
        category: "Food & Drink",
        group: "None",
        attendeeLimit: 30,
        image: "https://source.unsplash.com/4f4YZfDMLeU/800x600"
      },
      {
        title: "Urban Photography Walk",
        description: "Share tips, go on photo walks, and improve your photography skills.",
        date: "2026-03-23",
        time: "10:00",
        location: "285 Ann St, Brisbane City",
        category: "Arts & Culture",
        group: "None",
        attendeeLimit: 12,
        image: "https://source.unsplash.com/FFsyNuTXBQ0/800x600"
      },
      {
        title: "Coastal Trail Run",
        description: "Join our morning run along the beautiful coastline.",
        date: "2026-03-30",
        time: "07:00",
        location: "29 River Terrace, Kangaroo Point",
        category: "Outdoor & Adventure",
        group: "Weekend Hikers",
        attendeeLimit: 0,
        image: "https://source.unsplash.com/7vSlK_9gHWA/800x600"
      },
      {
        title: "Meditation & Breathwork Workshop",
        description: "Deepen your meditation practice and learn new breathing techniques.",
        date: "2026-04-02",
        time: "17:30",
        location: "147 Alice St, Brisbane City",
        category: "Health & Wellness",
        group: "None",
        attendeeLimit: 15,
        image: "https://source.unsplash.com/vs-PjCh5goo/800x600"
      }
    ];

    try {
      // 跑迴圈把 8 個活動塞進資料庫
      for (const event of seedData) {
        await axiosInstance.post('/api/events', event, {
          headers: { Authorization: `Bearer ${user.token}` }, // 用你現在登入的帳號當 Host
        });
      }
      alert('🎉 8 Events magically created!');
      window.location.reload(); // 重新整理畫面顯示新資料
    } catch (error) {
      console.error(error);
      alert('Failed to seed data.');
    }
  };


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
          {user && (
            <button
              onClick={handleSeedData}
              className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded-lg shadow hover:bg-yellow-300 text-xs"
            >
              ⚡ 產生 8 個測試活動
            </button>
          )}
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