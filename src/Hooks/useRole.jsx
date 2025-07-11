import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Use fallback email from providerData if top-level email is missing
    const userEmail = user?.email || user?.providerData?.[0]?.email;

    const {
        data: role = null,
        isLoading,
        refetch,
        isError
    } = useQuery({
        enabled: !loading && !!userEmail,
        queryKey: ['role', userEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${userEmail}`);
            return res.data?.role || null;
        }
    });

    return { role, isLoading, refetch, isError };
};

export default useRole;
