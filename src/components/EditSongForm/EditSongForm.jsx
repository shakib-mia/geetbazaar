import React, { useContext, useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import SelectOptions from "../SelectOptions/SelectOptions";
import axios from "axios";
import { backendUrl } from "../../constants";
import { camelCaseToNormalText } from "../../utils/camelCaseToNormalText";
import { ProfileContext } from "../../contexts/ProfileContext";

const EditSongForm = ({ updatedData, setUpdatedData }) => {
  const [recordLabels, setRecordLabels] = useState([]);
  const { token } = useContext(ProfileContext);

  console.log(updatedData);

  const config = {
    headers: {
      token,
    },
  };

  useEffect(() => {
    axios
      .get(backendUrl + "record-labels", config)
      .then(({ data }) => setRecordLabels(data));
  }, []);

  const languagesInIndia = [
    "Ahirani",
    "Arabic",
    "Assamese",
    "Awadhi",
    "Bengali",
    "Bhojpuri",
    "Chattisgarhi",
    "Dogri",
    "English",
    "Garhwali",
    "Garo",
    "Gujarati",
    "Haryanvi",
    "Himachali",
    "Hindi",
    "Instrumental",
    "Kannada",
    "Kashmiri",
    "Khasi",
    "kokborok",
    "Konkani",
    "kumauni",
    "Maithili",
    "Malayalam",
    "Mandarin",
    "Manipuri",
    "Marathi",
    "Marwari",
    "Naga",
    "Nagpuri",
    "Nepali",
    "Odia",
    "Punjabi",
    "Rajasthani",
    "Rajbongshi",
    "Sanskrit",
    "Tamil",
    "Telugu",
    "Urdu",
    "Tulu",
  ];

  const allowedPlatforms = [
    "JioSaavn",
    "Gaana",
    "Wynk Music",
    "Spotify",
    "Apple Music",
    "YouTube Topic",
    "YouTube Music",
    "Meta",
    "Hungama",
    "Amazon Music",
  ];

  const { selectedPlatforms } = updatedData;

  // Convert each platform name to lowercase
  const updatedSelectedPlatforms = selectedPlatforms?.map((platform) =>
    platform.toLowerCase()
  );

  // Update the updatedData with the modified selectedPlatforms array
  useEffect(() => {
    if (selectedPlatforms) {
      setUpdatedData({
        ...updatedData,
        selectedPlatforms: updatedSelectedPlatforms,
      });
    }
  }, [updatedSelectedPlatforms, updatedSelectedPlatforms?.length]);

  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    if (Object.keys(originalData).length === 0 && updatedData) {
      setOriginalData(updatedData);
    }
  }, [updatedData, originalData]);

  const isDataChanged =
    JSON.stringify(originalData) !== JSON.stringify(updatedData);

  return (
    <>
      {Object.entries(updatedData).map(([label, value], key) => {
        if (!allowedPlatforms.includes(label.toLocaleLowerCase())) {
          // Handle "Language" field
          if (label === "Language") {
            return (
              <div className="mb-4" key={key}>
                {/* <label className="block">{camelCaseToNormalText(label)}</label> */}
                <SelectOptions
                  label={camelCaseToNormalText(label)}
                  value={value}
                  options={languagesInIndia}
                  hideRequired={true}
                  placeholder={"Select..."}
                  onChange={(e) => {
                    setUpdatedData({ ...updatedData, [label]: e.target.value });
                  }}
                />
              </div>
            );
          }

          // Handle "Sub Label" field
          else if (label === "Sub Label") {
            return (
              <div className="mb-4" key={key}>
                {/* <label className="block">{camelCaseToNormalText(label)}</label> */}
                <SelectOptions
                  label={camelCaseToNormalText(label)}
                  value={updatedData["Sub Label"]}
                  options={recordLabels}
                  hideRequired={true}
                  placeholder={updatedData[label] || "Select..."}
                  onChange={(e) => {
                    setUpdatedData({ ...updatedData, [label]: e.target.value });
                  }}
                />
              </div>
            );
          }

          // Handle platform fields (only if they are in allowedPlatforms)
          else if (allowedPlatforms.includes(label)) {
            return (
              <div className="mb-4" key={key}>
                {/* <label className="block">{camelCaseToNormalText(label)}</label> */}
                <InputField
                  label={camelCaseToNormalText(label)}
                  disabled={
                    label === "UPC" ||
                    label === "ISRC" ||
                    label === "isrc" ||
                    label === "Label"
                  }
                  value={value}
                  onChange={(e) => {
                    setUpdatedData({ ...updatedData, [label]: e.target.value });
                  }}
                />
              </div>
            );
          }

          // Handle other fields (non-platform fields) like "UPC", "ISRC", etc.
          else {
            return (
              label === "S.no" || (
                <div className="mb-4" key={key}>
                  {/* <label className="block">
                    {camelCaseToNormalText(label)}
                  </label> */}
                  <InputField
                    disabled={
                      label === "UPC" || label === "ISRC" || label === "Label"
                    }
                    label={camelCaseToNormalText(label)}
                    value={value}
                    onChange={(e) => {
                      setUpdatedData({
                        ...updatedData,
                        [label]: e.target.value,
                      });
                    }}
                  />
                </div>
              )
            );
          }
        }
      })}

      <div className="flex justify-center mt-5">
        <Button type={"submit"} disabled={!isDataChanged}>
          Request Edit
        </Button>
      </div>
    </>
  );
};

export default EditSongForm;
