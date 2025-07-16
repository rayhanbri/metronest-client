import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AdvertiseProperty = () => {
    const axiosSecure = useAxiosSecure();

    const { data: properties = [], refetch } = useQuery({
        queryKey: ['admin-verified-properties'],
        queryFn: async () => {
            const res = await axiosSecure.get('/properties/verified');
            return res.data;
        }
    });

    const { mutateAsync: advertiseProperty } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/properties/advertise/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Success', 'Property advertised successfully!', 'success');
            refetch();
        }
    });

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">📢 Advertise Property</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Price</th>
                            <th>Agent</th>
                            <th>Status</th>
                            <th>Advertise</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property) => (
                            <tr key={property._id}>
                                <td><img src={property.image} className="w-14 h-14 rounded object-cover" /></td>
                                <td>{property.title}</td>
                                <td>{property.location}</td>
                                <td>${property.priceMin} - ${property.priceMax}</td>
                                <td>{property.agentName}</td>
                                <td>
                                    {property.isAdvertised ? (
                                        <span className="badge badge-info">Advertised</span>
                                    ) : (
                                        <span className="badge badge-warning">Not Advertised</span>
                                    )}
                                </td>
                                <td>
                                    <button
                                        disabled={property.isAdvertised}
                                        onClick={() => advertiseProperty(property._id)}
                                        className="btn btn-sm btn-primary"
                                    >
                                        Advertise
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdvertiseProperty;
