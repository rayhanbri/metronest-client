import React from 'react';
import { Link, Outlet } from 'react-router';
import { FaBars, FaHome, FaUser, FaList, FaSignOutAlt, FaUserCircle, FaHeart, FaShoppingCart, FaCommentDots } from 'react-icons/fa';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            {/* Toggle Button for small screens */}
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col p-4">
                {/* Top navbar */}
                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="dashboard-drawer" className="lg:hidden cursor-pointer">
                        <FaBars className="text-2xl" />
                    </label>
                    <h2 className="text-xl mx-auto font-bold text-blue-600">MetroNest Dashboard</h2>
                </div>

                {/* Page content here */}
                <Outlet />
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
                    <h3 className="text-xl font-bold mb-4 text-blue-600">Navigation</h3>
                    {/* user links  */}
                    <li><Link to="/dashboard/profile"><FaUserCircle className='text-blue-600' /> My Profile</Link></li>
                    <li><Link to="/dashboard/wishlist"><FaHeart className='text-red-600' /> Wishlist</Link></li>
                    <li><Link to="/dashboard/purchased"><FaShoppingCart className='text-blue-600' /> Property Bought</Link></li>
                    <li><Link to="/dashboard/reviews"><FaCommentDots className='text-blue-600'/> My Reviews</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
