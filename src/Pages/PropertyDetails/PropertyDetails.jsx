import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import AddReviewModal from './AddReviewModal';

const PropertyDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [property, setProperty] = useState({});
    const [reviews, setReviews] = useState([]);
    const [showReviewModal, setShowReviewModal] = useState(false);

    useEffect(() => {
        axiosSecure.get(`/properties/${id}`).then(res => setProperty(res.data));
        axiosSecure.get(`/reviews/${id}`).then(res => setReviews(res.data));
    }, [id, axiosSecure]);

    const handleAddToWishlist = async () => {
        try {
            await axiosSecure.post('/wishlist', {
                userEmail: user.email || user.providerData[0]?.email,
                propertyId: id,
                propertyInfo: {
                    title: property.title,
                    image: property.image,
                    location: property.location,
                    agentName: property.agentName,
                    agentImage: property.agentImage,
                    agentEmail: property.agentEmail,
                    propertyStatus: property.status,
                    priceMin: property.priceMin,
                    priceMax: property.priceMax,
                }
            });
            Swal.fire('Added!', 'Property added to wishlist.', 'success');
        } catch (err) {
            Swal.fire('Error', err.response.data.message || 'Something went wrong', 'error');
        }
    };

    return (
        <div className="px-4 max-w-5xl mx-auto">
            <img src={property.image} alt="Property" className="w-full h-96 object-cover mb-4 rounded" />
            <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
            <p className="text-lg text-gray-600 mb-2">{property.location}</p>
            <p className="text-sm mb-2"><strong>Agent:</strong> {property.agentName}</p>
            <p className="text-sm mb-4"><strong>Price Range:</strong> ${property.priceMin} - ${property.priceMax}</p>
            <p className="mb-4">{property.description || "No description provided."}</p>

            <button onClick={handleAddToWishlist} className="btn bg-pink-500 text-white mb-4">Add to Wishlist</button>

            <div className="mt-8">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-semibold">Reviews</h3>
                    <button onClick={() => setShowReviewModal(true)} className="btn btn-outline btn-sm">Add a Review</button>
                </div>
                {reviews.length === 0 ? (
                    <p className="text-gray-600">No reviews yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {reviews.map((review) => (
                            <li key={review._id} className="p-3 border rounded bg-white shadow">
                                <div className="flex items-center gap-2 mb-1">
                                    <img src={review.userPhoto} className="w-8 h-8 rounded-full" alt="" />
                                    <span className="font-medium">{review.userName}</span>
                                </div>
                                <p className="text-sm font-bold">{review.reviewText}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {showReviewModal && (
                <AddReviewModal
                    propertyId={id}
                    setShowModal={setShowReviewModal}
                    refetchReviews={() => axiosSecure.get(`/reviews/${id}`).then(res => setReviews(res.data))}
                />
            )}
        </div>
    );
};

export default PropertyDetails;
