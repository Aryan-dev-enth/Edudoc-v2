import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#2a0316] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-0">
          <div className="flex flex-col items-center">
            <h2 className="text-white text-lg font-bold mb-2">About Us</h2>
            <p className="text-white text-sm">Learn more about our mission</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-white text-lg font-bold mb-2">Contact</h2>
            <p className="text-white text-sm">Reach out to us</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-white text-lg font-bold mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-white text-sm hover:underline">Facebook</a>
              <a href="#" className="text-white text-sm hover:underline">Twitter</a>
              <a href="#" className="text-white text-sm hover:underline">Instagram</a>
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-gray-600 my-8"></div>
        <p className="text-white text-sm text-center">
          © {new Date().getFullYear()} Edudoc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
