import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useRole from '../../Hooks/useRole';

const UserProfile = () => {
    const { user } = useAuth();
    const { role } = useRole();

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <div className="flex flex-col items-center">
                <img
                    src={user?.photoURL}
                    alt="User Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
                />
                <h2 className="text-xl font-semibold mt-4">{user?.displayName || 'N/A'}</h2>
                <p className="text-gray-600 mt-1">{user?.email}</p>
                {role !== 'user' && (
                    <span className="mt-2 badge badge-success capitalize">Role: {role}</span>
                )}
            </div>
            {
                user?.metadata?.lastSignInTime && user?.metadata?.creationTime &&
                <div className="mt-6 border-t pt-4 text-gray-700 space-y-2">
                    <p><strong>Account Created:</strong> {user?.metadata?.creationTime}</p>
                    <p><strong>Last Login:</strong> {user?.metadata?.lastSignInTime}</p>
                </div>
            }
        </div>
    );
};

export default UserProfile;
