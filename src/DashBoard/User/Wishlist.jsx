import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Wishlist = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const email = user?.email || user.providerData[0]?.email;

    //  Load wishlist items for logged-in user
    const { data: wishlist = [], refetch } = useQuery({
        enabled: !!email,
        queryKey: ['wishlist', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist?email=${email}`);
            return res.data;
        }
    });

    // Remove property from wishlist
    const removeFromWishlist = async (id) => {
        try {
            const res = await axiosSecure.delete(`/wishlist/${id}`);
            if (res.data.deletedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Removed from wishlist',
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
        <div className="p-4">
            <h2 className="text-2xl font-bold text-center mb-6">My Wishlist</h2>
            {wishlist.length === 0 ? (
                <p className="text-center">You have no properties in your wishlist.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item) => {
                        const property = item.propertyInfo; // Destructure propertyInfo
                        console.log(property.agentImage)
                        return (
                            <div key={item._id} className="card bg-base-100 shadow-xl">
                                <figure>
                                    <img src={property.image} alt={property.title} className="h-48 w-full object-cover" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{property.title}</h2>
                                    <p><span className="font-semibold">Location:</span> {property.location}</p>
                                    <p><span className="font-semibold">Agent:</span> {property.agentName}</p>
                                    <div className="flex items-center gap-2">
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img src={property.agentImage || '/default-avatar.png'} alt="Agent" />
                                            </div>
                                        </div>

                                        <span className="text-sm text-gray-600">{property.agentEmail}</span>
                                    </div>
                                    <p><span className="font-semibold">Price:</span> ${property.priceMin} - ${property.priceMax}</p>
                                    <span className={`badge ${property.propertyStatus === 'verified'
                                        ? 'badge-success'
                                        : property.propertyStatus === 'pending'
                                            ? 'badge-warning'
                                            : 'badge-error'
                                        }`}>
                                        {property.propertyStatus}
                                    </span>
                                    <div className="card-actions justify-between mt-4">
                                        <button
                                            className="btn btn-sm bg-blue-600 text-white"
                                            onClick={() => navigate(`/dash-board/make-offer/${item._id}`)}
                                        >
                                            Make an Offer
                                        </button>
                                        <button
                                            className="btn btn-sm bg-red-600 text-white"
                                            onClick={() => removeFromWishlist(item._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
