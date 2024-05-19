"use client";
import React, { useEffect, useState } from "react";
import Search from "@/components/Search";
import DocumentContainer from "@/components/DocumentContainer";
import { getNotes } from "@/apiCalls";
import { useUser } from "@clerk/nextjs";

const Page = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [updated, setUpdated] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      if (user) {
        console.log(user.publicMetadata);
        const isAdmin = user.publicMetadata.isAdmin ? true : false;
        console.log(isAdmin);
        try {
          const response = await getNotes(isAdmin);
      
          setData(response.data.data);
          setUpdated(false)
          console.log(data)
          console.log(data)
        } catch (error) {
          console.error("Error fetching notes:", error);
        }
      }
    };

    fetchNotes();
  }, [updated, user]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="w-screen min-h-screen bg-[#fffff7] flex flex-col items-center gap-2 lg:gap-8 sm:gap-16 pt-32">
      <h1 className="text-4xl md:text-6xl font-bold text-black text-center">
        Last moment?
      </h1>
      <h4 className="text-lg md:text-2xl text-black text-center">
        Don't worry, we got you covered!
      </h4>
      <Search />
      {data ? <DocumentContainer data={data} setUpdated={setUpdated}/> : <h1>Nothing to display</h1>}
    </div>
  );
};

export default Page;
