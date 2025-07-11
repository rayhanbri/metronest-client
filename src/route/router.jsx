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
            // user route 
            {
                path:'user-profile',
                Component:UserProfile
            }
        ]
    }
   
]);


