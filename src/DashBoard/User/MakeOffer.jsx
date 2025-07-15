import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import Spinner from '../../Spinner/Spinner';

const MakeOffer = () => {
    const { id } = useParams(); // wishlist item id
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [property, setProperty] = useState(null);
    const [offerAmount, setOfferAmount] = useState('');
    const [buyingDate, setBuyingDate] = useState('');

    useEffect(() => {
        axiosSecure.get(`/wishlist-item/${id}`).then(res => {
            const item = res.data;
            setProperty({
                ...item.propertyInfo,
                _id: item.propertyId // manually attach real ID
            });
        });
    }, [id, axiosSecure]);
  
    //  console.log(property.image)


    const handleOffer = async (e) => {
        e.preventDefault();

        const amount = parseFloat(offerAmount);
        if (amount < property.priceMin || amount > property.priceMax) {
            return Swal.fire('Error', 'Offer must be within the price range.', 'error');
        }

        const offerData = {
            propertyId: property._id,
            propertyTitle: property.title,
            propertyLocation: property.location,
            propertyImage: property.image,
            agentName: property.agentName,
            agentEmail: property.agentEmail,
            buyerName: user.displayName,
            buyerEmail: user.email || user.providerData[0]?.email,
            offerAmount: amount,
            buyingDate
        };

        try {
            const res = await axiosSecure.post('/offers', offerData);
            if (res.data.offerId) {
                Swal.fire('Success', 'Offer submitted successfully.', 'success');
            }
        } catch (err) {
            Swal.fire('Error', err.response.data.message || 'Something went wrong', 'error');
        }
    };

    if (!property) return <Spinner></Spinner>;

    return (
        <form onSubmit={handleOffer} className="space-y-4 max-w-3xl mx-auto p-6 bg-white shadow-md rounded">
            {/* Title */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Property Title</span>
                </label>
                <input type="text" value={property.title} readOnly className="input input-bordered w-full" />
            </div>

            {/* Location */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Property Location</span>
                </label>
                <input type="text" value={property.location} readOnly className="input input-bordered w-full" />
            </div>

            {/* Agent Name */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Agent Name</span>
                </label>
                <input type="text" value={property.agentName} readOnly className="input input-bordered w-full" />
            </div>

            {/* Offer Amount */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Offer Amount</span>
                </label>
                <input
                    type="number"
                    value={offerAmount}
                    onChange={e => setOfferAmount(e.target.value)}
                    required
                    placeholder={`Between $${property.priceMin} - $${property.priceMax}`}
                    className="input input-bordered w-full"
                />
            </div>

            {/* Buyer Name */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Buyer Name</span>
                </label>
                <input type="text" value={user.displayName} readOnly className="input input-bordered w-full" />
            </div>

            {/* Buyer Email */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Buyer Email</span>
                </label>
                <input type="text" value={user.email || user.providerData[0]?.email} readOnly className="input input-bordered w-full" />
            </div>

            {/* Buying Date */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Buying Date</span>
                </label>
                <input
                    type="date"
                    value={buyingDate}
                    onChange={e => setBuyingDate(e.target.value)}
                    required
                    className="input input-bordered w-full"
                />
            </div>

            {/* Submit */}
            <div className="form-control w-full">
                <button type="submit" className="btn btn-success w-full">Submit Offer</button>
            </div>
        </form>
    );
};

export default MakeOffer;
