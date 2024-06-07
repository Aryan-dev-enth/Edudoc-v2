"use client";
import React, { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { navbarLinks } from "@/constant.js";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="w-full bg-[#2A0316] h-[100px] bg-none flex justify-between items-center fixed top-0 px-4 lg:px-10 z-10" >
      <div className="leftNav flex items-center">
        <div className="logo">
          <a href="/">
            <h1 className="font-bold text-4xl text-white hover:scale-105 transition-all">
              Edudoc
            </h1>
          </a>
        </div>
        <div className="menu hidden lg:flex ml-10">
          <ul className="text-white list-none flex space-x-6">
            {navbarLinks.map((navLink, index) => (
              <li
                key={index}
                className="hover:scale-105 transition-all cursor-pointer"
              >
                <a href={navLink.url}>{navLink.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="rightNav w-auto px-4 py-2  shadow-black rounded-3xl hidden lg:flex justify-center items-center gap-2">
        {/* <button className="px-8 py-2 rounded-full bg-green-400 text-white font-semibold hover:bg-green-500 transition duration-300">
          Logout
        </button> */}
        <SignedOut>
          <SignInButton className="px-8 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-500 transition duration-300" />
        </SignedOut>
        <SignedIn>
          {user ? (
            <div className="text-lg text-white font-semibold">
              Hello, {user.firstName}
            </div>
          ) : (
            ``
          )}

          <UserButton className="px-8 py-2 rounded-full bg-green-400 text-white font-semibold hover:bg-green-500 transition duration-300" />
        </SignedIn>
      </div>
      <div className="lg:hidden flex items-center gap-2">
        <Hamburger toggled={isOpen} toggle={setOpen} color="white" />
        <UserButton className="px-8 py-2 rounded-full bg-green-400 text-white font-semibold hover:bg-green-500 transition duration-300" />
      </div>
      <div
        className={`absolute top-[90px] left-0 w-full h-[300px] text-white flex flex-col items-center lg:hidden transition-all duration-300 bg-[#2a0316] ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 hidden"
        }`}
      >
        <ul className="list-none flex flex-col items-center space-y-4 py-4">
          {navbarLinks.map((navLink, index) => (
            <li key={index} className="border-b-2">
              <a href={navLink.url}>{navLink.name}</a>
            </li>
          ))}
        </ul>
        <SignedOut>
          <SignInButton className="px-8 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-500 transition duration-300" />
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
