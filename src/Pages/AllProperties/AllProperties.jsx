import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Spinner from '../../Spinner/Spinner';

const AllProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['verified-properties'],
    queryFn: async () => {
      const res = await axiosSecure.get('/properties/verified');
      return res.data;
    }
  });

  useEffect(() => {
    let filtered = properties;

    //  Filter by location
    if (searchText) {
      filtered = filtered.filter(p =>
        p.location.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    //  Sort by priceMin
    if (sortOrder === 'asc') {
      filtered = [...filtered].sort((a, b) => a.priceMin - b.priceMin);
    } else if (sortOrder === 'desc') {
      filtered = [...filtered].sort((a, b) => b.priceMin - a.priceMin);
    }

    setFilteredProperties(filtered);
  }, [searchText, sortOrder, properties]);

  if (isLoading) return <Spinner />;

  return (
    <div className="px-6 py-8">
      {/*  Search & Sort Panel */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by location..."
          className="input input-bordered w-full md:w-1/2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          className="select select-bordered w-full md:w-60"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div key={property._id} className="card shadow-md bg-base-100 rounded-lg overflow-hidden ">
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
              <Link to={`/propertyDetails/${property._id}`}>
                <button className="btn btn-sm mt-4 w-full bg-blue-600 text-white">Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
