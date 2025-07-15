import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import PaymentForm from './PaymentForm';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Spinner from '../../Spinner/Spinner';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    const { id } = useParams(); 
    const axiosSecure = useAxiosSecure();
    const [offer, setOffer] = useState(null);

    useEffect(() => {
        axiosSecure.get(`/offers/${id}`).then(res => {
            setOffer(res.data);
        }).catch(err => {
            console.error('Error loading offer:', err);
        });
    }, [id, axiosSecure]);

    if (!offer) return <Spinner/>;

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm offer={offer} />
        </Elements>
    );
};

export default Payment;
