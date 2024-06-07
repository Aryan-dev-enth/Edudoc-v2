"use client";
import {
  deleteNote,
  verifyNote,
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
import { sendEmail } from "@/services/emailService"; // Make sure this path is correct

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

  const deleteEmailMessage = (title) => `
    Hello,

    We regret to inform you that your document titled "${title}" has been removed from our platform. This action was necessary due to our review policies and guidelines, which are in place to ensure the highest quality and relevance of content for our community.

    If you have any questions or need further information, please do not hesitate to contact us at edudoc.community@gmail.com

    Thank you for your understanding and cooperation.

    Best regards,
    Edudoc Team
  `;

  const verifyEmailMessage = (title) => `
    Hello,

    Congratulations! Your document titled "${title}" has been successfully verified and is now available on our platform. We appreciate your valuable contribution and are confident that it will be a great resource for our community.

    Thank you for your dedication and effort in sharing your knowledge.

    Best wishes,
    Edudoc Team
  `;

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteNote(data._id);
      await sendEmail(
        { name: "Edudoc", email: "no-reply@edudoc.com" },
        author,
        deleteEmailMessage(title)
      );
      setUpdated(true);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      await verifyNote(data._id);
      await sendEmail(
        { name: "Edudoc", email: "no-reply@edudoc.com" },
        author,
        verifyEmailMessage(title)
      );
      setUpdated(true);
    } catch (error) {
      console.error("Error verifying note:", error);
    }
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
        <p className="font-medium text-gray-800 text-sm text-center md:text-left md:text-lg capitalize">
          {title}
        </p>
        <p className="text-gray-500 text-sm md:text-base hidden md:block">
          {author.split("@")[0] || "Anonymous"}
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
