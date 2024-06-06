"use client";
import React, { useEffect, useState } from "react";
import Search from "@/components/Search";
import DocumentContainer from "@/components/DocumentContainer";
import { getNotes } from "@/apiCalls";
import { useUser } from "@clerk/nextjs";
import ScreenLoader from "@/components/ScreenLoader";


const Page = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [updated, setUpdated] = useState(false);
  const [verifiedNotes, setVerifiedNotes] = useState(null);
  const [allNotes, setAllNotes] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  

  useEffect(() => {
    const fetchNotes = async () => {
      if (user) {
        const isAdmin = user.publicMetadata.isAdmin ? true : false;

        try {
          if (isAdmin) {
            const allNotesResponse = await getNotes(true);
            setAllNotes(allNotesResponse.data.data);

            const verifiedNotesResponse = await getNotes(false);
            setVerifiedNotes(verifiedNotesResponse.data.data.slice(0, 5));
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

  const filterNotes = (notes) => {
    if (!searchQuery) return notes;
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.college.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  if (!isSignedIn) {
    return (
      <ScreenLoader />
    );
  }

  return (
    <div className="w-screen min-h-screen bg-[#fffff7] flex flex-col items-center gap-2 lg:gap-8 sm:gap-16 pt-32 overflow-hidden">
      <h1 className="text-4xl md:text-6xl font-bold text-black text-center">
        Last moment?
      </h1>
      <h4 className="text-lg md:text-2xl text-black text-center">
        Don't worry, we got you covered!
      </h4>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {verifiedNotes ? (
        <>
          <h2 className="text-2xl lg:mt-4 font-bold text-black">
            Verified Documents
          </h2>
          <DocumentContainer
            data={filterNotes(verifiedNotes)}
            setUpdated={setUpdated}
          />
        </>
      ) : (
        <h1>Nothing to display for verified notes</h1>
      )}
      {user.publicMetadata.isAdmin && allNotes ? (
        <>
          <h2 className="text-2xl font-bold text-black">Admin Dashboard</h2>
          <DocumentContainer
            data={filterNotes(allNotes)}
            setUpdated={setUpdated}
          />
        </>
      ) : (
        user.publicMetadata.isAdmin && <h1>Nothing to display for all notes</h1>
      )}
    </div>
  );
};

export default Page;
