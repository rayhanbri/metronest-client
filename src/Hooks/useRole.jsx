// src/Hooks/useRole.js
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user, loading } = useAuth(); // get current Firebase user
    const axiosSecure = useAxiosSecure(); // your axios instance with baseURL and JWT token

    const { data: role = null, isLoading, refetch, isError } = useQuery({
        enabled: !loading && !!user?.email, // only run if user and email exist
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data?.role || null;
        }
    });

    return { role, isLoading, refetch, isError };
};

export default useRole;
