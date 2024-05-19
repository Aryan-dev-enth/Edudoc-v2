import { dataSection } from "@/constant";
import React from "react";

const DataSection = () => {
  return (
    <div id="data" className="w-full mt-20 lg:mt-32 h-auto flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center px-2">
        100+ Notes published, let's grow stronger.
      </h1>
      <div className="w-full flex flex-wrap justify-center">
        {dataSection.map((data, index) => (
          <div key={index} className="m-4 p-4 max-w-xs md:max-w-sm flex flex-col items-center bg-white ">
            <div className="flex flex-col items-center">
              <div className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-2">{data.number}</div>
              <p className="text-gray-800 text-md sm:text-lg text-center">{data.name}</p>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <span className="inline-block bg-green-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {data.tagLine}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataSection;
