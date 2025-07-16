import React from 'react';
import Banner from '../Pages/Home/Banner';
import WhyMetro from '../Pages/Home/WhyMetro';
import MetroStats from '../Pages/Home/MetroStats';
import Spinner from '../Spinner/Spinner';
import LatestReviews from '../Pages/Home/LatestReviews';

const HomeLayout = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestReviews></LatestReviews>
            <WhyMetro></WhyMetro>
            <MetroStats></MetroStats>
            
        </div>
    );
};

export default HomeLayout;