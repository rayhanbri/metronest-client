import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PaymentForm = ({ offer }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (offer?.offerAmount) {
            axiosSecure.post('/create-payment-intent', {
                amount: offer.offerAmount
            }).then(res => {
                setClientSecret(res.data.clientSecret);
            }).catch(err => {
                console.error("Payment intent error:", err);
            });
        }
    }, [offer, axiosSecure]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret) return;

        const card = elements.getElement(CardElement);
        setProcessing(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        console.log(paymentMethod)

        if (error) {
            Swal.fire('Error', error.message, 'error');
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: offer.buyerName,
                    email: offer.buyerEmail,
                },
            },
        });

        if (confirmError) {
            Swal.fire('Payment Failed', confirmError.message, 'error');
            setProcessing(false);
        } else if (paymentIntent.status === 'succeeded') {
            // Update DB with transaction ID
            try {
                const res = await axiosSecure.put(`/offers/mark-paid/${offer._id}`, {
                    transactionId: paymentIntent.id
                });

                if (res.data.modifiedCount > 0) {
                    Swal.fire('Success', 'Payment completed successfully!', 'success');
                } else {
                    Swal.fire('Warning', 'Payment completed but failed to update offer status.', 'warning');
                }
            } catch (err) {
                console.log(err)
                Swal.fire('Error', 'Payment succeeded but database update failed.', 'error');
            }
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4 text-center">Pay for: {offer.propertyTitle}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Offer Amount</span>
                    </label>
                    <input
                        type="text"
                        value={`$${offer.offerAmount}`}
                        className="input input-bordered w-full"
                        readOnly
                    />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Card Details</span>
                    </label>
                    <div className="border p-3 rounded-md">
                        <CardElement />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={!stripe || !clientSecret || processing}
                >
                    {processing ? "Processing..." : `Pay $${offer.offerAmount}`}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
