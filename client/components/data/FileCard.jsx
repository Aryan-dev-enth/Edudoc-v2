import React from "react";

const FileCard = (props) => {
  const { name, description, imageUrl, iconUrl } = props.data;

  
  const truncateText = (text, maxLength) => {
    if (text.split(" ").length > 1 && text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="w-full m-2 lg:w-[250px] h-[100px] rounded-lg px-4 py-2 shadow-lg hover:bg-blue-100 flex justify-between items-center cursor-pointer">
      <div className="left w-[60px] h-[60px] flex justify-center items-center">
        <img src={imageUrl} alt="" className="w-full h-full rounded-lg" />
      </div>
      <div className="right flex flex-col justify-center flex-grow ml-4">
        <h1 className="text-blue-400 font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">
          {truncateText(name, 10)}
        </h1>
        <div className="flex items-center gap-2">
          <img src={iconUrl} alt="" className="w-[20px] h-[20px]" />
          <h4 className="text-xs overflow-hidden overflow-ellipsis whitespace-nowrap">
            {truncateText(description, 15)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
