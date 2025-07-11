import React, { useContext, useState } from "react";
import InputField from "../InputField/InputField";
import { ScreenContext } from "../../contexts/ScreenContext";
import { useLocation } from "react-router-dom";

const CallerTuneTimeStamp = ({ audioDuration, id }) => {
  const location = useLocation();
  const { formData } = useContext(ScreenContext);
  // console.log({ audioDuration });

  const isAlbumRelatedPage =
    location.pathname === "/album-upload" ||
    location.search.includes("yearly-plan") ||
    location.pathname.includes("edit-album");

  const [startMinutes, setStartMinutes] = useState(
    isAlbumRelatedPage
      ? formData.songs[id]?.startMinutes
      : formData.startMinutes
  );
  const [startSeconds, setStartSeconds] = useState(
    isAlbumRelatedPage
      ? formData.songs[id]?.startSeconds
      : formData.startSeconds
  );
  const [startMinutes2, setStartMinutes2] = useState(
    isAlbumRelatedPage
      ? formData.songs[id]?.startMinutes2
      : formData.startMinutes2
  );
  const [startSeconds2, setStartSeconds2] = useState(
    isAlbumRelatedPage
      ? formData.songs[id]?.startSeconds2
      : formData.startSeconds2
  );

  const updateFormData = (key, value, isSecond = false) => {
    const parsedValue = value ? parseInt(value) : 0;
    if (isAlbumRelatedPage) {
      formData.songs[id][key] = parsedValue;
    } else {
      formData[key] = parsedValue;
    }
  };

  return (
    <div className="w-full mt-4">
      <div className="flex flex-col lg:flex-row gap-3 w-full mt-1">
        {/* Caller Tune Time (1) */}
        <aside className="w-full lg:w-1/2">
          <div className="mt-2 mb-1 text-white">
            Select Caller Tune Time (1)
          </div>
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="w-full lg:w-1/2">
              <InputField
                type="number"
                label="Start Time (Minute)"
                required
                value={
                  isAlbumRelatedPage
                    ? formData.songs[id]?.startMinutes
                    : startMinutes
                }
                id="start-minutes"
                name="startMinutes"
                placeholder="Enter Caller Tune Time"
                note="For Jio, BSNL, VI & Airtel"
                min={0}
                onChange={(e) => {
                  const value = e.target.value;
                  setStartMinutes(value);
                  updateFormData("startMinutes", value);
                }}
              />
            </div>
            <div className="w-full lg:w-1/2">
              <InputField
                type="number"
                label="Start Time (Seconds)"
                required
                value={
                  isAlbumRelatedPage
                    ? formData.songs[id]?.startSeconds
                    : startSeconds
                }
                id="start-seconds"
                name="startSeconds"
                placeholder="Enter Caller Tune Time"
                note="For Jio, BSNL, VI & Airtel"
                min={0}
                max={audioDuration - 45}
                onChange={(e) => {
                  const value = e.target.value;
                  setStartSeconds(value);
                  updateFormData("startSeconds", value);
                }}
              />
            </div>
          </div>
        </aside>

        {/* Caller Tune Time (2) */}
        <aside className="w-full lg:w-1/2">
          <div className="mt-2 mb-1 text-white">
            Select Caller Tune Time (2)
          </div>
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="w-full lg:w-1/2">
              <InputField
                type="number"
                label="Start Time (Minute)"
                required={false}
                value={
                  isAlbumRelatedPage
                    ? formData.songs[id]?.startMinutes2
                    : startMinutes2
                }
                id="start-minutes2"
                name="startMinutes2"
                placeholder="Enter Caller Tune Time"
                note="For BSNL, VI & Airtel"
                containerClassName="w-full"
                min={0}
                onChange={(e) => {
                  const value = e.target.value;
                  setStartMinutes2(value);
                  updateFormData("startMinutes2", value);
                }}
              />
            </div>
            <div className="w-full lg:w-1/2">
              <InputField
                type="number"
                label="Start Time (Seconds)"
                required={false}
                value={
                  isAlbumRelatedPage
                    ? formData.songs[id]?.startSeconds2
                    : startSeconds2
                }
                id="start-seconds2"
                name="startSeconds2"
                placeholder="Enter Caller Tune Time"
                note="For BSNL, VI & Airtel"
                containerClassName="w-full"
                min={0}
                max={audioDuration - 45}
                onChange={(e) => {
                  const value = e.target.value;
                  setStartSeconds2(value);
                  updateFormData("startSeconds2", value);

                  console.log(formData);
                }}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CallerTuneTimeStamp;
