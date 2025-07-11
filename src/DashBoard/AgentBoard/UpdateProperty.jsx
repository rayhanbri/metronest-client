import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const [loading, setLoading] = useState(true);
    const [property, setProperty] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const imageFile = watch('image');
    const priceMin = watch('priceMin');

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await axiosInstance.get(`/properties/${id}`);
                setProperty(res.data);

                // Reset form with existing data
                reset({
                    title: res.data.title,
                    location: res.data.location,
                    priceMin: res.data.priceMin,
                    priceMax: res.data.priceMax,
                });
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'Failed to fetch property data', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id, reset, axiosInstance]);

    const onSubmit = async (data) => {
        if (property.status === 'rejected') {
            Swal.fire('Cannot Update', 'This property is rejected and cannot be updated', 'warning');
            return;
        }

        try {
            setLoading(true);

            let imageUrl = property.image;

            // Upload new image if changed
            if (imageFile && imageFile.length > 0) {
                const formData = new FormData();
                formData.append('file', imageFile[0]);
                formData.append('upload_preset', 'metronest_unsigned');

                const cloudinaryRes = await axios.post(
                    'https://api.cloudinary.com/v1_1/dw4mgofwn/image/upload',
                    formData
                );

                imageUrl = cloudinaryRes.data.secure_url;
            }

            const updatedProperty = {
                title: data.title,
                location: data.location,
                priceMin: Number(data.priceMin),
                priceMax: Number(data.priceMax),
                image: imageUrl,
                agentName: user.displayName,
                agentEmail: user.email,
                status: property.status,
                updatedAt: new Date().toISOString(),
            };

            await axiosInstance.put(`/properties/${id}`, updatedProperty);

            Swal.fire({
                icon: 'success',
                title: 'Property Updated',
                timer: 2000,
                showConfirmButton: false,
            });

            navigate('/dash-board/my-added-properties');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to update property', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!property) return <div className="text-center mt-10">Property not found</div>;

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Update Property</h2>

            {property.status === 'rejected' && (
                <p className="text-center text-red-600 mb-4 font-semibold">
                    This property is rejected and cannot be updated.
                </p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Property Image */}
                <div>
                    <label className="label">
                        <span className="label-text">Property Image</span>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        {...register('image')}
                        disabled={property.status === 'rejected'}
                    />
                    <p className="mt-2">Current Image:</p>
                    <img
                        src={property.image}
                        alt="Property"
                        className="w-full h-40 object-cover rounded"
                    />
                </div>

                {/* Property Title */}
                <div>
                    <label className="label">
                        <span className="label-text">Property Title</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        {...register('title', { required: 'Property title is required' })}
                        disabled={property.status === 'rejected'}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                {/* Property Location */}
                <div>
                    <label className="label">
                        <span className="label-text">Property Location</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        {...register('location', { required: 'Location is required' })}
                        disabled={property.status === 'rejected'}
                    />
                    {errors.location && (
                        <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                    )}
                </div>

                {/* Agent Name (readonly) */}
                <div>
                    <label className="label">
                        <span className="label-text">Agent Name</span>
                    </label>
                    <input
                        type="text"
                        value={user?.displayName || ''}
                        readOnly
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Agent Email (readonly) */}
                <div>
                    <label className="label">
                        <span className="label-text">Agent Email</span>
                    </label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Price Min */}
                <div>
                    <label className="label">
                        <span className="label-text">Minimum Price</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register('priceMin', {
                            required: 'Minimum price is required',
                            min: { value: 1, message: 'Minimum price must be at least 1' },
                        })}
                        disabled={property.status === 'rejected'}
                    />
                    {errors.priceMin && (
                        <p className="text-red-500 text-sm mt-1">{errors.priceMin.message}</p>
                    )}
                </div>

                {/* Price Max */}
                <div>
                    <label className="label">
                        <span className="label-text">Maximum Price</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register('priceMax', {
                            required: 'Maximum price is required',
                            min: {
                                value: Number(priceMin) || 1,
                                message: 'Maximum price must be greater than or equal to minimum price',
                            },
                        })}
                        disabled={property.status === 'rejected'}
                    />
                    {errors.priceMax && (
                        <p className="text-red-500 text-sm mt-1">{errors.priceMax.message}</p>
                    )}
                </div>

                {property.status !== 'rejected' && (
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Property'}
                    </button>
                )}
            </form>
        </div>
    );
};

export default UpdateProperty;
