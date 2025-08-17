import React from 'react';
import CountUp from 'react-countup';
import { FaHome, FaUserCheck, FaHandshake, FaStar } from 'react-icons/fa';

const MetroStats = () => {
    const stats = [
        {
            icon: <FaHome className="text-4xl text-blue-500" />,
            title: 'Properties Listed',
            value: 1420,
            suffix: '+',
        },
        {
            icon: <FaUserCheck className="text-4xl text-green-500" />,
            title: 'Verified Agents',
            value: 230,
            suffix: '+',
        },
        {
            icon: <FaHandshake className="text-4xl text-orange-500" />,
            title: 'Successful Deals',
            value: 480,
            suffix: '+',
        },
        {
            icon: <FaStar className="text-4xl text-yellow-500" />,
            title: 'User Rating',
            value: 4.8,
            suffix: '/5',
            decimals: 1,
        },
    ];

    return (
        <section className="my-16 px-4 md:px-10 lg:px-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                MetroNest <span className="text-blue-600">Statistics</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="bg-base-100 shadow-md  rounded-lg py-6 px-4 hover:shadow-lg transition duration-300"
                    >
                        <div className="flex justify-center mb-3">{item.icon}</div>
                        <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                        <p className="text-2xl font-bold text-blue-600">
                            <CountUp
                                end={item.value}
                                duration={2}
                                decimals={item.decimals || 0}
                            />
                            {item.suffix}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MetroStats;
