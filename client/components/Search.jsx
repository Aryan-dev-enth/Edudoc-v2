import React from "react";

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search for documents, articles, and more..."
      className="w-full max-w-3xl px-6 py-3 md:px-8 md:py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base md:text-lg"
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
    />
  );
};

export default Search;
