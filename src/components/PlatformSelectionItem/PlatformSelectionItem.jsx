import React from "react";
import { backendUrl } from "../../constants";

const PlatformSelectionItem = ({
  id,
  item,
  selectedPlatforms,
  setSelectedPlatforms,
}) => {
  const handlePlatformSelection = (plat) => {
    // if (plat.cat_name === "JioTunes") {
    //   console.log("jio saavn");
    // }
    if (selectedPlatforms?.includes(plat.cat_name)) {
      if (plat.cat_name === "JioTunes" || plat.cat_name === "JioSaavn") {
        const deleted = selectedPlatforms.filter((it) => {
          return it !== "JioTunes" && it !== "JioSaavn";
        });
        setSelectedPlatforms(deleted);
        // setSelectedPlatforms([
        //   ...selectedPlatforms?.filter(
        //     (it) => it !== plat.cat_name || it !== "JioSaavn"
        //   ),
        // ]);
      } else if (
        plat.cat_name === "Airtel" ||
        plat.cat_name === "Vi" ||
        plat.cat_name === "BSNL" ||
        plat.cat_name === "Wynk Music"
      ) {
        const deleted = selectedPlatforms.filter((it) => {
          return (
            it !== "Airtel" &&
            it !== "Vi" &&
            it !== "BSNL" &&
            it !== "Wynk Music"
          );
        });
        setSelectedPlatforms(deleted);
      } else if (
        plat.cat_name === "YouTube Music" &&
        selectedPlatforms.includes("YouTube Content ID")
      ) {
        setSelectedPlatforms([...selectedPlatforms]);
      } else if (
        plat.cat_name === "Musixmatch" ||
        plat.cat_name === "LyricFind"
      ) {
        setSelectedPlatforms(
          selectedPlatforms.filter(
            (it) => it !== "Musixmatch" && it !== "LyricFind"
          )
        );
      } else {
        setSelectedPlatforms([
          ...selectedPlatforms?.filter((it) => it !== plat.cat_name),
        ]);
      }

      // console.log(plat);
    } else {
      if (plat.cat_name === "JioTunes") {
        setSelectedPlatforms([...selectedPlatforms, plat.cat_name, "JioSaavn"]);
      } else if (plat.cat_name === "JioSaavn") {
        setSelectedPlatforms([...selectedPlatforms, plat.cat_name, "JioTunes"]);
      } else if (
        plat.cat_name === "Airtel" ||
        plat.cat_name === "Vi" ||
        plat.cat_name === "BSNL" ||
        plat.cat_name === "Wynk Music"
      ) {
        setSelectedPlatforms([
          ...selectedPlatforms,
          "Airtel",
          "Vi",
          "BSNL",
          "Wynk Music",
        ]);
      } else if (
        plat.cat_name === "Musixmatch" ||
        plat.cat_name === "LyricFind"
      ) {
        setSelectedPlatforms([...selectedPlatforms, "Musixmatch", "LyricFind"]);
      } else if (plat.cat_name === "YouTube Content ID") {
        setSelectedPlatforms([
          ...selectedPlatforms,
          plat.cat_name,
          "YouTube Music",
        ]);
      } else {
        setSelectedPlatforms([...selectedPlatforms, plat.cat_name]);
      }
    }
  };

  // console.log(item);

  return (
    <div className={id > 0 && "mt-3 lg:mt-6"}>
      <h5 className="text-heading-6-bold lg:text-heading-5-bold text-center mb-3 text-black">
        {item?.platformType}{" "}
        {item?.platformType === "Caller Tune" ? "Partners" : "Platforms"}
      </h5>

      <h6 className="mb-2 lg:mb-4 text-black text-center lg:w-5/6 text-paragraph-2 lg:text-heading-6 mx-auto">
        {item?.platformType === "YouTube"
          ? "Content you cannot upload to YouTube Content ID includes public domain works, content you don’t own or have exclusive rights to, licensed content, fair use material, shared ownership content, unauthorized derivative works, royalty-free content, fan art, and disputed content."
          : item?.platformType === "Lyrics"
          ? "LyricFind and Musixmatch earn royalties by licensing lyrics from rights holders and distributing revenue generated through subscription fees, ad placements, and data licensing agreements, ensuring songwriters and publishers receive compensation for their lyrics' use."
          : ""}
      </h6>

      <ul className={`grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4`}>
        {item?.platforms?.map((plat) => (
          <li
            className={`flex gap-2 justify-center lg:justify-normal transition items-center rounded-xl cursor-pointer shadow-[#111] p-2 ${
              selectedPlatforms?.includes(plat.cat_name)
                ? "shadow-md"
                : "shadow-none"
            }`}
            title={
              plat.cat_name === "Meta" &&
              "Including FB & Instagram audio library, shorts, story and reels."
            }
            onClick={() => handlePlatformSelection(plat)}
          >
            <img
              src={`${backendUrl}uploads/platforms/${
                plat.cat_name === "Hungama"
                  ? "hungama-music"
                  : plat.cat_name.includes(" ")
                  ? plat.cat_name.split(" ").join("-").toLowerCase()
                  : plat.cat_name.toLowerCase()
              }.png`}
              className={`w-3 h-3 lg:w-5 lg:h-5 transition object-contain ${
                selectedPlatforms?.includes(plat.cat_name)
                  ? "grayscale-0"
                  : "grayscale"
              }`}
              alt=""
            />
            <h6 className="text-paragraph-2 font-bold lg:text-heading-6-bold text-black capitalize whitespace-nowrap">
              {plat.cat_name}
            </h6>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlatformSelectionItem;
