import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ManageReviews = () => {
    const axiosSecure = useAxiosSecure();

    //  Fetch all reviews
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['adminReviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/reviews');
            return res.data;
        }
    });

    //  Delete review mutation
    const deleteReview = useMutation({
        mutationFn: async (id) => {
            return await axiosSecure.delete(`/admin/reviews/${id}`);
        },
        onSuccess: () => {
            Swal.fire('Deleted!', 'Review has been removed.', 'success');
            refetch();
        },
        onError: () => {
            Swal.fire('Error', 'Could not delete review.', 'error');
        }
    });

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Manage User Reviews</h2>
            {reviews.length === 0 ? (
                <p className="text-center text-gray-500">No reviews available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="border p-4 rounded shadow bg-white">
                            <div className="flex items-center gap-3 mb-2">
                                <img src={review.userPhoto} alt="Reviewer" className="w-10 h-10 rounded-full border" />
                                <div>
                                    <p className="font-semibold">{review.userName}</p>
                                    <p className="text-sm text-gray-500">{review.userEmail}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-700 mb-3">{review.reviewText}</p>
                            <button
                                onClick={() => {
                                    Swal.fire({
                                        title: 'Are you sure?',
                                        text: 'This review will be permanently deleted.',
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#d33',
                                        confirmButtonText: 'Yes, delete it!'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            deleteReview.mutate(review._id);
                                        }
                                    });
                                }}
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

export default ManageReviews;
