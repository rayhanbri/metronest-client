import React from 'react';
import useAuth from '../Hooks/useAuth';
import Spinner from '../Spinner/Spinner';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation();
    const from = location.pathname;

    if(loading){
        return <Spinner></Spinner>;
    }

    if(!user){
        return <Navigate to='/login' state={from}></Navigate>
    }

    return children;
   
};

export default PrivateRoute;