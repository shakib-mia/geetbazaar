import React, { useContext, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";

const MonthStreamCount = ({ songs, details, i, open }) => {
  const [platform, setPlatform] = useState(open ? i.platformName : "");
  const { userData, dollarRate } = useContext(ProfileContext);

  let songsByPlatform = [];
  songs.forEach((s) => {
    if (s.isrc === details && s.platformName === platform) {
      songsByPlatform.push(s);
    }
  });

  const songsByUniqueDate = [
    ...new Map(songsByPlatform.map((item) => [item["date"], item])).values(),
  ];

  // console.log(songsByUniqueDate);

  let countByMonth = [];
  const check = songsByUniqueDate.forEach((s) => {
    let count = 0;
    let revenue = 0;
    songsByPlatform.forEach((songs) => {
      if (s.date === songs.date) {
        count = count + songs.total;
        revenue = revenue + songs["final revenue"];
      }
    });
    countByMonth.push({ count, date: s.date, revenue });
  });

  // console.log(i);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <details
      onClick={() => setPlatform(i.platformName)}
      className="group overflow-hidden"
      open={open}
    >
      <summary className="cursor-pointer list-none">
        <tr className="text-center flex justify-between items-center p-1 hover:bg-gray-800 rounded-2xl px-0 xl:px-1 transition">
          <td className="w-1/3 flex items-center justify-center">
            <span className="xl:mr-2 transition group-open:rotate-180 group-open:text-interactive-light-destructive-disabled">
              {open || (
                <svg
                  fill="none"
                  height="24"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                  className="hidden xl:block"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              )}
            </span>
            {i.platformName}
          </td>
          <td className="w-1/3">{i.total}</td>
          <td className="w-1/3">
            {(userData.billing_country === "India"
              ? i["final revenue"]
              : i["final revenue"] * dollarRate
            ).toFixed(5)}
          </td>
        </tr>
      </summary>
      <div className="w-full flex justify-center">
        <table className="w-11/12 text-center my-1">
          {countByMonth.map((d) => (
            <tr className="text-interactive-light-disabled" key={d.date}>
              <td className="w-1/3">
                {months[new Date(d.date).getMonth()]}{" "}
                {new Date(d.date).getFullYear()}
              </td>
              <td className="w-1/3">{d.count}</td>
              <td className="w-1/3">
                {userData.billing_country === "India"
                  ? d.revenue.toFixed(4)
                  : (d.revenue * dollarRate).toFixed(4)}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </details>
  );
};

export default MonthStreamCount;
