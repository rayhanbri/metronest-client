import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Spinner from '../../Spinner/Spinner';

const AdvertisementSection = () => {
    const axiosSecure = useAxiosSecure();

    const { data: advertised = [], isLoading } = useQuery({
        queryKey: ['advertised-properties'],
        queryFn: async () => {
            const res = await axiosSecure.get('/properties/advertised');
            return res.data;
        }
    });

    console.log(advertised)

    if (isLoading) return <Spinner />;

    return (
        <div className="px-6 py-10">
            <h2 className="text-2xl font-bold mb-6 text-center">🏷️ Advertised Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {advertised.map(property => (
                    <div key={property._id} className="card bg-white border shadow-md">
                        <img src={property.image} className="h-40 w-full object-cover" alt={property.title} />
                        <div className="p-4">
                            <h3 className="font-semibold text-lg">{property.title}</h3>
                            <p className="text-sm text-gray-600">📍 {property.location}</p>
                            <p className="text-sm mt-1">💰 ${property.priceMin} - ${property.priceMax}</p>
                            <p className="text-sm mt-1">✅ {property.status}</p>
                            <Link to={`/propertyDetails/${property._id}`}>
                                <button className="btn btn-sm mt-3 w-full bg-blue-600 text-white">Details</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdvertisementSection;
