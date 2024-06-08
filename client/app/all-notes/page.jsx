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
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const fetchNotes = async () => {
      if (user) {
        const isAdmin = user.publicMetadata.isAdmin ? true : false;

        try {
          setLoading(true);
          if (isAdmin) {
            const allNotesResponse = await getNotes(true);
            setAllNotes(allNotesResponse.data.data);

            const verifiedNotesResponse = await getNotes(false);
            setVerifiedNotes(verifiedNotesResponse.data.data);
          } else {
            const verifiedNotesResponse = await getNotes(false);
            setVerifiedNotes(verifiedNotesResponse.data.data);
          }
          setLoading(false);
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

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const filterByType = (notes) => {
    if (filterType === "all") return notes;
    return notes.filter((note) => note.document_type === filterType);
  };

  if (!isSignedIn) {
    return (
      <div className="w-screen h-screen bg-[#fffff7] flex flex-col justify-center items-center gap-4">
        <img src="crying.jpg" alt="" className="h-1/4 rounded-xl " />
        <h1 className="lg:text-2xl text-md font-light">
          Be logged in to view all the notes!
        </h1>
      </div>
    );
  }

  if (loading) {
    return <ScreenLoader />;
  }

  const filteredVerifiedNotes = verifiedNotes
    ? filterByType(filterNotes(verifiedNotes))
    : [];
  const filteredAllNotes = allNotes
    ? filterByType(filterNotes(allNotes))
    : [];

  return (
    <div className="w-screen min-h-screen bg-[#fffff7] flex flex-col items-center gap-8 pt-32 px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-black text-center">
        Last moment?
      </h1>
      <h4 className="text-lg md:text-2xl text-black text-center">
        Don't worry, we got you covered!
      </h4>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="w-full flex justify-center items-center sm:flex-row flex-col mb-4 gap-4 text-sm lg:text-lg px-8">
        <label htmlFor="filterType" className="font-medium">
          Filter by:
        </label>
        <div className="flex items-center">
          <input
            type="radio"
            id="notes"
            value="notes"
            checked={filterType === "notes"}
            onChange={handleFilterTypeChange}
            className="mr-2  cursor-pointer"
          />
          <label htmlFor="notes" className="mr-4">
            Notes
          </label>
          <input
            type="radio"
            id="questionpapers"
            value="question_paper"
            checked={filterType === "question_paper"}
            onChange={handleFilterTypeChange}
            className="mr-2  cursor-pointer"
          />
          <label htmlFor="questionpapers" className="mr-4">
            Question Papers
          </label>
          <input
            type="radio"
            id="all"
            value="all"
            checked={filterType === "all"}
            onChange={handleFilterTypeChange}
            className="mr-2  cursor-pointer"
          />
          <label htmlFor="all">All</label>
        </div>
      </div>

      {verifiedNotes ? (
        <>
          <h2 className="text-2xl font-bold text-black">Verified Documents</h2>
          <DocumentContainer
            data={filteredVerifiedNotes}
            setUpdated={setUpdated}
          />
        </>
      ) : (
        <h1>Nothing to display for verified notes</h1>
      )}
      {user.publicMetadata.isAdmin && allNotes ? (
        <>
          <h2 className="text-2xl font-bold text-black">Admin Dashboard</h2>
          <DocumentContainer data={filteredAllNotes} setUpdated={setUpdated} />
        </>
      ) : (
        user.publicMetadata.isAdmin && <h1>Nothing to display for all notes</h1>
      )}
    </div>
  );
};

export default Page;
