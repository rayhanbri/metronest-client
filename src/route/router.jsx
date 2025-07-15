import React from 'react';
import {
    createBrowserRouter,
} from "react-router";
import RootLayout from '../Layout/RootLayout';
import HomeLayout from '../Layout/HomeLayout';
import AllProperties from '../Pages/AllProperties/AllProperties';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Error from '../Error/Error'
import DashboardLayout from '../Layout/DashBoardLayOut';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AgentProfile from '../DashBoard/AgentBoard/AgentProfile';
import AddProperty from '../DashBoard/AgentBoard/AddProperty';
import MyAddedProperties from '../DashBoard/AgentBoard/MyAddedProperties';
import UpdateProperty from '../DashBoard/AgentBoard/UpdateProperty';
import UserProfile from '../DashBoard/User/UserProfile';
import AdminProfile from '../DashBoard/AdminBoard/AdminProfile';
import ManageProperties from '../DashBoard/AdminBoard/ManageProperties';
import ManageUsers from '../DashBoard/AdminBoard/ManageUsers';
import PropertyDetails from '../Pages/PropertyDetails/PropertyDetails';
import Wishlist from '../DashBoard/User/Wishlist';
import MakeOffer from '../DashBoard/User/MakeOffer';
import RequestedProperties from '../DashBoard/AgentBoard/RequestedProperties';
export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <Error/>  ,
        children: [
            {
                index: true,
                Component: HomeLayout
            },
            {
                path:'allProperties',
               element:<PrivateRoute><AllProperties></AllProperties></PrivateRoute>
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path:'register',
                Component: Register
            },
            {
                path : 'propertyDetails/:id',
               element: <PrivateRoute><PropertyDetails></PropertyDetails></PrivateRoute>
            }
        ]
    },
    {
        path: 'dash-board',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                path :'agent-profile',
                Component : AgentProfile
            },
            {
                path:'add-property',
                Component: AddProperty
            },
            {
                path :'my-added-properties',
                Component: MyAddedProperties
            },
            {
                path:'update-property/:id',
               Component: UpdateProperty
            },
            {
                path:'requested-properties',
                Component: RequestedProperties
            },
            // user route 
            {
                path:'user-profile',
                Component:UserProfile
            },
            {
                path:'wishlist',
                Component:Wishlist
            },
            {
                path: 'make-offer/:id',
                Component: MakeOffer

            },
            //admin route 
            {
                path:'admin-profile',
                Component:AdminProfile
            },
            {
                path: 'manage-properties',
                Component: ManageProperties
            },
            {
                path: 'manage-users',
                Component: ManageUsers
            }
        ]
    }
   
]);


