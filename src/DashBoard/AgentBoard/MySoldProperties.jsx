import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const MySoldProperties = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const email = user?.email || user.providerData[0]?.email;

    const { data: soldProperties = [], isLoading } = useQuery({
        queryKey: ['soldProperties', email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/sold-properties/${email}`);
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center py-10">Loading...</p>;

    // calculate total sold amount
    const totalAmount = soldProperties.reduce((sum, property) => sum + property.offerAmount, 0);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">My Sold Properties</h2>

            {/* Total Sold Amount Box */}
            <div className="bg-green-100 border border-green-400 text-green-700 rounded-md p-4 mb-6 text-center">
                <h3 className="text-lg font-semibold">Total Sold Amount: <span className="text-green-900">${totalAmount.toFixed(2)}</span></h3>
            </div>

            {soldProperties.length === 0 ? (
                <p className="text-center">No properties sold yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-200 text-gray-800">
                                <th>#</th>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Buyer Name</th>
                                <th>Buyer Email</th>
                                <th>Sold Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {soldProperties.map((offer, index) => (
                                <tr key={offer._id}>
                                    <td>{index + 1}</td>
                                    <td>{offer.propertyTitle}</td>
                                    <td>{offer.propertyLocation}</td>
                                    <td>{offer.buyerName}</td>
                                    <td>{offer.buyerEmail}</td>
                                    <td>${offer.offerAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MySoldProperties;
