import React from 'react';
import Banner from '../Pages/Home/Banner';
import WhyMetro from '../Pages/Home/WhyMetro';
import MetroStats from '../Pages/Home/MetroStats';
import Spinner from '../Spinner/Spinner';
import LatestReviews from '../Pages/Home/LatestReviews';
import AdvertiseProperty from '../DashBoard/AdminBoard/AdvertiseProperty';
import AdvertisementSection from '../Pages/Home/AdvertisementSection';

const HomeLayout = () => {
    return (
        <div>
            <Banner></Banner>
            <AdvertisementSection></AdvertisementSection>
            <LatestReviews></LatestReviews>
            <WhyMetro></WhyMetro>
            <MetroStats></MetroStats>
            
        </div>
    );
};

export default HomeLayout;