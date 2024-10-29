import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Edudoc - Expand Your Learning",
  description: "Generated by Aryan & Deepak",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
    <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2966807010235280"
     crossorigin="anonymous"></script>
    <head/>
        <body className={inter.className}>
          <Navbar />
          
          {children}
          <Analytics />
          <SpeedInsights />
          
        </body>
      </html>
    </ClerkProvider>
  );
}
