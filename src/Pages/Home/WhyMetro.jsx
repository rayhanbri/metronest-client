import React from 'react';
import { FaShieldAlt, FaMoneyCheckAlt, FaUserCheck, FaHeadset } from 'react-icons/fa';

const WhyMetro = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-3xl text-blue-500" />,
      title: "100% Verified Listings",
      description: "Every property listed on MetroNest goes through a strict admin verification process to ensure accuracy, safety, and trust.",
    },
    {
      icon: <FaMoneyCheckAlt className="text-3xl text-green-500" />,
      title: "Secure Payment System",
      description: "Buyers can make secure payments directly through our platform using trusted methods, ensuring safe and smooth transactions.",
    },
    {
      icon: <FaUserCheck className="text-3xl text-orange-500" />,
      title: "Agent Accountability",
      description: "Our agents are monitored for performance and reliability. We ensure professional conduct and prompt responses from every agent.",
    },
    {
      icon: <FaHeadset className="text-3xl text-purple-500" />,
      title: "24/7 Support",
      description: "Our support team is always available to assist you — whether you're buying, selling, or just exploring the platform.",
    },
  ];

  return (
    <section className="my-16 px-4 md:px-10 lg:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Why Choose <span className="text-blue-600">MetroNest</span>?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <div key={index} className="bg-base-100 shadow-md rounded-lg p-6 text-center  hover:shadow-xl transition duration-300">
            <div className="flex justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyMetro;
