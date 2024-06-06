import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="animate-pulse space-y-4 w-full max-w-sm">
        {/* Image Placeholder */}
        <div className="rounded-lg bg-gray-300 h-48 w-full"></div>
        
        {/* Title Placeholder */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
        
        {/* Paragraph Placeholder */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
        
        {/* Button Placeholder */}
        <div className="flex space-x-4 mt-4">
          <div className="h-10 bg-gray-300 rounded w-1/3"></div>
          <div className="h-10 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
