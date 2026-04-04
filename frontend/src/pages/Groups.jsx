// frontend/src/pages/Groups.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroupCard from '../components/GroupCard';

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All Categories');

    const categories = ['All Categories', 'Outdoor & Adventure', 'Technology', 'Health & Wellness', 'Arts & Culture', 'Food & Drink'];


    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get(`/api/groups?search=${searchTerm}&category=${category}`);
                setGroups(response.data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };


        const delayDebounceFn = setTimeout(() => {
            fetchGroups();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, category]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* page title area */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold italic text-gray-900 font-handwriting mb-2">Discover Groups</h1>
                <p className="text-gray-600 text-lg">Match the communities share your interests and passions</p>
            </div>

            {/* control bar: search and filter */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-4 rounded-lg mb-8 gap-4">
                <div className="relative w-full sm:w-1/2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white"
                        placeholder="Search groups..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex w-full sm:w-auto gap-4">
                    <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <select
                            className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center whitespace-nowrap transition-colors">
                        <span className="mr-2">+</span> Create Group
                    </button>
                </div>
            </div>

            {/* title and count */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">All Groups</h2>
                <span className="text-gray-500">({groups.length} groups)</span>
            </div>

            {/* grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.length > 0 ? (
                    groups.map(group => <GroupCard key={group._id} group={group} />)
                ) : (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        No groups found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Groups;