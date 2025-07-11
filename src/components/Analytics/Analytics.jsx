import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PlatformsChart from "../PlatformsChart/PlatformsChart";

const Analytics = ({ songData, platformData }) => {
  const { revenueByPlatform, viewsByPlatform } = platformData;

  const revenueArray = Object.entries(revenueByPlatform).map(
    ([platform, revenue]) => {
      return { platform, revenue };
    }
  );

  const viewsArray = Object.entries(viewsByPlatform).map(
    ([platform, views]) => {
      return { platform, views };
    }
  );

  return (
    <div className="mt-3 px-1 2xl:px-6 py-1 2xl:py-4 bg-grey-light rounded-[10px] overflow-auto hidden 2xl:block">
      <div className="flex justify-between mt-6 mb-7">
        <div className="w-5/12">
          <PlatformsChart revenueData={revenueArray} label={"Revenue"} />
          <p className="uppercase text-center mt-3">
            Total Revenue By Platforms
          </p>
        </div>
        <div className="w-5/12">
          <PlatformsChart revenueData={viewsArray} label={"Views"} />
          <p className="uppercase text-center mt-3">Total Views By Platforms</p>
        </div>
      </div>

      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={songData}>
          <XAxis dataKey="song_name" className="text-button" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Total Revenue Against ISRC" fill="#2B52DD" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={songData}>
          <XAxis dataKey="song_name" className="text-button" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Total Views Against ISRC" fill="#2E844A" />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex gap-3 justify-center mt-5">
        <div className="flex gap-1 items-center">
          <div className="bg-[#8884d8] w-1 h-1"></div>
          <h5>Total Revenues</h5>
        </div>

        <div className="flex gap-1 items-center">
          <div className="bg-[#82ca9d] w-1 h-1"></div>
          <h5>Total Views</h5>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
