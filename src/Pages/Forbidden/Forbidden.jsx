import React from 'react';
import { Link } from 'react-router';
import { FaLock } from 'react-icons/fa';

const Forbidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-purple-200 px-4">
            <div className="max-w-md text-center bg-white p-8 rounded-lg shadow-lg">
                <div className="text-6xl text-red-500 mb-4 flex justify-center">
                    <FaLock />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">403 - Forbidden</h1>
                <p className="text-gray-600 mb-6">
                    Oops! You don't have permission to access this page.
                    Please contact the administrator if you believe this is a mistake.
                </p>
                <Link to="/" className="btn btn-primary">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;
