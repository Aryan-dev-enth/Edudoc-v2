"use client";
import React, { useState, useEffect } from "react";
import Search from "../Search";
import { getNotes } from "@/apiCalls";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";
const Landing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notesData, setNotesData] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getNotes(false);
      setNotesData(notes.data.data.slice(0, 4));
      setFilteredNotes(notes.data.data.slice(0, 4));
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredNotes([]);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = notesData.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.subject.toLowerCase().includes(query) ||
          note.author.toLowerCase().includes(query) ||
          note.college.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      );
      setFilteredNotes(filtered);
      setSearchPerformed(true);
    }
  }, [searchQuery, notesData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#2a0316] overflow-x-hidden" >
      <div className="w-full h-auto md:h-[60vh] flex flex-col items-center justify-center gap-6 px-4 bg-[#2a0316] ">
        <img
          src="landing.png"
          alt=""
          className="h-32 md:h-1/2 object-contain"
        />
        <h1 className="text-3xl md:text-6xl font-bold text-white text-center">
          Welcome to Edudoc
        </h1>
        <h4 className="text-base md:text-2xl text-white text-center">
          Your Gateway to Knowledge
        </h4>
        
        <h4 className="text-md lg:text-2xl text-yellow-300 text-center font-light animate-bounce">.. Still under development ..</h4>
      
        <div className="w-full flex items-center justify-center px-4">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>
      {searchPerformed && filteredNotes.length > 0 && (
        <div
          id="data"
          className="sm:w-full w-3/4 max-w-3xl pb-1 px-2 bg-white shadow-md mt-2 rounded-lg"
        >
          {filteredNotes.map((note) => (
            <a href={note.file_url.webViewLink} target="_blank" >
              <div
                key={note._id}
                className="w-full sm:my-2 sm:p-4 p-2 border-b cursor-pointer hover:bg-gray-100"
                onClick={router.push('/all-notes')}
              >
                <h2 className="sm:text-xl text-sm font-bold">{note.title}</h2>
                <p className="text-xs text-gray-600">{note.subject}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Landing;
