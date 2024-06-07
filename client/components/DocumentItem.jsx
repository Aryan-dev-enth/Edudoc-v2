"use client";
import {
  deleteNote,
  verifyNote,
  increaseLikeCount,
  increaseViewCount,
  increaseDownloadCount,
} from "@/apiCalls";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineDownload,
  AiOutlineDelete,
  AiOutlineCheckCircle,
} from "react-icons/ai";

const DocumentItem = ({ data, setUpdated }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const {
    author,
    title,
    published,
    file_url,
    verified,
    subject,
    college,
    document_type,
    viewCount,
    downloadsCount
  } = data;
  const { webContentLink, webViewLink } = file_url;

  const [isLoading, setLoading] = useState(false);

  const isAdmin = user?.publicMetadata?.isAdmin;
  const [updatedViewCount, setViewCount] = useState(data.viewCount);
  const [updatedDownloadsCount, setDownloadsCount] = useState(data.downloadsCount);

  const handleDelete = () => {
    setLoading(true);
    deleteNote(data._id);
    setUpdated(true);
    setLoading(false);
  };

  const handleVerify = () => {
    setLoading(true);
    verifyNote(data._id);
    setUpdated(true);
    setLoading(false);
  };

  const handleView = () => {
    increaseViewCount(data._id).then(() => {
      setViewCount(viewCount + 1);
    });
  };

  const handleDownload = () => {
    increaseDownloadCount(data._id).then(() => {
      setDownloadsCount(downloadsCount + 1);
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between border-b my-2 border-gray-300 py-3 px-4 rounded-lg shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.005]">
      <div className="flex-grow">
        <p className="font-medium text-gray-800 text-sm text-center md:text-left md:text-lg">
          {title}
        </p>
        <p className="text-gray-500 text-sm md:text-base hidden md:block">
          Author: {author}
        </p>
      </div>

      {!isLoading ? (
        <div className="flex items-center space-x-2 md:space-x-4 mt-2 md:mt-0">
          <p className="text-gray-500 text-xs md:text-sm hidden md:block">
            Published Date: {new Date(published).toLocaleDateString()}
          </p>
          <a
            href={webViewLink}
            target="_blank"
            className="text-blue-500 hover:text-blue-700 flex items-center space-x-1 text-xs md:text-sm transition-colors duration-200"
            onClick={handleView}
          >
            <AiOutlineEye size={20} /> <span>{viewCount}</span>
          </a>
          <a
            href={webContentLink}
            className="text-blue-500 hover:text-blue-700 flex items-center space-x-1 text-xs md:text-sm transition-colors duration-200"
            onClick={handleDownload}
          >
            <AiOutlineDownload size={20} /> <span>{downloadsCount}</span>
          </a>

          {isAdmin && (
            <>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 text-xs md:text-sm transition-colors duration-200 flex items-center space-x-1"
              >
                <AiOutlineDelete size={20} /> <span>Delete</span>
              </button>
              {!verified && (
                <button
                  onClick={handleVerify}
                  className="text-green-500 hover:text-green-700 text-xs md:text-sm transition-colors duration-200 flex items-center space-x-1"
                >
                  <AiOutlineCheckCircle size={20} /> <span>Verify</span>
                </button>
              )}
            </>
          )}
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default DocumentItem;
