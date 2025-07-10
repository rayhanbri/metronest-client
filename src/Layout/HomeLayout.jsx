import React from 'react';
import Banner from '../Pages/Home/Banner';
import WhyMetro from '../Pages/Home/WhyMetro';
import MetroStats from '../Pages/Home/MetroStats';
import Spinner from '../Spinner/Spinner';

const HomeLayout = () => {
    return (
        <div>
           <Banner></Banner>
           <WhyMetro></WhyMetro>
           <MetroStats></MetroStats>
        </div>
    );
};

export default HomeLayout;