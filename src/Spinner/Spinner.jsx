import React from 'react';

const Spinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-base-100">
            <div className="text-center">
                {/* Spinner */}
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto mb-4"></div>

                {/* Logo-style text or app name */}
                <h2 className="text-xl font-bold text-blue-600 animate-pulse">Loading MetroNest...</h2>

                {/* Optional text */}
                <p className="text-sm text-gray-500 mt-2">Please wait a moment</p>
            </div>
        </div>
    );
};

export default Spinner;