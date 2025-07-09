import React from 'react';
import {
    createBrowserRouter,
} from "react-router";
import RootLayout from '../Layout/RootLayout';
import HomeLayout from '../Layout/HomeLayout';
import AllProperties from '../Pages/AllProperties/AllProperties';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: HomeLayout
            },
            {
                path:'allProperties',
                Component:AllProperties
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
   
]);


