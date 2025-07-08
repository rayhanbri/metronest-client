import React from 'react';
import {
    createBrowserRouter,
} from "react-router";
import RootLayout from '../Layout/RootLayout';
import HomeLayout from '../Layout/HomeLayout';
import AllProperties from '../Pages/AllProperties/AllProperties';

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
            }
        ]
    },
   
]);


