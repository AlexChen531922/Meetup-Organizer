import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    // Toast notification state
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    // Auto-hide toast after 3 seconds
    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast.show]);

    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                const response = await axiosInstance.get(`/api/events/${id}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Failed to fetch event details', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEventDetail();
    }, [id]);

    const handleJoinEvent = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setIsProcessing(true);
        try {
            const response = await axiosInstance.post(`/api/events/${id}/join`, {}, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            setEvent(response.data); // Update with populated attendees
            setToast({ show: true, message: 'You joined the event!', type: 'success' });

        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Failed to join event';
            setToast({ show: true, message: errorMsg, type: 'error' });
        } finally {
            setIsProcessing(false);
        }
    };

    // Handle leaving the event
    const handleLeaveEvent = async () => {
        setIsProcessing(true);
        try {
            const response = await axiosInstance.post(`/api/events/${id}/leave`, {}, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            setEvent(response.data); // Update with populated attendees
            setToast({ show: true, message: 'You have left the event.', type: 'success' });

        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Failed to leave event';
            setToast({ show: true, message: errorMsg, type: 'error' });
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) return <div className="min-h-screen flex justify-center items-center">Loading event...</div>;
    if (!event) return <div className="min-h-screen flex justify-center items-center">Event not found.</div>;
    const isPastEvent = new Date(event.date) < new Date();
    const hasJoined = user && event.attendees?.some(att => att._id === user.id || att === user.id);
    const isFull = event.attendeeLimit > 0 && event.attendees?.length >= event.attendeeLimit;

    return (
        <div className="bg-white min-h-screen pb-16 relative">

            {/* --- Custom Toast Notification (Centered) --- */}
            {toast.show && (
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">


                    <div className="bg-white border border-gray-200 shadow-2xl rounded-xl p-5 flex items-start w-80 animate-fade-in-down pointer-events-auto relative">
                        <div className="text-gray-700 mr-3 mt-0.5">
                            {toast.type === 'success' ? 'ⓘ' : '⚠️'}
                        </div>

                        <div className="flex-grow">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="text-gray-900 font-bold text-lg">
                                    {toast.type === 'success' ? 'Successful!' : 'Error'}
                                </h4>
                                <button
                                    onClick={() => setToast({ show: false, message: '', type: '' })}
                                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    ✕
                                </button>
                            </div>
                            <p className="text-gray-600 text-sm">
                                {toast.message}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Hero Banner --- */}
            <div className="relative h-[400px] w-full">
                <img
                    src={event.image || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6 lg:px-24 max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <button onClick={() => navigate(-1)} className="bg-white text-[#10B981] px-4 py-1.5 rounded-full text-sm font-bold flex items-center hover:bg-gray-50 shadow-sm transition">
                            ← Back to Events
                        </button>
                        <span className="bg-[#10B981] text-white text-xs font-bold px-3 py-1.5 rounded-sm">
                            {event.category || 'Category'}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2" style={{ fontFamily: "'Caveat', cursive" }}>
                        {event.title}
                    </h1>
                    <p className="text-gray-100 text-sm font-medium">
                        Hosted by {event.group || 'Community'}
                    </p>
                </div>
            </div>

            {/* --- Main Content Grid --- */}
            <div className="max-w-7xl mx-auto px-6 lg:px-24 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Event Details */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <h3 className="font-bold text-gray-900">Event Details</h3>
                        </div>
                        <div className="p-6 space-y-4 bg-white">
                            <div className="flex items-center text-gray-700 text-sm">
                                <span className="text-[#10B981] text-lg w-8">📅</span> {event.date}
                            </div>
                            <div className="flex items-center text-gray-700 text-sm">
                                <span className="text-[#10B981] text-lg w-8">🕒</span> {event.time || 'TBD'}
                            </div>
                            <div className="flex items-center text-gray-700 text-sm">
                                <span className="text-[#10B981] text-lg w-8">📍</span> {event.location}
                            </div>
                        </div>
                    </div>

                    {/* About this Event */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <h3 className="font-bold text-gray-900">About this Event</h3>
                        </div>
                        <div className="p-6 bg-white">
                            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                                {event.details || event.description || 'No description provided.'}
                            </p>
                        </div>
                    </div>

                    {/* Meet Your Host */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <h3 className="font-bold text-gray-900">Meet Your Host</h3>
                        </div>
                        <div className="p-6 bg-white flex items-center">
                            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-gray-600 mr-4">
                                {event.hostId?.name ? event.hostId.name.charAt(0).toUpperCase() : 'H'}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{event.hostId?.name || 'Anonymous Host'}</h4>
                                <div className="mt-1">
                                    <span className="text-xs font-medium border border-gray-300 text-gray-600 px-2 py-0.5 rounded-sm">Host</span>
                                    <span className="text-gray-500 text-xs ml-2">Tech meetup organizer</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Attendees */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <h3 className="font-bold text-gray-900">Attendees ({event.attendees?.length || 0})</h3>
                        </div>
                        <div className="p-6 bg-white flex flex-wrap gap-4">
                            {event.attendees?.length > 0 ? (
                                event.attendees.map((attendee, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-800">
                                            {attendee.name ? attendee.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{attendee.name || 'User'}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No attendees yet.</p>
                            )}
                        </div>
                    </div>

                </div>

                {/* Right Column: Sticky Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">

                        {/* Action Card */}
                        <div className="border border-gray-200 rounded-xl p-6 bg-white">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600 text-sm font-medium">Attendees</span>
                                <span className="font-extrabold text-gray-900 text-2xl">{event.attendees?.length || 0}</span>
                            </div>

                            {isPastEvent ? (
                                <button
                                    disabled
                                    className="w-full bg-gray-200 text-gray-500 font-bold py-3 rounded-lg cursor-not-allowed mb-3 text-sm"
                                >
                                    Event Expired
                                </button>
                            ) : hasJoined ? (
                                <button
                                    onClick={handleLeaveEvent}
                                    disabled={isProcessing}
                                    className="w-full bg-red-50 text-red-600 border border-red-200 font-bold py-3 rounded-lg hover:bg-red-100 transition mb-3 text-sm"
                                >
                                    {isProcessing ? 'Processing...' : 'Cancel Attendance'}
                                </button>
                            ) : (
                                <button
                                    onClick={handleJoinEvent}
                                    disabled={isProcessing || isFull}
                                    className={`w-full font-bold py-3 rounded-lg transition mb-3 text-sm ${isFull ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#10B981] text-white hover:bg-[#059669]'}`}
                                >
                                    {isProcessing ? 'Joining...' : isFull ? 'Event Full' : 'Join Event'}
                                </button>
                            )}

                            <button className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center text-sm">
                                ♡ Save
                            </button>
                        </div>

                        {/* About Group Card */}
                        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <h3 className="font-bold text-gray-900 text-sm">About the Group</h3>
                            </div>
                            <div className="p-6">
                                <img
                                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                    alt="Group cover"
                                    className="w-full h-24 object-cover rounded mb-4"
                                />
                                <h4 className="font-bold text-gray-900 text-sm">{event.group || 'Community Hub'}</h4>
                                <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                                    Join us for relaxing and engaging activities. All skill levels are welcome!
                                </p>
                                <button className="w-full mt-4 bg-white border border-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-50 transition text-xs">
                                    View Group
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;