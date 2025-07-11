import React, { useState } from "react";
import MonthStreamCount from "../MonthStreamCount/MonthStreamCount";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const RevenueDetailsItem = ({ result, details, songs, open }) => {
  const [platform, setPlatform] = useState("");

  let songsByPlatform = [];
  songs.forEach((s) => {
    if (s.isrc === details && s.platformName === platform) {
      songsByPlatform.push(s);
    }
  });

  const songsByUniqueDate = [
    ...new Map(songsByPlatform.map((item) => [item["date"], item])).values(),
  ];

  let countByMonth = [];
  songsByUniqueDate.forEach((s) => {
    let count = 0;
    let revenue = 0;
    songsByPlatform.forEach((songs) => {
      if (s.date === songs.date) {
        count += songs.total;
        revenue += songs["final revenue"];
      }
    });
    countByMonth.push({ count, date: s.date, revenue });
  });

  return (
    <table className="w-full">
      {result.map((i) => (
        <MonthStreamCount
          key={i.platformName}
          songs={songs}
          details={details}
          i={i}
          open={open}
        />
      ))}

      {/* LineChart for Views */}
      <ResponsiveContainer
        height={250}
        width={"100%"}
        className={"hidden lg:block"}
      >
        <LineChart className="mb-5 mt-3" data={result}>
          <XAxis dataKey="platformName" tick={{ fill: "#fff" }} />
          <YAxis tick={{ fill: "#fff" }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip contentStyle={{ backgroundColor: "#4B5563" }} />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#9BAAF2"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
          <Legend
            content={
              <div className="text-center text-[#9BAAF2] flex items-center gap-1 justify-center">
                <div className="w-1 h-1 bg-[#9BAAF2]"></div> Views
              </div>
            }
          />
        </LineChart>
      </ResponsiveContainer>

      {/* LineChart for Revenue */}
      <ResponsiveContainer
        height={250}
        width={"100%"}
        className={"hidden lg:block"}
      >
        <LineChart
          data={result}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="platformName" tick={{ fill: "#fff" }} />
          <YAxis tick={{ fill: "#fff" }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip contentStyle={{ backgroundColor: "#4B5563" }} />
          <Line
            type="monotone"
            dataKey="final revenue"
            stroke="#9EE1AD"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
          <Legend
            content={
              <div className="text-center text-[#9EE1AD] flex items-center gap-1 justify-center">
                <div className="w-1 h-1 bg-[#9EE1AD]"></div> Revenue
              </div>
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </table>
  );
};

export default RevenueDetailsItem;
