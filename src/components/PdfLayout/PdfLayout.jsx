import React, { useContext, useRef, useState, useEffect } from "react";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import generatePDF from "react-to-pdf";
import { ProfileContext } from "../../contexts/ProfileContext";
import { jsonToExcel } from "../../utils/jsonToExcel";
import PdfLayout from "../PdfLayout/PdfLayout";

const RevenueDetails = ({ setDetails, songs, details }) => {
  const detailsRef = useRef(null);
  const [preview, showPreview] = useState(false);
  const { userData } = useContext(ProfileContext);

  const items = songs
    .filter((song) => song.isrc === details)
    .sort((a, b) => a.platformName.localeCompare(b.platformName));

  const groupedData = items.reduce((acc, cur) => {
    if (!acc[cur.platformName]) {
      acc[cur.platformName] = {
        ...cur,
        "final revenue": 0,
        total: 0,
        months: [],
      };
    }
    acc[cur.platformName]["final revenue"] += cur["final revenue"];
    acc[cur.platformName].total += cur.total;

    acc[cur.platformName].months.push({
      month: cur.month,
      total: cur.total,
      revenue: cur["final revenue"],
    });

    return acc;
  }, {});

  const result = Object.values(groupedData);

  const createPdf = async () => {
    // Ensure content is ready before generating the PDF
    setTimeout(() => {
      generatePDF(detailsRef, {
        filename: `Revenue_Details_of_${result[0]?.song_name}.pdf`,
        page: {
          format: "A4",
          orientation: "portrait",
        },
      });
      showPreview(false);
      setDetails("");
    }, 500); // Adjust timing if needed
  };

  const convertToExcel = () => {
    const newItems = items.map((item) => {
      return {
        "Song Name": item.song_name,
        ISRC: item.isrc,
        Album: item.album,
        Artist: item.track_artist,
        Label: item.label,
        "Platform Name": item.platformName,
        Month: item.month,
        Views: item.total,
        Revenue: item["after tds revenue"],
        "Revenue After BackVision Deduction": item["final revenue"],
      };
    });

    jsonToExcel(newItems, `Revenue_Details_of_${result[0]?.song_name}.xlsx`);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-[9999999] flex items-center justify-center backdrop-blur-sm transition-opacity duration-300 ${
        preview ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div>{/* <PdfLayout ref={detailsRef} result={result} /> */}</div>

      <div className="bg-gray-900 text-white w-11/12 xl:w-3/5 h-[80vh] rounded-2xl p-5 overflow-y-auto relative shadow-xl">
        <button
          onClick={() => setDetails("")}
          className="absolute top-4 right-4 text-white text-xl opacity-60 hover:opacity-100 transition"
        >
          ✖
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold">{result[0]?.song_name}</h2>
          <p className="text-sm text-gray-300">{result[0]?.isrc}</p>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={createPdf}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white text-sm transition"
          >
            <FaFilePdf /> Download PDF
          </button>
          <button
            onClick={convertToExcel}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-white text-sm transition"
          >
            <FaFileExcel /> Download Excel
          </button>
        </div>

        {/* PDF content is now inside PdfLayout */}
        <div className="overflow-x-auto">
          {/* Table and other UI components */}
        </div>
      </div>
    </div>
  );
};

export default RevenueDetails;
