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

  // Update visited steps whenever screen changes
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
    const clickedStepIndex = steps.findIndex((step) => step.id === stepId);
    const isForward = clickedStepIndex > currentStepIndex;
    const isVisited = visitedSteps.includes(stepId);

    if (!isForward || isVisited || isEditMode) {
      setScreen(stepId);
    }
  };

  // Example: Check if any forward steps are already visited
  const hasVisitedForwardSteps = steps.some((step, index) => {
    return index > currentStepIndex && visitedSteps.includes(step.id);
  });

  console.log("Has visited forward steps:", hasVisitedForwardSteps);

  return (
    <div
      className="w-full overflow-x-visible flex flex-col gap-0 lg:gap-8 mt-6"
      id="upload-progress"
    >
      <div className="w-full relative mt-2 mb-4">
        <div className="relative px-4 lg:px-12">
          <div className="w-full lg:w-11/12 mx-auto h-[2px] bg-gray-200 rounded-full">
            <div
              className="h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
              style={{
                width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
              }}
            ></div>
          </div>

          <div className="absolute -top-2 lg:-top-[32px] left-0 right-4 lg:right-12 flex justify-between">
            {steps.map((step, index) => {
              const isVisited = visitedSteps.includes(step.id);
              const isForward = index > currentStepIndex;

              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${
                    !isForward || isVisited || isEditMode
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                >
                  <div
                    className={`rounded-full w-4 lg:w-6 aspect-square ${
                      screen === step.id
                        ? "p-1 border-2 border-interactive-light bg-black"
                        : ""
                    } transition-all`}
                    onClick={() => handleStepClick(step.id)}
                  >
                    <div
                      className={`w-full h-full flex justify-center items-center text-heading-5-bold text-white text-sm rounded-full ${
                        currentStepIndex >= index || isVisited || isEditMode
                          ? "bg-gradient-to-br from-blue-700 to-blue-600"
                          : "bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>
                  <span
                    className={`hidden lg:block text-paragraph-1 text-center font-bold mt-1 ${
                      currentStepIndex >= index || isVisited || isEditMode
                        ? "text-interactive-light"
                        : "text-white-deactivated"
                    }`}
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
