// frontend/src/pages/MyEvents.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';

const MyEvents = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchMyEvents = async () => {

            if (!user) return;

            try {
                const response = await axiosInstance.get('/api/events/attended', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setEvents(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching my events:', error);
                setLoading(false);
            }
        };
        fetchMyEvents();
    }, [user]);

    const now = new Date();
    const upcomingEvents = events.filter(e => new Date(e.date) >= now);
    const pastEvents = events.filter(e => new Date(e.date) < now);

    const displayEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold italic text-gray-900 font-handwriting mb-2">My Events</h1>
                <p className="text-gray-600 text-lg">Events you are attending and interested in</p>
            </div>

            {/* Pill-shaped Tabs */}
            <div className="inline-flex bg-gray-100 p-1 rounded-full mb-8">
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${activeTab === 'upcoming' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Upcoming ({upcomingEvents.length})
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${activeTab === 'past' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Past ({pastEvents.length})
                </button>
            </div>

            {/* card grid */}
            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading events...</div>
            ) : displayEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayEvents.map(event => <EventCard key={event._id} event={event} />)}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">No {activeTab} events found.</p>
                </div>
            )}
        </div>
    );
};

export default MyEvents;