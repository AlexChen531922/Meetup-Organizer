// frontend/src/pages/Groups.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Groups = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');

    // 對應 Figma 截圖的完美假資料 (Mock Data)
    const mockGroups = [
        {
            _id: '1',
            name: 'Weekend Hikers',
            category: 'Outdoor & Adventure',
            description: 'Join us for scenic hikes and outdoor adventures every weekend. All skill levels welcome!',
            members: 247,
            image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80'
        },
        {
            _id: '2',
            name: 'Tech Talks & Networking',
            category: 'Technology',
            description: 'Monthly meetups for tech professionals to share knowledge and network.',
            members: 512,
            image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80'
        },
        {
            _id: '3',
            name: 'Yoga & Mindfulness',
            category: 'Health & Wellness',
            description: 'Practice yoga and meditation in a supportive community environment.',
            members: 189,
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80'
        },
        {
            _id: '4',
            name: 'Book Club Society',
            category: 'Arts & Culture',
            description: 'Monthly book discussions, author meet-ups, and literary events.',
            members: 156,
            image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80'
        },
        {
            _id: '5',
            name: 'Food Lovers Unite',
            category: 'Food & Drink',
            description: 'Explore new restaurants, cooking classes, and food tasting events.',
            members: 423,
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80'
        },
        {
            _id: '6',
            name: 'Photography Enthusiasts',
            category: 'Arts & Culture',
            description: 'Share tips, go on photo walks, and improve your photography skills.',
            members: 298,
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80'
        }
    ];

    // 簡單的過濾邏輯 (搜尋框)
    const filteredGroups = mockGroups.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold italic text-gray-900 font-handwriting mb-2">Discover Groups</h1>
                <p className="text-gray-600 text-lg">Match the communities share your interests and passions</p>
            </div>

            {/* Filter and Action Bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                {/* Search Bar */}
                <div className="relative w-full md:w-1/2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search groups..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors"
                    />
                </div>

                {/* Filters and Action Button */}
                <div className="flex w-full md:w-auto gap-3">
                    <div className="relative flex-grow md:flex-none">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-200 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-lg bg-white"
                        >
                            <option>All Categories</option>
                            <option>Outdoor & Adventure</option>
                            <option>Technology</option>
                            <option>Health & Wellness</option>
                            <option>Arts & Culture</option>
                            <option>Food & Drink</option>
                        </select>
                    </div>

                    <button
                        onClick={() => {/* 未來可導航至創建群組頁面 */ }}
                        className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 shadow-sm transition-colors"
                    >
                        <span className="mr-2">+</span> Create Group
                    </button>
                </div>
            </div>

            {/* List Header */}
            <div className="flex justify-between items-end mb-4 border-b border-gray-200 pb-2">
                <h2 className="text-xl font-bold text-gray-900">All Groups</h2>
                <span className="text-gray-500 text-sm">({filteredGroups.length} groups)</span>
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map((group) => (
                    <div key={group._id} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                        {/* Image */}
                        <div className="h-48 w-full relative overflow-hidden">
                            <img
                                src={group.image}
                                alt={group.name}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        {/* Card Content */}
                        <div className="p-5 flex flex-col flex-grow">
                            <span className="text-xs font-bold text-green-600 mb-2">{group.category}</span>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{group.name}</h3>
                            <p className="text-gray-600 text-sm mb-4 flex-grow">{group.description}</p>

                            {/* Members Count */}
                            <div className="flex items-center text-gray-500 text-sm mb-4">
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                {group.members} members
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => navigate(`/groups/${group._id}`)}
                                className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-green-600 transition-colors"
                            >
                                View Group
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Groups;