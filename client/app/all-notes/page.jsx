"use client";
import React, { useEffect, useState } from "react";
import Search from "@/components/Search";
import DocumentContainer from "@/components/DocumentContainer";
import { getNotes } from "@/apiCalls";
import { useUser } from "@clerk/nextjs";

const Page = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [updated, setUpdated] = useState(false);
  const [verifiedNotes, setVerifiedNotes] = useState(null);
  const [allNotes, setAllNotes] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      if (user) {
        console.log(user.publicMetadata);
        const isAdmin = user.publicMetadata.isAdmin ? true : false;

        try {
          if (isAdmin) {
            const allNotesResponse = await getNotes(true);
            setAllNotes(allNotesResponse.data.data);

            const verifiedNotesResponse = await getNotes(false);
            setVerifiedNotes(verifiedNotesResponse.data.data);
          } else {
            const verifiedNotesResponse = await getNotes(false);
            setVerifiedNotes(verifiedNotesResponse.data.data);
          }

          setUpdated(false);
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
      {verifiedNotes ? (
        <>
          <h2 className="text-2xl font-bold text-black">Verified Notes</h2>
          <DocumentContainer data={verifiedNotes} setUpdated={setUpdated} />
        </>
      ) : (
        <h1>Nothing to display for verified notes</h1>
      )}
      {user.publicMetadata.isAdmin && allNotes ? (
        <>
          <h2 className="text-2xl font-bold text-black">All Notes</h2>
          <DocumentContainer data={allNotes} setUpdated={setUpdated} />
        </>
      ) : (
        user.publicMetadata.isAdmin && <h1>Nothing to display for all notes</h1>
      )}
    </div>
  );
};

export default Page;
