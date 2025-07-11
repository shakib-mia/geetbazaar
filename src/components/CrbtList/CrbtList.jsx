import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";

const CrbtList = () => {
  const [crbts, setCrbts] = useState([]);
  const { token } = useContext(ProfileContext);
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (id) => {
    if (openAccordion === id) {
      // Prevent all items from closing, keep the first one open
      const firstId = crbts[0]?._id;
      setOpenAccordion(firstId);
    } else {
      setOpenAccordion(id);
    }
  };

  useEffect(() => {
    axios
      .get(backendUrl + "crbt-codes/user", {
        headers: {
          token,
        },
      })
      .then(({ data }) => {
        setCrbts(data);
        // Open the first item by default
        if (data.length > 0) {
          setOpenAccordion(data[0]._id);
        }
      });
  }, [token]);

  return (
    <div className="lg:container mx-auto p-4 px-0 lg:px-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Song</th>
            <th className="border border-gray-300 px-4 py-2 text-left">ISRC</th>
          </tr>
        </thead>
        {crbts.length > 0 ? (
          <tbody className="divide-y">
            {crbts.map((song) => (
              <React.Fragment key={song._id}>
                {/* Table Row */}
                <tr
                  className="hover:bg-gray-50 cursor-pointer divide-x-2"
                  onClick={() => toggleAccordion(song._id)}
                >
                  <td className="px-4 py-2">{song.Song}</td>
                  <td className="px-4 py-2">{song.ISRC}</td>
                </tr>

                {/* Accordion Row */}
                <tr>
                  <td colSpan="5" className="px-4 bg-gray-50">
                    <div
                      className={`transition-all ease-in-out duration-300 overflow-hidden ${
                        openAccordion === song._id ? "h-[250px] py-4" : "h-0"
                      }`}
                    >
                      <p>
                        <span className="font-semibold">ISRC:</span> {song.ISRC}
                      </p>
                      <p>
                        <span className="font-semibold">Label:</span>{" "}
                        {song["Label Name"]}
                      </p>
                      <div className="mt-2">
                        <h4 className="font-semibold">Codes:</h4>
                        <ul className="list-disc ml-5">
                          <li>BSNL (E): {song["Bsnl (E)"]}</li>
                          <li>BSNL (S): {song["Bsnl (S)"]}</li>
                          <li>Idea: {song.Idea}</li>
                          <li>Vodafone: {song.Vodafone}</li>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        ) : (
          <p className="py-2 text-center lg:w-[200%]">Loading...</p>
        )}
      </table>
    </div>
  );
};

export default CrbtList;
