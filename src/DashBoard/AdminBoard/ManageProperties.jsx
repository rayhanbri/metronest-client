import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ManageProperties = () => {
    const axiosSecure = useAxiosSecure();

    const { data: properties = [], refetch } = useQuery({
        queryKey: ['all-properties'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-properties'); // You may reuse `/properties` without filter
            return res.data;
        }
    });

    const handleStatusUpdate = async (id, status) => {
        try {
            const res = await axiosSecure.put(`/properties/status/${id}`, { status });
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: `Property ${status}`,
                    timer: 1500,
                    showConfirmButton: false
                });
                refetch();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="overflow-x-auto px-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Manage Properties</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Agent Name</th>
                        <th>Agent Email</th>
                        <th>Price Range</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property, index) => (
                        <tr key={property._id}>
                            <td>{index + 1}</td>
                            <td>{property.title}</td>
                            <td>{property.location}</td>
                            <td>{property.agentName}</td>
                            <td>{property.agentEmail}</td>
                            <td>${property.priceMin} - ${property.priceMax}</td>
                            <td>
                                <span className={`badge ${property.status === 'verified' ? 'badge-success' :
                                        property.status === 'rejected' ? 'badge-error' :
                                            'badge-warning'
                                    }`}>
                                    {property.status}
                                </span>
                            </td>
                            <td>
                                {property.status === 'pending' ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleStatusUpdate(property._id, 'verified')}
                                            className="btn btn-xs bg-green-500 text-white"
                                        >
                                            Verify
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(property._id, 'rejected')}
                                            className="btn btn-xs bg-red-500 text-white"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                ) : (
                                    <span className="text-sm text-gray-500">No action</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProperties;
