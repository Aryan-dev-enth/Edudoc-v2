'use client'
import React from "react";
import Search from "../Search";

const Landing = () => {
  const handleArrowClick = () => {
    window.location.href = "#data";
  };

  return (
    <div className=" w-full h-[75vh] flex flex-col items-center justify-center gap-6 px-4 bg-[#2a0316]">
      <img src="landing.png" alt="" className="h-1/2" />
      <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
        Welcome to Edudoc
      </h1>
      <h4 className="text-lg md:text-2xl text-white text-center">
        Your Gateway to Knowledge
      </h4>
      <div className="w-full flex items-center justify-center px-4">
        <Search />
      </div>
      
    </div>
  );
};

export default Landing;
