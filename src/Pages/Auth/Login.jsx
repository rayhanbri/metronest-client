import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const { signIn } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state || '/';

    // console.log(from)

    const onSubmit = (data) => {

        signIn(data.email, data.password)
            .then(res => {
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successfull',
                    text: 'Redirecting to dashboard...',
                    timer: 2000, // time in milliseconds (2000ms = 2s)
                    showConfirmButton: false,
                });
                navigate(from)
            })
            .catch((error) => {
                let message = 'Login failed. Please try again.';
                if (error.code === 'auth/user-not-found') {
                    message = 'Email not found. Please check and try again.';
                } else if (error.code === 'auth/wrong-password') {
                    message = 'Incorrect password. Please try again.';
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: message,
                });

            });

        // console.log('Login data:', data);
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Login to <span className="text-blue-600">MetroNest</span></h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary w-full">Login</button>
                </form>
                <SocialLogin from={from}></SocialLogin>
                <p className="text-sm text-center mt-4">
                    Don’t have an account? <span to='register' className="text-blue-600 font-medium cursor-pointer"><Link state={from} to='/register'>Register</Link></span>
                </p>
            </div>
        </div>
    );
};

export default Login;
