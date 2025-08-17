import React from 'react';
import { Link, NavLink } from 'react-router';
import MetroNest from '../MetroNest/MetroNest';
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/allProperties">All Properties</NavLink></li>
            <li><NavLink to="/dash-board">Dashboard</NavLink></li>
        </>
    );

    const handleLogOut = () => {
        logOut();
    };

    // console.log(user.photoURL)

    return (
        <div className="navbar bg-base-100 rounded-xl shadow-sm px-4 sticky top-0 z-50">
            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <section className="text-xl font-bold text-blue-600">
                    <MetroNest />
                </section>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-2">
                    {links}
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end space-x-4">
                {
                    user ? (
                        <div className="flex items-center gap-2">
                            <img
                                src={user?.photoURL}
                                alt="User"
                                className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                            />
                            <span className="hidden md:inline font-medium text-sm">{user?.displayName}</span>
                            <button
                                onClick={handleLogOut}
                                className="btn btn-sm bg-blue-600 hover:bg-blue-400 text-white px-3">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-sm text-white bg-[#1a8cff] hover:bg-[#0077e6]">
                            Login
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;
