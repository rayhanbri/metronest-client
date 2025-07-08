import React from 'react';
import logo from '../../assets/Logo/Untitled design (1).png'
import { Link } from 'react-router';

const MetroNest = () => {
    return (
        <Link to='/'>
            <div className='flex items-center'>
                <img className='mb-2 w-20 h-10' src={logo} alt="" />
                <p><strong className='text-2xl font-bold ml-0 text-[#1a8cff]'>MetroNest</strong></p>
            </div>
        </Link>
    );
};

export default MetroNest;