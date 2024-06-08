import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#2a0316] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-0">
          <div className="flex flex-col items-center">
            <h2 className="text-white text-lg font-bold mb-2">Team</h2>
            <a href="/Team"><p className="text-white text-sm">Learn more about our mission</p></a>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-white text-lg font-bold mb-2">Contact</h2>
            <p className="text-white text-sm">
              Reach out to us{" "}
              <a href="edudoc.community@gmail.com">
                edudoc.community@gmail.com
              </a>
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-white text-lg font-bold mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/aryan-singh-459b6b225/"
                target="_blank"
                className="text-white text-sm hover:underline"
              >
                Linkedin
              </a>
              <a
                href="https://www.instagram.com/just_i.aryan?igsh=bnRldXdiNDF0bGo2"
                target="_blank"
                className="text-white text-sm hover:underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-gray-600 my-8"></div>
        <div className="flex flex-col justify-center items-center gap-4">
          <img src="zerodev.jpeg" className="lg:w-[80px] w-[50px] rounded-full" alt="" />
          <p className="text-white text-sm text-center">
            © {new Date().getFullYear()} Zerodev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
