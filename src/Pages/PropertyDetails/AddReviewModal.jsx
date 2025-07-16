import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useRole from '../../Hooks/useRole';

const AddReviewModal = ({ title,agentName,propertyId, setShowModal, refetchReviews }) => {
    const [reviewText, setReviewText] = useState('');
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { role } = useRole();

    // console.log(title,agentName)


    const handleSubmit = async () => {
        try {
            await axiosSecure.post('/reviews', {
                propertyId,
                userEmail: user.email || user.providerData[0]?.email,
                userName: user.displayName,
                userPhoto: user.photoURL,
                title,
                agentName,
                reviewText,
                role
            });
            Swal.fire('Thank you!', 'Your review was submitted.', 'success');
            refetchReviews();
            setShowModal(false);
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
                <h3 className="text-xl font-semibold mb-2">Write a Review</h3>
                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                    className="textarea textarea-bordered w-full mb-4"
                ></textarea>
                <div className="flex justify-end gap-2">
                    <button className="btn btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
                    <button className="btn btn-sm btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default AddReviewModal;
