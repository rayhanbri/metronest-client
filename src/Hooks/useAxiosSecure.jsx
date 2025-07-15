import axios from 'axios';
import { useEffect } from 'react';
import { getIdToken } from 'firebase/auth';
import { auth } from '../Firebase/firebase_init'; 
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000', 
});

const useAxiosSecure = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                const user = auth.currentUser;
                if (user) {
                    const token = await getIdToken(user);
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (res) => res,
            (err) => {
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    navigate('/login'); // 🔐 redirect on unauthorized
                }
                return Promise.reject(err);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate]);

    return axiosSecure;
};

export default useAxiosSecure;