import React, { useContext, useEffect, useRef, useState } from "react";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import generatePDF from "react-to-pdf";
import { jsonToExcel } from "../../utils/jsonToExcel";
import RevenueChart from "../RevenueChart/RevenueChart";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import { VscLoading } from "react-icons/vsc";

const RevenueDetails = ({ setDetails, isrc }) => {
  const detailsRef = useRef(null);
  const pdfContentRef = useRef(null);
  const [isPdfVisible, setIsPdfVisible] = useState(false);
  const { userData, dollarRate, token } = useContext(ProfileContext);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPlatform, setExpandedPlatform] = useState(null);
  const [disablePdf, setDisablePdf] = useState(false);

  // Fetch songs data based on ISRC
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const config = {
          headers: { token },
        };

        const { data } = await axios.get(
          `${backendUrl}user-revenue/${isrc}`,
          config
        );
        if (data && data.revenues) {
          setSongs(data.revenues);
        } else {
          setSongs([]);
        }
      } catch (error) {
        console.error("Error fetching song data:", error);
        setError("Revenue Data Yet to Be Generated");
        if (error.response?.status === 401) {
          sessionStorage.removeItem("token");
          // Redirect logic if needed
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (isrc) {
      fetchData();
    }
  }, [isrc, token]);

  // If there's no data yet, show loading
  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full z-[9999999] flex items-center justify-center backdrop-blur-sm">
        <div className="bg-white text-black w-11/12 xl:w-3/5 h-[80vh] rounded-2xl p-5 flex items-center justify-center">
          <VscLoading className="animate-spin text-black text-heading-1" />
        </div>
      </div>
    );
  }

  // If there's an error, show error message
  if (error) {
    return (
      <div className="fixed top-0 left-0 w-full h-full z-[9999999] flex items-center justify-center backdrop-blur-sm">
        <div className="bg-white text-black w-11/12 xl:w-3/5 rounded-2xl p-5">
          <h4 className="text-heading-4-bold mb-4">Oops!</h4>
          <p className="text-heading-6">{error}</p>
          <button
            onClick={() => setDetails("")}
            className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Process the songs data once it's loaded
  const items = songs.sort((a, b) =>
    a.platformName.localeCompare(b.platformName)
  );

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
      month: cur.date,
      total: cur.total,
      revenue: cur["final revenue"],
    });

    return acc;
  }, {});

  const result = Object.values(groupedData);
  result.forEach((i) => (i.totalRevenue = i["final revenue"]));

  // Step 1: Group by month
  const monthlyRevenue = {};

  items.forEach((item) => {
    const month = item.date.slice(0, 7); // "YYYY-MM"

    if (!monthlyRevenue[month]) {
      monthlyRevenue[month] = 0;
    }

    monthlyRevenue[month] += item["final revenue"];
  });

  // Step 2: Sort months in chronological order
  const sortedMonths = Object.keys(monthlyRevenue).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  // Step 3: Calculate cumulative revenue for each month
  let cumulativeRevenue = 0;
  const result2 = sortedMonths.map((month) => {
    cumulativeRevenue +=
      monthlyRevenue[month] * (userData.country === "India" ? 1 : dollarRate);
    return {
      month,
      totalRevenue: cumulativeRevenue.toFixed(2),
    };
  });

  const toggleExpand = (platformName) => {
    setExpandedPlatform((prev) =>
      prev === platformName ? null : platformName
    );
  };

  const createPdf = async () => {
    // First make the PDF content visible (but not displayed to user)
    setIsPdfVisible(true);
    setDisablePdf(true);

    // Use setTimeout to ensure the PDF content is rendered before generating
    setTimeout(async () => {
      try {
        await generatePDF(pdfContentRef, {
          filename: `Revenue_Details_of_${result[0]?.song_name}.pdf`,
          page: {
            format: "A4",
            orientation: "portrait",
            margin: { top: 20, left: 20, bottom: 20, right: 20 },
            unit: "mm",
          },
          options: {
            pagebreak: { mode: "avoid-all", before: ".page-break" },
          },
        });
      } catch (err) {
        console.error("PDF generation error:", err);
      } finally {
        setDisablePdf(false);
        // Hide the PDF content again after generation
        setIsPdfVisible(false);
        setDetails(""); // Close the modal after PDF is generated
      }
    }, 500); // Increased timeout to ensure charts render properly
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
        "Revenue After GeetBazaar Deduction": item["final revenue"],
      };
    });

    jsonToExcel(newItems, `Revenue_Details_of_${result[0]?.song_name}.xlsx`);
  };

  // Monthly Views (Cumulative)
  const monthlyViews = {};

  items.forEach((item) => {
    const month = item.date.slice(0, 7); // "YYYY-MM"
    if (!monthlyViews[month]) {
      monthlyViews[month] = 0;
    }
    monthlyViews[month] += item.total;
  });

  const sortedMonths2 = Object.keys(monthlyViews).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  let runningTotal = 0;
  const monthlyViewsArray = sortedMonths2.map((month) => {
    runningTotal += monthlyViews[month];
    return {
      month,
      totalViews: runningTotal,
    };
  });

  // If no results are found after loading
  if (!isLoading && result.length === 0) {
    return (
      <div className="fixed top-0 left-0 w-full h-full z-[9999999] flex items-center justify-center backdrop-blur-sm cursor-default">
        <div className="bg-gray-900 text-black w-11/12 xl:w-3/5 rounded-2xl p-5">
          <h3 className="text-heading-3-bold mb-4">No Data Found</h3>
          <p>No revenue details found for this ISRC.</p>
          <button
            onClick={() => setDetails("")}
            className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-black transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Modal */}
      <div
        className="fixed top-0 left-0 w-full h-full z-[9999999] flex items-center justify-center backdrop-blur-sm cursor-default"
        onClick={() => setDetails("")}
      >
        <div
          className="bg-white text-black w-11/12 xl:w-3/5 h-[80vh] rounded-2xl p-2 lg:p-5 overflow-y-auto relative shadow-xl"
          onClick={(e) => e.stopPropagation()}
          ref={detailsRef}
        >
          {/* Close Button */}
          <button
            onClick={() => setDetails("")}
            className="absolute top-1 right-1 lg:top-4 lg:right-4 text-white text-xl rounded-full hover:opacity-100 transition w-4 aspect-square bg-interactive-light-destructive"
          >
            ✖
          </button>

          {/* Song Info */}
          <div className="mb-3 lg:mb-6">
            <h3 className="text-heading-3-bold font-semibold">
              {result[0]?.song_name}
            </h3>
            <h6 className="text-heading-6-bold text-black">
              {result[0]?.isrc}
            </h6>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={createPdf}
              disabled={disablePdf}
              className="flex items-center gap-1 whitespace-nowrap lg:gap-2 bg-red-600 hover:bg-red-700 p-2 lg:px-4 lg:py-2 rounded-md text-white text-sm transition disabled:bg-red-300"
            >
              <FaFilePdf /> {disablePdf ? "Generating PDF..." : "Download PDF"}
            </button>
            <button
              onClick={convertToExcel}
              className="flex items-center gap-1 whitespace-nowrap lg:gap-2 bg-green-600 hover:bg-green-700 p-2 lg:px-4 lg:py-2 rounded-md text-white text-sm transition"
            >
              <FaFileExcel /> Download Excel
            </button>
          </div>

          {/* Visible Table with Toggle */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-300 text-sm uppercase text-black">
                <tr>
                  <th className="px-2 lg:px-4 py-2">Platform</th>
                  <th className="px-2 lg:px-4 py-2">Views</th>
                  <th className="px-2 lg:px-4 py-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr
                      className="hover:bg-gray-200 transition border-t border-gray-700 cursor-pointer"
                      onClick={() => toggleExpand(item.platformName)}
                    >
                      <td className="px-2 lg:px-4 py-2 flex items-center justify-between">
                        <span>{item.platformName}</span>
                      </td>
                      <td className="px-2 lg:px-4 py-2">{item.total}</td>
                      <td className="px-2 lg:px-4 py-2">
                        {(
                          item["final revenue"] *
                          (userData.billing_country === "India"
                            ? 1
                            : dollarRate)
                        ).toFixed(2)}
                      </td>
                    </tr>

                    {/* Only expanded shows months */}
                    {expandedPlatform === item.platformName && (
                      <tr className="text-sm text-black">
                        <td colSpan="4" className="px-4 py-3">
                          <div className="overflow-x-auto">
                            <table className="w-full border border-gray-700 rounded divide-y divide-gray-700">
                              <thead className="bg-gray-300">
                                <tr>
                                  <th className="px-3 py-2">Month</th>
                                  <th className="px-3 py-2">Views</th>
                                  <th className="px-3 py-2">Revenue</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-grey-dark">
                                {item.months.map((monthData, i) => (
                                  <tr key={i} className="">
                                    <td className="px-3 py-2">
                                      {monthData.month}
                                    </td>
                                    <td className="px-3 py-2">
                                      {monthData.total}
                                    </td>
                                    <td className="px-3 py-2">
                                      {(
                                        monthData.revenue *
                                        (userData.country === "India"
                                          ? 1
                                          : dollarRate)
                                      ).toFixed(7)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <RevenueChart
            result={result}
            result2={result2}
            monthlyViews={monthlyViewsArray}
            pdfMode={false}
          />
        </div>
      </div>

      {/* Hidden PDF Content - Only rendered when needed */}
      {isPdfVisible && (
        <div
          style={{
            position: "absolute",
            left: "-9999px",
            top: 0,
            width: "800px",
            height: "auto",
            backgroundColor: "white",
            padding: "20px",
          }}
          ref={pdfContentRef}
        >
          <div className="p-3 text-black">
            <h5 className="text-heading-5-bold font-bold mb-2 mt-4">
              {result[0]?.song_name}
            </h5>
            <p className="text-sm mb-4">ISRC: {result[0]?.isrc}</p>

            {/* Revenue and platform details table */}
            <table className="w-full border border-gray-400 text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-3 py-2 border">Platform</th>
                  <th className="px-3 py-2 border">Views</th>
                  <th className="px-3 py-2 border">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="px-3 py-2 border font-bold">
                        {item.platformName}
                      </td>
                      <td className="px-3 py-2 border">{item.total}</td>
                      <td className="px-3 py-2 border">
                        {(
                          item["final revenue"] *
                          (userData.country === "India" ? 1 : dollarRate)
                        ).toFixed(7)}
                      </td>
                    </tr>
                    {item.months.map((month, i) => (
                      <tr key={i}>
                        <td className="px-4 py-1 border pl-6">
                          ↳ {month.month}
                        </td>
                        <td className="px-4 py-1 border">{month.total}</td>
                        <td className="px-4 py-1 border">
                          {(
                            month.revenue *
                            (userData.country === "India" ? 1 : dollarRate)
                          ).toFixed(7)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            {/* Include charts for the PDF */}
            {/* <div className="mt-8">
              <h5 className="text-heading-5-bold font-bold mb-4">
                Revenue Analytics
              </h5>
              <RevenueChart
                result={result}
                result2={result2}
                monthlyViews={monthlyViewsArray}
                pdfMode={false}
              />
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default RevenueDetails;
