'use client'
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
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LandingLoading />;
  }

  return (
    <div className="w-screen relative before:opacity-0 after:opacity-100 transition-opacity">
      <Navbar />
      <Landing />
      <DataSection />
      <FewFiles />
      <Footer />
    </div>
  );
}
