// frontend/src/components/EventCard.jsx
import React from 'react';

const EventCard = ({ event }) => {
    const capacity = event.capacity || 25;
    const attendeesCount = event.attendeesCount || 0;
    const spotsLeft = capacity - attendeesCount;
    const progressPercentage = Math.min((attendeesCount / capacity) * 100, 100);

    return (
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full relative">
            <div className="h-48 w-full relative">
                <img
                    src={event.imageUrl || 'https://via.placeholder.com/400x200'}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {event.category}
                </div>
            </div>


            <div className="p-5 flex flex-col flex-grow">
                <span className="text-sm font-medium text-green-600 mb-1">{event.groupName}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{event.title}</h3>


                <div className="text-gray-600 text-sm mb-4 space-y-2">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        <span className="mx-1">🕒</span>
                        {event.time}
                    </div>
                    <div className="flex items-start">
                        <svg className="w-4 h-4 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="truncate">{event.location}</span>
                    </div>
                </div>


                <div className="mt-auto mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span><strong className="text-gray-900">{attendeesCount}</strong> attending</span>
                        <span>{spotsLeft} spots left</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>


                <button className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default EventCard;