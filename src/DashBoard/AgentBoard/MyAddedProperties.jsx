import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import Spinner from '../../Spinner/Spinner';

const MyAddedProperties = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const email = user?.email || user.providerData[0]?.email;

    // Fetch properties by email
    const { data: properties = [], refetch, isLoading } = useQuery({
        queryKey: ['my-properties', email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/properties?email=${email}`);
            return res.data;
        }
    });

    // Delete handler
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete the property permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/properties/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire('Deleted!', 'Property has been deleted.', 'success');
                    refetch();
                }
            } catch (error) {
                //console.log(error)
                Swal.fire('Error', 'Failed to delete property', 'error');
            }
        }
    };

    if (isLoading) return <Spinner></Spinner>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">My Added Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map(property => (
                    <div key={property._id} className="border rounded-lg shadow-md p-4 bg-white">
                        <img src={property.image} alt={property.title} className="w-full h-40 object-cover rounded" />

                        <h3 className="text-lg font-semibold mt-2">{property.title}</h3>
                        <p className="text-sm text-gray-600">Location: {property.location}</p>
                        <div>
                            <p className="text-sm text-gray-600 mt-1">Agent: {property.agentName}</p>
                            <img
                                src={user?.photoURL}
                                alt={property.agentName}
                                className="w-10 h-10 rounded-full mt-1 border"
                            />
                        </div>

                        {/* Status */}
                        <span className={`badge mt-2 ${property.status === 'pending' ? 'badge-warning' :
                                property.status === 'verified' ? 'badge-success' :
                                    property.status === 'rejected' ? 'badge-error' :
                                        ''
                            }`}>
                            {property.status}
                        </span>

                        {/* Price */}
                        <div className="mt-2 text-sm">
                            <p>Price Range:{property.priceMin}-{property.priceMax}</p>
                        </div>

                        <div className="flex justify-between mt-4">
                            {/* Update Button - hidden if rejected */}
                            {property.status !== 'rejected' && (
                                <Link
                                    to={`/dash-board/update-property/${property._id}`}
                                    className="btn btn-sm bg-blue-600 text-white"
                                >
                                    Update
                                </Link>
                            )}

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(property._id)}
                                className="btn btn-sm bg-red-600 text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAddedProperties;
