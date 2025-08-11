import React, { useState } from "react";
import Uploads from "../../components/Uploads/Uploads";
import RecentUploads from "../../components/RecentUploads/RecentUploads";
import { CiStreamOn } from "react-icons/ci";
import { MdFileUpload } from "react-icons/md";

const AllSongs = () => {
  const [screen, setScreen] = useState("streaming");
  return (
    <>
      <h2 className="text-heading-2-bold text-black-secondary pt-6 lg:pt-7">
        All Songs
      </h2>

      <div className="grid grid-cols-2 mt-4 text-black relative">
        <div
          className="absolute w-1/2 h-[56px] top-0 bg-white z-0 transition-[left]"
          style={{ left: screen === "recent uploads" ? "50%" : "0%" }}
        ></div>
        <button
          className={`py-2 uppercase absolute w-1/2 left-0 z-10 text-button lg:text-paragraph-1 transition flex gap-1 justify-center items-center font-medium tracking-wider border-b border-interactive-light ${
            screen === "streaming" && "bg-interactive-light text-white"
          }`}
          onClick={() => setScreen("streaming")}
        >
          streaming <CiStreamOn />
        </button>
        <button
          className={`py-2 uppercase absolute w-1/2 left-1/2 z-10 text-button lg:text-paragraph-1 transition flex gap-1 justify-center items-center font-medium tracking-wider border-b border-interactive-light ${
            screen === "recent uploads" && "bg-interactive-light text-white"
          }`}
          onClick={() => setScreen("recent uploads")}
        >
          recent uploads <MdFileUpload />
        </button>
      </div>

      {/* <div className="p-2 lg:p-7 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pb-2 lg:pb-7"> */}
      {screen === "streaming" && <Uploads />}
      {screen === "recent uploads" && <RecentUploads />}
      {/* </div> */}
    </>
  );
};

export default AllSongs;
