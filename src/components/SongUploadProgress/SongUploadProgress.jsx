import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const SongUploadProgress = ({ setScreen, screen }) => {
  const location = useLocation();
  const isEditMode = location.pathname.startsWith("/edit");

  const steps = [
    { id: "albumDetails", label: "ALBUM DETAILS" },
    { id: "platform", label: "PLATFORM" },
    { id: "audio", label: "AUDIO" },
    { id: "preview", label: "PREVIEW" },
    { id: "distribution", label: "DISTRIBUTION" },
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === screen);
  const maxReachedStepIndex = useRef(currentStepIndex);
  const [visitedSteps, setVisitedSteps] = useState([screen]);

  useEffect(() => {
    setVisitedSteps((prev) => {
      if (!prev.includes(screen)) {
        return [...prev, screen];
      }
      return prev;
    });

    if (!isEditMode && currentStepIndex > maxReachedStepIndex.current) {
      maxReachedStepIndex.current = currentStepIndex;
    }
  }, [screen, currentStepIndex, isEditMode]);

  const handleStepClick = (stepId) => {
    setScreen(stepId);
  };

  return (
    <div
      className="w-full overflow-x-visible flex flex-col gap-0 lg:gap-8 mt-6"
      id="upload-progress"
    >
      <div className="w-full relative mt-2 mb-4">
        <div className="relative px-2 sm:px-4 lg:px-12">
          <div className="w-full lg:w-5/6 mx-auto h-[2px] bg-gray-200 rounded-full">
            <div
              className="h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
              style={{
                width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
              }}
            ></div>
          </div>

          <div className="absolute -top-6 sm:-top-2 lg:-top-[32px] left-0 right-2 sm:right-4 lg:right-12 grid grid-cols-5 w-full">
            {steps.map((step, index) => {
              const isActive = screen === step.id;
              const isPassed = currentStepIndex > index;
              const isVisitedForward =
                index > currentStepIndex && visitedSteps.includes(step.id);

              const circleBorderColor = isActive
                ? "border-interactive-light-confirmation"
                : isPassed || isVisitedForward || isEditMode
                ? "border-interactive-light"
                : "border-interactive-light-disabled";

              const circleBgColor = isActive
                ? "bg-interactive-light-confirmation"
                : isPassed || isVisitedForward || isEditMode
                ? "bg-interactive-light"
                : "bg-interactive-light-disabled";

              const textColor = isActive
                ? "text-interactive-light-confirmation"
                : isPassed || isVisitedForward || isEditMode
                ? "text-interactive-light"
                : "text-interactive-light-disabled";

              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center cursor-pointer`}
                >
                  <div
                    className={`rounded-full w-6 h-6 sm:w-4 sm:h-4 lg:w-6 lg:h-6 bg-white p-[2px] lg:p-1 border-2 ${circleBorderColor} transition-all`}
                    onClick={() => handleStepClick(step.id)}
                  >
                    <div
                      className={`w-full h-full flex justify-center items-center text-xs sm:text-[16px] lg:text-heading-5-bold text-white rounded-full ${circleBgColor}`}
                    >
                      {index + 1}
                    </div>
                  </div>
                  <span
                    className={`block text-[10px] sm:text-xs lg:text-paragraph-1 text-center font-bold mt-1 ${textColor}`}
                    onClick={() => handleStepClick(step.id)}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongUploadProgress;
