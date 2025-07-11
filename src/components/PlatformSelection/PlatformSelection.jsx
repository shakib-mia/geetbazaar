import axios from "axios";
// import { backendUrl } from "../../constants";
import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
// import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { ScreenContext } from "../../contexts/ScreenContext";
import { useLocation } from "react-router-dom";
import PlatformSelectionItem from "../PlatformSelectionItem/PlatformSelectionItem";
import { backendUrl } from "../../constants";

const PlatformSelection = ({ selectedPlatforms, setSelectedPlatforms }) => {
  const [platforms, setPlatforms] = useState([]);
  const { token } = useContext(ProfileContext);
  const { setFormData, formData } = useContext(ScreenContext);
  const [selectedAll, setSelectedAll] = useState(false);
  const [checked, setChecked] = useState(false);
  const location = useLocation();
  // console.log();
  const freeLogic =
    location.search.split("?")[1] !== "yearly-plan" &&
    (location.search.split("?")[2] === "0" || parseFloat(formData.price) === 0);

  console.log(formData.price);

  const freePlatformsArray = platforms
    .find(({ platformType }) => platformType === "International")
    ?.platforms.filter(
      (item) =>
        item.cat_name === "Meta" ||
        item.cat_name === "TikTok" ||
        item.cat_name === "SnapChat" ||
        item.cat_name === "Triller"
    );

  const proLogic =
    (location.search.split("?")[1]?.includes("-")
      ? location.search.split("?")[1]?.split("-")?.join(" ")
      : location.search.split("?")[1]) === "forevision pro";

  const crbtLogic =
    (location.search.split("?")[1]?.includes("-")
      ? location.search.split("?")[1]?.split("-")?.join(" ")
      : location.search.split("?")[1]) === "forevision crbt";

  // const yearlyLogic = location.search.split("?")[1] === "yearly-plan";

  // console.log(platforms);

  // const common
  const commonPlatforms = platforms.filter(
    ({ platformType }) =>
      platformType === "YouTube" || platformType === "Lyrics"
  );
  // console.log(commonPlatforms);

  const proPlatforms = platforms.filter(
    ({ platformType }) => platformType !== "Caller Tune"
  );

  // console.log(proPlatforms);

  // console.log(commonPlatforms);

  const crbtPlatforms = [
    ...platforms.filter(
      ({ platformType }) =>
        platformType !== "International" &&
        platformType !== "YouTube" &&
        platformType !== "Lyrics"
    ),
    ...commonPlatforms,
  ];

  const freePlatforms = [
    {
      platformType: "International",
      platforms: freePlatformsArray,
    },

    {
      platformType: [commonPlatforms[0]?.platformType],
      platforms: commonPlatforms[0]?.platforms.slice(0, 2),
    },
    // commonPlatforms[1],
  ];
  // console.log(commonPlatforms[0]);

  const logicalPlatforms = proLogic
    ? proPlatforms
    : crbtLogic
    ? crbtPlatforms
    : freeLogic
    ? freePlatforms
    : platforms;

  console.log(platforms);
  // console.log(logicalPlatforms);

  useEffect(() => {
    // console.log(selectedPlatforms);
    setFormData({ ...formData, selectedPlatforms });
    // console.log(formData);
  }, [selectedPlatforms?.length, selectedPlatforms]);

  useEffect(() => {
    // console.log(config);
    const config = {
      headers: { token: sessionStorage.getItem("token") || token },
    };
    axios
      .get(backendUrl + "platforms", config)
      .then(({ data }) => {
        setPlatforms(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // console.log(platforms);
  const [newPlatforms, setNewPlatforms] = useState([]);

  useEffect(() => {
    if (platforms.length > 0) {
      const tempNewPlatforms = [];
      for (const platform of platforms) {
        for (const { cat_name } of platform.platforms) {
          tempNewPlatforms.push(cat_name); // Add items to the temporary array
        }
      }
      setNewPlatforms(tempNewPlatforms); // Update state with the complete list
    }
  }, [platforms]);

  const handleSelectedPlatform = () => {
    const newChecked = !checked;
    setChecked(newChecked);

    if (newChecked) {
      let newSelectedPlatforms = [];
      for (const platform of logicalPlatforms) {
        for (const { cat_name } of platform.platforms) {
          newSelectedPlatforms.push(cat_name);
        }
      }
      setSelectedPlatforms(newSelectedPlatforms);
      // console.log(newSelectedPlatforms);
    } else {
      setSelectedPlatforms([]);
    }
  };

  useEffect(() => {
    if (checked) {
      setSelectedAll(
        selectedPlatforms?.length > 0 &&
          selectedPlatforms?.length === newPlatforms.length
      );
    }
  }, [selectedPlatforms, selectedPlatforms?.length, newPlatforms, checked]);

  return (
    <>
      <Button
        className={"!w-1/4 ml-auto mb-4"}
        onClick={handleSelectedPlatform}
      >
        {checked ? "Deselect All" : "Select All"}
      </Button>
      {/* </label> */}

      {logicalPlatforms.map((item, key) => (
        <PlatformSelectionItem
          id={key}
          item={item}
          selectedPlatforms={selectedPlatforms}
          setSelectedPlatforms={setSelectedPlatforms}
        />
      ))}
      {/* </ul> */}
    </>
  );
};

export default PlatformSelection;
