import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="text-center">
                <h1 className="text-7xl font-extrabold text-error mb-4">404</h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">Page Not Found</h2>
                <p className="mb-6 text-base-content">The page you're looking for doesn't exist or was moved.</p>
                <Link to="/" className="btn btn-primary gap-2">
                    <FaHome />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
