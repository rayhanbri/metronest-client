import React from 'react';
import Banner from '../Pages/Home/Banner';
import WhyMetro from '../Pages/Home/WhyMetro';
import MetroStats from '../Pages/Home/MetroStats';
import Spinner from '../Spinner/Spinner';
import LatestReviews from '../Pages/Home/LatestReviews';
import AdvertiseProperty from '../DashBoard/AdminBoard/AdvertiseProperty';
import AdvertisementSection from '../Pages/Home/AdvertisementSection';
import Newsletter from '../Pages/Home/Newsletter';
import HowItWorks from '../Pages/Home/HowItWorks ';


const HomeLayout = () => {
    return (
        <div>
            <Banner></Banner>
            <AdvertisementSection></AdvertisementSection>
            <LatestReviews></LatestReviews>
            <HowItWorks></HowItWorks>
            <WhyMetro></WhyMetro>
            <MetroStats></MetroStats>
            <Newsletter></Newsletter>
        </div>
    );
};

export default HomeLayout;