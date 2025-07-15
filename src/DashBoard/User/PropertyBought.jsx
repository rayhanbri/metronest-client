import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import Spinner from '../../Spinner/Spinner';

const PropertyBought = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const email = user?.email || user.providerData[0]?.email;

    // ✅ Load all offers made by this user
    const { data: offers = [], isLoading } = useQuery({
        enabled: !!email,
        queryKey: ['offers', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/offers/user?email=${email}`);
            return res.data;
        }
    });

    if (isLoading) return <Spinner></Spinner>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">My Property Offers</h2>
            {offers.length === 0 ? (
                <p className="text-center">You have not offered on any properties yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offers.map(offer => (
                        <div key={offer._id} className="card bg-base-100 shadow-xl">
                            <figure>
                                <img src={offer.propertyImage} alt="Property" className="h-48 w-full object-cover" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{offer.propertyTitle}</h2>
                                <p><span className="font-semibold">Location:</span> {offer.propertyLocation}</p>
                                <p><span className="font-semibold">Agent:</span> {offer.agentName}</p>
                                <p><span className="font-semibold">Offered Amount:</span> ${offer.offerAmount}</p>
                                <p><span className="font-semibold">Status:</span>
                                    <span className={`badge ml-2
  ${offer.status === 'pending' ? 'badge-warning' :
                                            offer.status === 'accepted' ? 'badge-success' :
                                                offer.status === 'bought' ? 'badge-info' :
                                                    offer.status === 'rejected' ? 'badge-error' :
                                                        'badge-secondary'
                                        }`}>
                                        {offer.status}
                                    </span>
                                </p>

                                {/* ✅ Show Pay button if accepted and not yet paid */}
                                {offer.status === 'accepted' && !offer.transactionId && (
                                    <button
                                        onClick={() => navigate(`/dash-board/payment/${offer._id}`)}
                                        className="btn btn-sm bg-green-600 text-white mt-3"
                                    >
                                        Pay
                                    </button>
                                )}

                                {/* ✅ Show transaction ID if paid */}
                                {offer.status === 'bought' && offer.transactionId && (
                                    <p className="text-sm mt-2 text-green-600 font-semibold">
                                        Transaction ID: {offer.transactionId}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PropertyBought;
