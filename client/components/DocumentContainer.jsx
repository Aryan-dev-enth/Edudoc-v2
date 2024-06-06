"use client";
import React, { useState } from "react";
import DocumentItem from "./DocumentItem";

const DocumentContainer = ({ data, setUpdated }) => {
  // Sort the data based on viewCount and downloadsCount in descending order
  const sortedData = data.sort(
    (a, b) => b.viewCount - a.viewCount || b.downloadsCount - a.downloadsCount
  );

  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 8;

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = sortedData.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const totalPages = Math.ceil(sortedData.length / documentsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="w-full sm:w-[90%] h-full p-4 rounded-lg mt-4">
      {currentDocuments.map((document, index) => (
        <DocumentItem key={index} data={document} setUpdated={setUpdated} />
      ))}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentContainer;
