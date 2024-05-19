'use client'
import { deleteNote, verifyNote } from '@/apiCalls';
import { useUser } from '@clerk/clerk-react';

const DocumentItem = ({ data, setUpdated }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { author, title, published, file_url } = data;
  const { webContentLink, webViewLink } = file_url;

  const isAdmin = user?.publicMetadata?.isAdmin;

  const handleDelete = () => {
    setUpdated(true)
    deleteNote(data._id);
  };

  const handleVerify = () => {
    setUpdated(true)
    verifyNote(data._id)
  };

  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-300 py-3 px-4">
      <div className="flex-grow">
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-gray-500">Author: {author}</p>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-gray-500">
          Published Date: {new Date(published).toLocaleDateString()}
        </p>
        <a href={webViewLink} className="text-blue-500 hover:underline">
          View
        </a>
        <a href={webContentLink} className="text-blue-500 hover:underline">
          Download
        </a>
        {isAdmin && (
          <>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
            <button
              onClick={handleVerify}
              className="text-green-500 hover:underline"
            >
              Verify
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentItem;
