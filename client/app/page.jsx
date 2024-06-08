"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import Landing from "@/components/landing/Landing";
import DataSection from "@/components/data/DataSection";
import FewFiles from "@/components/data/FewFiles";
import Footer from "@/components/Footer";
import LandingLoading from "@/components/LandingLoading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LandingLoading />;
  }

  return (
    <div className="w-screen relative  transition-opacity overflow-x-hidden ">
      <Navbar />
      <Landing />

      <DataSection />
     
      <FewFiles />
      <Footer />
     
    </div>
  );
}
