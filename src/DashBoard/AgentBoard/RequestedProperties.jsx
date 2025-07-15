import React from 'react';
import { useQuery} from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const RequestedProperties = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: offers = [], refetch } = useQuery({
        queryKey: ['offers', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/offers/agent/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const handleAccept = async (id) => {
        try {
            await axiosSecure.put(`/offers/accept/${id}`);
            Swal.fire('Accepted!', 'Offer has been accepted.', 'success');
            refetch();
        } catch (err) {
            console.log(err)
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    const handleReject = async (id) => {
        try {
            await axiosSecure.put(`/offers/reject/${id}`);
            Swal.fire('Rejected!', 'Offer has been rejected.', 'success');
            refetch();
        } catch (err) {
            console.log(err)
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Requested/Offered Properties</h2>
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Buyer Name</th>
                        <th>Buyer Email</th>
                        <th>Offer</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {offers.map(offer => (
                        <tr key={offer._id}>
                            <td>{offer.propertyTitle}</td>
                            <td>{offer.propertyLocation}</td>
                            <td>{offer.buyerName}</td>
                            <td>{offer.buyerEmail}</td>
                            <td>${offer.offerAmount}</td>
                            <td>
                                <span className={`badge ${offer.status === 'accepted' ? 'badge-success' :
                                        offer.status === 'rejected' ? 'badge-error' : 'badge-warning'
                                    }`}>
                                    {offer.status}
                                </span>
                            </td>
                            <td className="space-x-2">
                                {offer.status === 'pending' && (
                                    <>
                                        <button className="btn btn-success btn-sm"
                                            onClick={() => handleAccept(offer._id)}>
                                            Accept
                                        </button>
                                        <button className="btn btn-error btn-sm"
                                            onClick={() => handleReject(offer._id)}>
                                            Reject
                                        </button>
                                    </>
                                )}
                                {(offer.status === 'accepted' || offer.status === 'rejected') && (
                                    <span className="text-gray-500">No actions</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestedProperties;
