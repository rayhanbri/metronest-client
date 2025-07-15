import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';
import axios from 'axios';

const AddProperty = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const imageFile = watch('image');
    const priceMin = watch('priceMin');
    const onSubmit = async (data) => {
        try {
            // 1. Upload image to Cloudinary
            const formData = new FormData();
            formData.append('file', imageFile[0]);
            formData.append('upload_preset', 'metronest_unsigned'); // your preset here

            const cloudinaryRes = await axios.post(
                'https://api.cloudinary.com/v1_1/dw4mgofwn/image/upload',
                formData
            );

            const imageUrl = cloudinaryRes.data.secure_url;

            // 2. Prepare property data
            const propertyData = {
                title: data.title,
                location: data.location,
                image: imageUrl,
                priceMin: Number(data.priceMin),
                priceMax: Number(data.priceMax),
                agentName: user.displayName,
                agentEmail: user.email,
                agentImage:user.photoURL,
                status:'pending',
                createdAt: new Date().toISOString(),
            };

            // 3. Save property to backend
            const res = await axiosInstance.post('/properties', propertyData);
            console.log(res);

            Swal.fire({
                icon: 'success',
                title: 'Property Added',
                text: 'Your property has been successfully added.',
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Add Property',
                text: error.message || 'Something went wrong!',
            });
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Add Property</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Property Title */}
                <div>
                    <label className="label">
                        <span className="label-text">Property Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter property title"
                        className="input input-bordered w-full"
                        {...register('title', { required: 'Property title is required' })}
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
                        placeholder="Enter property location"
                        className="input input-bordered w-full"
                        {...register('location', { required: 'Location is required' })}
                    />
                    {errors.location && (
                        <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                    )}
                </div>

                {/* Property Image */}
                <div>
                    <label className="label">
                        <span className="label-text">Property Image</span>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        {...register('image', { required: 'Property image is required' })}
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
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
                        placeholder="Minimum price"
                        className="input input-bordered w-full"
                        {...register('priceMin', {
                            required: 'Minimum price is required',
                            min: { value: 1, message: 'Minimum price must be at least 1' },
                        })}
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
                        placeholder="Maximum price"
                        className="input input-bordered w-full"
                        {...register('priceMax', {
                            required: 'Maximum price is required',
                            min: {
                                value: priceMin || 1,
                                message: 'Maximum price must be greater than or equal to minimum price',
                            },
                        })}
                    />
                    {errors.priceMax && (
                        <p className="text-red-500 text-sm mt-1">{errors.priceMax.message}</p>
                    )}
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Add Property
                </button>
            </form>
        </div>
    );
};

export default AddProperty;
