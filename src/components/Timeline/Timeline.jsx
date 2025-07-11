import React from "react";
import Step from "../Step/Step";

const Timeline = ({ steps }) => {
  return (
    <div className="relative mx-auto w-full max-w-4xl py-10">
      <div className="border-l-2 border-gray-300 absolute -left-3 lg:left-1/2 transform -translate-x-1/2 h-full z-0"></div>

      {steps.map((step, idx) => (
        <Step key={idx} step={step} id={idx} isLeft={idx % 2 === 0} />
      ))}
    </div>
  );
};

export default Timeline;
