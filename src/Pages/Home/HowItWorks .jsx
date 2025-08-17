import React from "react";
import { FaSearch, FaHeart, FaHandshake, FaMoneyBillWave } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaSearch size={40} className="text-[#1C6EA4]" />,
    title: "Browse Properties",
    description: "Search and explore verified properties in your desired location.",
  },
  {
    id: 2,
    icon: <FaHeart size={40} className="text-[#33A1E0]" />,
    title: "Add to Wishlist",
    description: "Save your favorite properties for easy reference later.",
  },
  {
    id: 3,
    icon: <FaHandshake size={40} className="text-[#1C6EA4]" />,
    title: "Make an Offer",
    description: "Submit your offer to the agent securely through the platform.",
  },
  {
    id: 4,
    icon: <FaMoneyBillWave size={40} className="text-[#33A1E0]" />,
    title: "Complete Payment",
    description: "Pay securely online once your offer is accepted.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold black mb-12">How It <span className="text-blue-600">Works</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-black mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
