import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';
import useAxios from '../../Hooks/useAxios';

const Register = () => {
    const { createUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const axiosInstance = useAxios();
    const location = useLocation();
    const from = location.state || '/';
    const navigate = useNavigate();
    // console.log(from)



    const onSubmit = (data) => {
        // createUser 
        createUser(data.email, data.password)
            .then(async (res) => {
                console.log(res.data)
                // update use info in data base 
                const userInfo = {
                    email: data.email,
                    role: 'user', // default
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }
                const user = await axiosInstance.post('/users', userInfo);
                console.log(user.data)
                Swal.fire({
                    icon: 'success',
                    title: 'Register Successfull',
                    text: 'Redirecting ...',
                    timer: 2000, // time in milliseconds (2000ms = 2s)
                    showConfirmButton: false,
                });

                navigate(from)
            })
            .catch(error => {
                console.log(error)
            })

        console.log('Register Form Data:', data);
        // onRegister(data.name, data.email, data.password);
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Create Your <span className="text-blue-600">MetroNest</span> Account
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className="input input-bordered w-full"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                                    message: "Must include a capital letter and a special character"
                                }
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Register
                    </button>
                </form>
                <SocialLogin></SocialLogin>
                <p className="text-sm text-center mt-4">
                    Already have an account?{' '}
                    <span className="text-blue-600 font-medium cursor-pointer"><Link to='/login'>Login</Link></span>
                </p>
            </div>
        </div>
    );
};

export default Register;
