"use client";
import React, { useState, useEffect } from "react";
import DocumentItem from "./DocumentItem";

const DocumentContainer = ({ data, setUpdated, searchQuery }) => {
  const [sortCriteria, setSortCriteria] = useState("trending");
  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage, setDocumentsPerPage] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setDocumentsPerPage(5);
      } else {
        setDocumentsPerPage(10);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const sortDocuments = (documents) => {
    switch (sortCriteria) {
      case "alphabetical":
        return documents.sort((a, b) => a.title.localeCompare(b.title));
      case "latest":
        return documents.sort((a, b) => new Date(b.published) - new Date(a.published));
      case "trending":
      default:
        return documents.sort((a, b) => b.viewCount - a.viewCount || b.downloadsCount - a.downloadsCount);
    }
  };

  const filterDocuments = (documents) => {
    if (!searchQuery) return documents;
    return documents.filter(
      (document) =>
        document.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        document.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        document.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        document.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        document.college.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredData = filterDocuments([...data]);
  const sortedData = sortDocuments(filteredData);

  const totalPages = Math.ceil(sortedData.length / documentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  return (
    <div className="w-full sm:w-[90%] h-full p-4 rounded-lg mt-4">
      <div className="w-full flex justify-end mb-4">
        <select
          id="sortCriteria"
          value={sortCriteria}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="trending">Trending</option>
          <option value="latest">Latest</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-between mt-4 space-x-2">
          <button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            className={`px-2 py-1 sm:px-4 sm:py-2 sm:text-md text-xs rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            First
          </button>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-2 py-1 sm:px-4 sm:py-2 sm:text-md text-xs rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <span className="px-2 py-1 sm:px-4 sm:py-2 sm:text-md text-xs rounded-lg bg-gray-200 text-gray-700">
             {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 sm:px-4 sm:py-2 sm:text-md text-xs rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 sm:px-4 sm:py-2 sm:text-md text-xs rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Last
          </button>
        </div>
      )}
      {sortedData.map((document, index) => {
        if (index >= (currentPage - 1) * documentsPerPage && index < currentPage * documentsPerPage) {
          return <DocumentItem key={index} data={document} setUpdated={setUpdated} />;
        }
        return null;
      })}
      {totalPages > 1 && (
        <div className="justify-between mt-4 space-x-2 hidden md:flex">
          <button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            className={`px-2 py-1 sm:px-4 sm:py-2 sm:text-md text-xs rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            First
          </button>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-2 py-1 sm:px-4 sm:py-2 sm:text-md text-xs rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <span className="px-2 py-1 sm:px-4 sm:py-2 sm:text-md text-xs rounded-lg bg-gray-200 text-gray-700">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 sm:px-4 sm:py-2 sm:text-md text-xs rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 sm:px-4 sm:py-2 sm:text-md text-xs rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentContainer;
