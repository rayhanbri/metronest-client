import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { useNavigate } from 'react-router';
import useAxios from '../../Hooks/useAxios';

const SocialLogin = ({ from }) => {
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const provider = new GoogleAuthProvider();
    // Explicitly request email
    provider.addScope('email');

    // Force Google to show account chooser and consent screen
    provider.setCustomParameters({
        prompt: 'select_account',
    });

    const { googleLogin } = useAuth();
    const handleLogin = () => {
        googleLogin()
            .then(async (result) => {
               // console.log(result.user)
               // console.log(result.user.providerData[0]?.email)
                const userInfo = {
                    email: result.user.providerData[0]?.email || result.user?.email,
                    name: result.user.displayName,
                    role: 'user', // default
                    image: result.user.photoURL,
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }
                const user = await axiosInstance.post('/users', userInfo);
               // console.log(user.data)

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successfull',
                    text: 'Redirecting to dashboard...',
                    timer: 2000, // time in milliseconds (2000ms = 2s)
                    showConfirmButton: false,
                });
                navigate(from)
            })
            .catch(error => {
              //  console.log(error)
            })
    }

    return (
        <div className='text-center'>
            <p className='mb-2'>or</p>
            {/* Google */}
            <button onClick={handleLogin} className="btn w-full bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>

        </div>
    );
};

export default SocialLogin;