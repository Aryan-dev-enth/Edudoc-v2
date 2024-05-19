"use client";
import React, { useState } from "react";
import DocumentItem from "./DocumentItem";
const DocumentContainer = ({ data, setUpdated }) => {
  
  console.log(data)
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 8;

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = data.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const totalPages = Math.ceil(data.length / documentsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="w-full sm:w-[90%] h-full">
      {currentDocuments.map((document, index) => (
        <DocumentItem key={index} data={document} setUpdated={setUpdated} />
      ))}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="text-blue-500 hover:underline mr-4"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="text-blue-500 hover:underline"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentContainer;
