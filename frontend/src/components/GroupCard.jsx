// frontend/src/components/GroupCard.jsx
import React from 'react';

const GroupCard = ({ group }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            {/* Pic */}
            <div className="h-48 w-full overflow-hidden">
                <img
                    src={group.imageUrl || 'https://via.placeholder.com/400x200'}
                    alt={group.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* card content */}
            <div className="p-5 flex flex-col flex-grow">
                <span className="text-sm font-medium text-green-600 mb-1">
                    {group.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{group.name}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                    {group.description}
                </p>


                <div className="mt-auto">
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {group.memberCount} members
                    </div>
                    <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                        View Group
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupCard;