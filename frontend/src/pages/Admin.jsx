import React from 'react';

const Admin = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* 頂部標題 */}
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
                    <p className="text-gray-500 mt-2">Manage platform users, events, and settings.</p>
                </div>
            </div>

            {/* 施工中的佔位畫面 */}
            <div className="bg-white p-12 rounded-xl border border-dashed border-gray-300 text-center shadow-sm">
                <div className="text-6xl mb-4">🛠️</div>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Admin Dashboard Under Construction</h2>
                <p className="text-gray-500">
                    This area is restricted to administrators. Platform management features will be available here soon.
                </p>
            </div>
        </div>
    );
};

export default Admin;