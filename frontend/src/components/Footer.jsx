import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 pt-12 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    {/* Logo & Description */}
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="bg-[#10B981] text-white p-1.5 rounded-md">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                            <span className="text-xl font-bold italic tracking-tight" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.75rem' }}>MeetHub</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed pr-4">
                            Meet the meaningful events and gatherings here.
                        </p>
                    </div>

                    {/* Discover Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 text-sm">Discover</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to="/events" className="hover:text-[#10B981] transition">Browse Events</Link></li>
                            <li><Link to="/groups" className="hover:text-[#10B981] transition">Find Groups</Link></li>
                            <li><Link to="/events" className="hover:text-[#10B981] transition">Categories</Link></li>
                        </ul>
                    </div>

                    {/* Organize Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 text-sm">Organize</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to="/dashboard" className="hover:text-[#10B981] transition">Create Event</Link></li>
                            <li><Link to="/groups" className="hover:text-[#10B981] transition">Start a Group</Link></li>
                            <li><Link to="/dashboard" className="hover:text-[#10B981] transition">Host Resources</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 text-sm">Company</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to="/" className="hover:text-[#10B981] transition">About Us</Link></li>
                            <li><Link to="/" className="hover:text-[#10B981] transition">Contact</Link></li>
                            <li><Link to="/" className="hover:text-[#10B981] transition">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-center items-center">
                    <p className="text-gray-400 text-xs">
                        © 2026 MeetHub. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;