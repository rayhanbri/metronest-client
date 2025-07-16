import React from 'react';
import { Navigate } from 'react-router';
import Spinner from '../Spinner/Spinner';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, isLoading } = useRole();

    if (loading || isLoading) {
        return <Spinner></Spinner>
    }

    if (!user || role !== 'admin') {
        return <Navigate to='/forbidden'></Navigate>
    }
    return children
};

export default AdminRoute;