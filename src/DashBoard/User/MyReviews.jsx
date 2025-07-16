import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Spinner from '../../Spinner/Spinner';

const MyReviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const email = user?.email || user.providerData[0]?.email;

    console.log(email)

    const { data: reviews = [], refetch, isLoading } = useQuery({
        queryKey: ['myReviews', email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-reviews/${email}`);
            return res.data;
        }
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this review.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            const res = await axiosSecure.delete(`/reviews/${id}`);
            if (res.data.deletedCount > 0) {
                Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
                refetch();
            }
        }
    };

    if (isLoading) return <Spinner></Spinner>;

    // console.log(reviews[0].createdAt)

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-center mb-6">My Reviews</h2>
            {reviews.length === 0 ? (
                <p className="text-center">You haven't added any reviews yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="bg-white shadow p-4 rounded">
                            <h3 className="text-xl font-semibold mb-1">{review.title}</h3>
                            <p className="text-gray-600 text-sm mb-1">Agent: {review.agentName}</p>
                            <p className="text-gray-500 text-xs mb-2">Time: {new Date(review.createdAt).toLocaleString()}</p>
                            <p className="mb-2">{review.reviewText}</p>
                            <button
                                onClick={() => handleDelete(review._id)}
                                className="btn btn-sm bg-red-600 text-white"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyReviews;
