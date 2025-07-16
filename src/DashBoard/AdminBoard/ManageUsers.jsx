// src/Pages/Dashboard/ManageUsers.jsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleRoleUpdate = async (id, role) => {
        const res = await axiosSecure.put(`/users/role/${id}`, { role });
        if (res.data.modifiedCount > 0) {
            Swal.fire(`${role} role assigned`, '', 'success');
            refetch();
        }
    };

    const handleMarkFraud = async (id) => {
        const res = await axiosSecure.put(`/users/fraud/${id}`);
        if (res.data.message) {
            Swal.fire('User marked as fraud', '', 'warning');
            refetch();
        }
    };

    const handleDelete = async (id, email) => {
        // console.log(email)
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete the user and their Firebase account!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete!',
        });

        if (confirm.isConfirmed) {
            await axiosSecure.delete(`/users/${id}?email=${email}`);
            Swal.fire('Deleted!', 'User has been removed.', 'success');
            refetch();
        }
    };

    return (
        <div className="px-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Manage Users</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge ${user.role === 'admin' ? 'badge-success' : user.role === 'agent' ? 'badge-info' : user.role === 'fraud' ? 'badge-error' : ''}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    {
                                        user.role === 'fraud' ? (
                                            <span className="badge badge-error">Fraud</span>
                                        ) : (
                                            <div className="flex gap-2">
                                                {user.role !== 'admin' && (
                                                    <button onClick={() => handleRoleUpdate(user._id, 'admin')} className="btn btn-xs bg-blue-500 text-white">Make Admin</button>
                                                )}
                                                {user.role !== 'agent' && (
                                                    <button onClick={() => handleRoleUpdate(user._id, 'agent')} className="btn btn-xs bg-green-500 text-white">Make Agent</button>
                                                )}
                                                {user.role === 'agent' && (
                                                    <button onClick={() => handleMarkFraud(user._id)} className="btn btn-xs bg-yellow-500 text-white">Mark as Fraud</button>
                                                )}
                                                <button onClick={() => handleDelete(user._id, user.email)} className="btn btn-xs bg-red-600 text-white">Delete</button>
                                            </div>
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
