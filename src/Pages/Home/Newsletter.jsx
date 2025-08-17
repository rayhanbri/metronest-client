// Newsletter.jsx
import React from "react";
import Swal from "sweetalert2";

const Newsletter = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
        Swal.fire({
            icon: 'success',
            title: 'Subscribed Successfully',
            text: 'We will send you email every week',
            timer: 2000, // time in milliseconds (2000ms = 2s)
            showConfirmButton: false,
        });
    }

    return (
        <section className="py-16 shadow-md bg-white rounded-lg my-5 ">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl text-black font-bold mb-4">Stay <span className="text-blue-600">Updated!</span></h2>
                <p className="mb-8 text-black">
                    Subscribe to our newsletter to get the latest properties and offers
                    directly in your inbox.
                </p>

                <form className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-2xl mx-auto">
                    <input
                        type="email"
                        name='email'
                        placeholder="Enter your email"
                        className="input input-bordered w-full md:flex-1 rounded-lg px-4 py-3"
                        required />
                    <button
                        type="submit"
                        onSubmit={handleSubmit}
                        className="btn secondary-color text-black border-none rounded-lg px-6 py-3 hover:bg-[#1C6EA4] hover:text-white"
                    >
                        Subscribe
                    </button>
                </form>

                <p className="mt-4 text-sm text-black">
                    We respect your privacy. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
};

export default Newsletter;
