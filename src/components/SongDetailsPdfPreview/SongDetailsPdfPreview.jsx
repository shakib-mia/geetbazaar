import React, { useRef } from "react";
import RevenueDetailsItem from "../RevenueDetailsItem/RevenueDetailsItem";
import { IoMdDownload } from "react-icons/io";
import Button from "../Button/Button";
import generatePDF from "react-to-pdf";

const SongDetailsPdfPreview = ({ setDetails, songs, details }) => {
  const detailsRef = useRef(null);

  const items = songs
    .filter((song) => song.isrc === details)
    .sort((a, b) => a.platformName.localeCompare(b.platformName));

  const groupedData = items.reduce((acc, cur) => {
    if (!acc[cur.platformName]) {
      acc[cur.platformName] = { ...cur, "final revenue": 0, total: 0 };
    }
    acc[cur.platformName]["final revenue"] += cur["final revenue"];
    acc[cur.platformName].total += cur.total;
    return acc;
  }, {});

  const result = Object.values(groupedData);

  const options = ["platformName", "total", "final revenue"];

  const createPdf = async () => {
    await generatePDF(detailsRef, {
      filename: `GeetBazaar - Revenue Report of ${result[0].song_name}.pdf`,
      page: {
        format: "A4",
        orientation: "portrait",
      },
    });

    setDetails("");
  };

  return (
    <div className="bg-black fixed top-0 left-0 w-screen flex justify-center z-[99999999999999999] overflow-y-auto h-full bg-opacity-50">
      <div className="w-11/12 md:w-1/2 my-10">
        <div
          ref={detailsRef}
          className="w-full rounded-2xl p-6 bg-grey-dark bg-opacity-90 text-white"
        >
          {/* Header */}
          <div className="ml-4 mt-2">
            <h3
              className="ml-3 mb-3 font-bold text-heading-3-bold"
              style={{ lineHeight: "24px" }}
            >
              {result[0]?.song_name}
            </h3>
            <h4
              className="ml-3 text-heading-4-bold"
              style={{ lineHeight: "24px" }}
            >
              {result[0]?.isrc}
            </h4>
          </div>

          {/* Table headers */}
          <ul className="grid grid-cols-3 gap-3 mt-5 mb-2 font-semibold text-gray-800">
            {options.map((item, key) => (
              <li
                key={key}
                className={`text-center capitalize`}
                style={{ color: "#1B96FF" }}
              >
                {item === "final revenue"
                  ? "Revenue"
                  : item === "total"
                  ? "Total Stream"
                  : item === "platformName"
                  ? "Platform Name"
                  : item}
              </li>
            ))}
          </ul>

          {/* Data rows */}
          <RevenueDetailsItem
            result={result}
            details={details}
            songs={songs}
            open={true} // always open
          />
        </div>

        {/* Confirm/Download button */}
        <div className="flex py-5 justify-center">
          <Button onClick={createPdf} containerClassName="flex items-center">
            <IoMdDownload className="mr-2" />
            Confirm & Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SongDetailsPdfPreview;
