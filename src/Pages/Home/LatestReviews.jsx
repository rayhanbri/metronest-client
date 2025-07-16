import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Spinner from '../../Spinner/Spinner';

const LatestReviews = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['latestReviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews/latest');
            return res.data;
        }
    });

    if (isLoading) return <Spinner></Spinner>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Latest User Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((review) => (
                    <div key={review._id} className="p-4 border border-blue-600 rounded shadow-amber-100 bg-white">
                        <div className="flex items-center gap-3 mb-2">
                            <img
                                src={review.userPhoto}
                                alt={review.userName}
                                className="w-10 h-10 rounded-full object-cover border"
                            />
                            <div>
                                <p className="font-semibold">{review.userName}</p>
                                <p className="text-sm text-gray-500 ">Property: {review.title}</p>
                            </div>
                        </div>
                        <p className="text-gray-700">{review.reviewText}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestReviews;
