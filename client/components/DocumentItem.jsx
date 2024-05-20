'use client'
import { deleteNote, verifyNote, increaseLikeCount, increaseViewCount, increaseDownloadCount } from '@/apiCalls';
import { useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import { FaThumbsUp, FaEye, FaDownload } from 'react-icons/fa'; // Importing icons
const DocumentItem = ({ data, setUpdated }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { author, title, published, file_url, verified, subject, college, document_type } = data;
  const { webContentLink, webViewLink } = file_url;

  const isAdmin = user?.publicMetadata?.isAdmin;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [viewCount, setViewCount] = useState(data.viewCount);
  const [downloadsCount, setDownloadsCount] = useState(data.downloadsCount);

  const handleDelete = () => {
    deleteNote(data._id);
    setUpdated(true);
  };

  const handleVerify = () => {
    verifyNote(data._id);
    setUpdated(true);
  };

  const handleLike = () => {
    increaseLikeCount(data._id).then(() => {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    });
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
    <div className="flex flex-row items-center justify-between border-b border-gray-300 py-3 px-4">
      <div className="flex-grow">
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-gray-500">Author: {author}</p>
      </div>
    
      <div className="flex items-center space-x-4">
        <p className="text-gray-500">
          Published Date: {new Date(published).toLocaleDateString()}
        </p>
        <a href={webViewLink} target='_blank' className="text-blue-500 hover:underline" onClick={handleView}>
          <FaEye /> {viewCount}
        </a>
        <a href={webContentLink} className="text-blue-500 hover:underline" onClick={handleDownload}>
          <FaDownload /> {downloadsCount}
        </a>
        <button onClick={handleLike} className="text-gray-500 hover:underline">
          {isLiked ? <FaThumbsUp color="blue" /> : <FaThumbsUp />} {likeCount}
        </button>
        {isAdmin && (
          <>
            <button onClick={handleDelete} className="text-red-500 hover:underline">
              Delete
            </button>
            {!verified && (
              <button onClick={handleVerify} className="text-green-500 hover:underline">
                Verify
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentItem;
