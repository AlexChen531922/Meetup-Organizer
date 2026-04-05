// frontend/src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Mock statistics (to be replaced with a real backend API later)
    const stats = {
        totalUsers: users.length, // Dynamically update based on fetched users
        totalEvents: 8,
        activeHosts: 3,
        totalAttendees: 18
    };

    useEffect(() => {
        // Fetch user list from the database
        const fetchUsers = async () => {
            if (!user) return; // Prevent fetching if not logged in

            try {
                const response = await axiosInstance.get('/api/users', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                setLoading(false);
            }
        };
        fetchUsers();
    }, [user]);

    // Handle search filtering for users
    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="mb-8 flex items-center gap-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <div>
                    <h1 className="text-3xl font-bold italic text-gray-900 font-handwriting">Admin Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage users, events, and platform settings</p>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Users', value: stats.totalUsers, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /> },
                    { label: 'Total Events', value: stats.totalEvents, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
                    { label: 'Active Hosts', value: stats.activeHosts, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> },
                    { label: 'Total Attendees', value: stats.totalAttendees, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> },
                ].map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-gray-500 text-sm font-medium">{stat.label}</span>
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">{stat.icon}</svg>
                        </div>
                        <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* Tab Switching */}
            <div className="inline-flex bg-gray-50 p-1 rounded-full mb-6 border border-gray-200">
                <button
                    onClick={() => setActiveTab('users')}
                    className={`px-8 py-2 text-sm font-medium rounded-full transition-colors ${activeTab === 'users' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Users ({stats.totalUsers})
                </button>
                <button
                    onClick={() => setActiveTab('events')}
                    className={`px-8 py-2 text-sm font-medium rounded-full transition-colors ${activeTab === 'events' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Events ({stats.totalEvents})
                </button>
            </div>

            {/* User Management Section */}
            {activeTab === 'users' && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    {/* Table Header and Search Bar */}
                    <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center bg-white gap-4">
                        <h2 className="text-base font-bold text-gray-900">User Management</h2>
                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="Search users"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                            />
                            <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                    </div>

                    {/* User Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white border-b border-gray-100 text-gray-900 font-bold">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Joined</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr><td colSpan="5" className="text-center py-8 text-gray-500">Loading users...</td></tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr><td colSpan="5" className="text-center py-8 text-gray-500">No users found</td></tr>
                                ) : (
                                    filteredUsers.map((u) => (
                                        <tr key={u._id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                                    <img src={`https://ui-avatars.com/api/?name=${u.name}&background=random`} alt={u.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900">{u.name}</div>
                                                    <div className="text-gray-500 text-xs truncate w-48">{u.bio || 'No bio provided'}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{u.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.role === 'admin' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700 border border-green-200'
                                                    }`}>
                                                    {u.role || 'participant'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{u.joined}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded border border-gray-200 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                    </button>
                                                    <button className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded border border-red-100 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'events' && (
                <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500 shadow-sm">
                    Event management table will be implemented here.
                </div>
            )}
        </div>
    );
};

export default Admin;