import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Spinner from '../../Spinner/Spinner';

const AllProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(user)

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['verified-properties'],
    queryFn: async () => {
      const res = await axiosSecure.get('/properties/verified');
      return res.data;
    }
  });

  if (isLoading) return <Spinner></Spinner>;

  return (
    <div className="px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map(property => (
        <div key={property._id} className="card shadow-md border rounded-md overflow-hidden">
          <img src={property.image} alt={property.title} className="h-48 w-full object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <p className="text-gray-600">📍 {property.location}</p>
            <div className="flex items-center gap-3 my-2">
              <img src={property.agentImage || '/default-avatar.png'} className="w-8 h-8 rounded-full" alt="Agent" />
              <p className="text-sm">{property.agentName}</p>
            </div>
            <p className="text-sm">💰 Price Range: ${property.priceMin} - ${property.priceMax}</p>
            <span className="badge badge-success mt-2">✅ Verified</span>
            <Link to={`/property-details/${property._id}`}>
              <button className="btn btn-sm mt-4 w-full bg-blue-600 text-white">Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProperties;
