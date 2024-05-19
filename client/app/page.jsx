import Navbar from "@/components/navbar/Navbar";
import Landing from "@/components/landing/Landing";
import DataSection from "@/components/data/DataSection";
import FewFiles from "@/components/data/FewFiles";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-screen relative">
      <Navbar />
      <Landing />
      <DataSection />
      <FewFiles />
      <Footer />
    </div>
  );
}
