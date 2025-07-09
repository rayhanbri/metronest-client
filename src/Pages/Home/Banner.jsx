import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img1 from '../../assets/Carousel/image1.jpg'
import img2 from '../../assets/Carousel/img2.jpg'
import img3 from '../../assets/Carousel/img3.jpg'
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} interval={1000} autoFocus={true} showThumbs={false} >
            <div className='my-5'>
                <img className='rounded-4xl lg:min-h-screen' src={img1} />

            </div>
            <div className='my-5'>
                <img className='rounded-4xl lg:min-h-screen' src={img2} />

            </div>
            <div className='my-5'>
                <img className='rounded-4xl lg:min-h-screen' src={img3} />
            </div>
          
        </Carousel>
    );
};

export default Banner;