"use client";

import Image from "next/image";
import { useState } from "react";

const ContactPage = () => {
  const [formFeedback, setFormFeedback] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormFeedback("Thank you for getting in touch!");
    setTimeout(() => setFormFeedback(null), 3000); // Clear feedback after 3 seconds
  };

  return (
    <div className="px-6 lg:px-20 py-10 space-y-16">
      {/* Information & Contact Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Information About Us */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Information About Us</h2>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in
            ligula et libero sodales suscipit. Morbi arcu eros, tincidunt non
            turpis non, bibendum porttitor nisi.
          </p>
          <div className="flex space-x-4">
            <div className="w-4 h-4 rounded-full bg-[#5625DF]"></div>
            <div className="w-4 h-4 rounded-full bg-[#FF27B7]"></div>
            <div className="w-4 h-4 rounded-full bg-[#37DAF3]"></div>
          </div>
        </div>

        {/* Contact Way */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Way</h2>
          <ul className="grid grid-cols-2 gap-4">
            {[
              { text: "+877-7-898-989", description: "Support Forum For over 24hr", bg: "bg-[#5726DF]" },
              { text: "info@example.com", description: "Free standard shipping", bg: "bg-[#FB2E86]" },
              { text: "20 Margaret St, London", description: "Great Britain, 3NW-98JR", bg: "bg-[#FFB265]" },
              { text: "20 Margaret St, London", description: "Great Britain, 3NW-98JR", bg: "bg-[#1BE982]" },
            ].map((item, index) => (
              <li key={index} className="flex items-start space-x-4 py-2">
                <div className={`w-8 h-8 rounded-full ${item.bg} flex-shrink-0`}></div>
                <div>
                  <p className="font-semibold">{item.text}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Get In Touch Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          {formFeedback && (
            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md text-center">
              {formFeedback}
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                aria-label="Your Name"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                aria-label="Your Email"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              aria-label="Subject"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <textarea
              placeholder="Type Your Message"
              aria-label="Type Your Message"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              rows={4}
              required
            ></textarea>
            <button
              type="submit"
              className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-md shadow-md hover:bg-pink-600"
            >
              Send Mail
            </button>
          </form>
        </div>
        {/* Illustration */}
        <div>
          <Image
            src="/images/contact.png"
            alt="Contact Illustration"
            width={723}
            height={692}
            className="w-full"
          />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
