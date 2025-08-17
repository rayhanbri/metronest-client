// FAQ.jsx
import React from "react";

const FAQ = () => {
  return (
    <section className="py-16 bg-base-100 shadow-md rounded-lg my-5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-black mb-12">
          Frequently Asked <span className="text-blue-600">Questions</span>
        </h2>

        <div className="max-w-3xl mx-auto space-y-4 text-left">
          {/* Accordion item 1 */}
          <div className="collapse bg-base-100 border border-base-300 rounded-lg">
            <input type="radio" name="my-accordion-1" defaultChecked />
            <div className="collapse-title font-semibold text-[#1C6EA4]">
              How do I list my property on MetroNest?
            </div>
            <div className="collapse-content text-sm text-gray-700">
              Sign up as an agent, verify your profile, and use the "Add Property" button
              to submit your property for listing.
            </div>
          </div>

          {/* Accordion item 2 */}
          <div className="collapse bg-base-100 border border-base-300 rounded-lg">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title font-semibold text-[#1C6EA4]">
              How can I make an offer on a property?
            </div>
            <div className="collapse-content text-sm text-gray-700">
              Navigate to the property details page, click "Make an Offer," enter your
              offer amount within the price range, and submit it. The agent will review it.
            </div>
          </div>

          {/* Accordion item 3 */}
          <div className="collapse bg-base-100 border border-base-300 rounded-lg">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title font-semibold text-[#1C6EA4]">
              How do I pay for a property after my offer is accepted?
            </div>
            <div className="collapse-content text-sm text-gray-700">
              Once your offer is accepted, click the "Pay" button on your Property Bought
              page and complete the payment securely via Stripe.
            </div>
          </div>

          {/* Accordion item 4 */}
          <div className="collapse bg-base-100 border border-base-300 rounded-lg">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title font-semibold text-[#1C6EA4]">
              What happens if an agent is marked as fraud?
            </div>
            <div className="collapse-content text-sm text-gray-700">
              Properties added by agents marked as fraud are removed from listings, and
              those agents cannot add new properties. Always check the verification badge.
            </div>
          </div>

          {/* Accordion item 5 */}
          <div className="collapse bg-base-100 border border-base-300 rounded-lg">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title font-semibold text-[#1C6EA4]">
              How do I add properties to my wishlist?
            </div>
            <div className="collapse-content text-sm text-gray-700">
              On any property card or details page, click the "Add to Wishlist" button to
              save it for later reference. You can view all wishlisted properties in your dashboard.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
