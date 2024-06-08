import { getNotesCount, getTopAuthors } from "@/apiCalls"; // Assuming you have an API call function for fetching top authors
import { dataSection } from "@/constant";
import { useEffect, useState } from "react";
import Confetti from 'react-confetti'

const DataSection = () => {
  const [notesCount, setNotesCount] = useState("60+");
  const [topContributors, setTopContributors] = useState([]);

  useEffect(() => {
    const fetchNotesCount = async () => {
      try {
        const result = await getNotesCount();
        if (result && result.count) {
          setNotesCount(result.count);
        }
      } catch (error) {
        console.error('Error fetching notes count:', error);
      }
    };

    const fetchTopContributors = async () => {
      try {
        const result = await getTopAuthors();
        setTopContributors(result);
      } catch (error) {
        console.error('Error fetching top contributors:', error);
      }
    };

    fetchNotesCount();
    fetchTopContributors();
  }, []);

  return (
    <div id="data" className="w-full mt-20 lg:mt-32 h-auto flex flex-col justify-center items-center p-4">
      <Confetti width={window.innerWidth} height={window.innerHeight-100} className="mt-[100vh]" numberOfPieces={100} gravity={0.1}/>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center px-2">
        {notesCount} Notes published, let's grow stronger.
      </h1>
      <div className="w-full flex flex-wrap justify-center">
        {/* Section for displaying top contributors */}
        <div className="w-full text-lg font-semibold mb-6 text-center">
          Top Contributors:
        </div>
        <div className="w-full flex flex-wrap justify-center text-sm md:textlg">
          
          {topContributors.map((contributor, index) => (
            <div key={index} className="m-4 p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center bg-white rounded-lg border-[2px] text-sm md:textlg">
              {/* Badge indicating position */}
              {index === 0 && <div className="bg-yellow-500 text-white font-bold py-1 px-3 mb-2 rounded-full text-sm md:textlg ">1st</div>}
              {index === 1 && <div className="bg-gray-500 text-white font-bold py-1 px-3 mb-2 rounded-full text-sm md:textlg">2nd</div>}
              {index === 2 && <div className="bg-red-950 text-white font-bold py-1 px-3 mb-2 rounded-full text-sm md:textlg">3rd</div>}
              <div className="font-bold  mb-2 text-md md:textlg">{contributor._id}</div>
              <div className="bg-green-700 text-white font-bold py-1 px-3 mb-2 rounded-full">{contributor.count}</div>
            </div>
          ))}
        </div>
        {/* Section for displaying other data */}
        {dataSection.map((data, index) => (
          <div key={index} className="m-4 p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <div className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-2 animate-bounce">{data.number}</div>
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
