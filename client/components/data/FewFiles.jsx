'use client'
import React, { useState, useEffect } from "react";
import { fewFileNav, fileData } from "@/constant";
import FileCard from "./FileCard";

const FewFiles = () => {
  const [activeNavLink, setActiveNavLink] = useState(0); 
  const [filteredFiles, setFilteredFiles] = useState([]);

  useEffect(() => {
    const defaultNav = fewFileNav[activeNavLink];
    const filtered = fileData.filter(file => file.document_type === defaultNav.document_type);
    setFilteredFiles(filtered);
  }, []); 

  const handleNavClick = (index, documentType) => {
    setActiveNavLink(index);
    const filtered = fileData.filter(file => file.document_type === documentType);
    setFilteredFiles(filtered);
  };

  return (
    <div className="mt-6 py-16 lg:mt-20 px-4 lg:px-0 w-screen min-h-[80vh] flex flex-col justify-center items-center bg-[#f6f7fb] gap-8">
      <h1 className="mt-16 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 text-center">
        Acing Education!
      </h1>
      <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-slate-500 text-center mb-8">
        Explore handwritten notes, study materials from all over the globe.
      </h4>
      <div className="w-full lg:w-[50vw] h-auto lg:h-[60vh] rounded-3xl shadow-xl bg-white pt-16 flex flex-col items-center ">
        <div className="nav w-full h-auto flex justify-center items-center">
          <ul className="w-full h-full flex items-center justify-center gap-16 list-none">
            {fewFileNav.map((navLink, index) => (
              <li
                key={index}
                className={`font-semibold text-lg cursor-pointer hover:text-blue-600 transition-colors ${
                  activeNavLink === index ? 'text-blue-600' : 'text-gray-800'
                }`}
                onClick={() => handleNavClick(index, navLink.document_type)}
              >
                {navLink.name}
              </li>
            ))}
          </ul>
        </div>

        <div className=" container px-12 flex flex-col lg:flex-row lg:flex-wrap">
          {filteredFiles.map((file, index) => (
            <FileCard
              data={file}
              key={index}
            />
          ))}
        </div>
        <a href="/all-notes" className="mt-4 mb-16 px-4 py-2  bg-blue-600 text-white bg-[#] text-center rounded-3xl hover:scale-105 transition-transform">View more</a>
      </div>
     
      
    </div>
  );
};

export default FewFiles;
