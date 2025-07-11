import React from 'react';
import useRole from '../../Hooks/useRole';
import useAuth from '../../Hooks/useAuth';

const AgentProfile = () => {
    const { role, isLoading } = useRole();
    const { user } = useAuth();

    if (isLoading) {
        return <p>Loading user info...</p>;
    }

    // If user is regular (e.g., role === 'user'), don't show the role or profile
    if (!role || role === 'user') {
        return <p>This page is only for agents or special users.</p>;
    }

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Agent Profile</h2>
            <div className="flex items-center space-x-4">
                <img
                    src={user?.photoURL || '/default-profile.png'}
                    alt={user?.displayName || 'User'}
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                    <p className="text-lg font-semibold">{user?.displayName || 'No Name'}</p>
                    {role && <p className="text-sm text-gray-600">Role: {role}</p>}
                </div>
            </div>

            {/* You can add more agent-related info here */}
            <div className="mt-6">
                <p>Welcome to your dashboard! Here you can manage your properties and view your stats.</p>
            </div>
        </div>
    );
};

export default AgentProfile;
