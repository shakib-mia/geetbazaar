import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const Step = ({ step, isLeft, id }) => {
  const stepRef = useRef(null);

  useEffect(() => {
    if ((id + 1) % 2) {
      gsap.to(stepRef.current, {
        left: 0,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1,0.9)",
        scrollTrigger: {
          trigger: `#step-${id}`,
          start: "top 50%",
          // markers: true,
        },
      });
    } else {
      gsap.to(stepRef.current, {
        right: 0,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1,0.9)",
        scrollTrigger: {
          trigger: `#step-${id}`,
          start: "top 50%",
          // markers: true,
        },
      });
    }
  }, [id]);

  return (
    <div
      className={`mb-4 relative flex flex-col lg:flex-row justify-between items-center w-full ${
        isLeft ? "lg:flex-row-reverse" : "lg:flex-row"
      } ${
        (id + 1) % 2 === 0
          ? "lg:-right-[50%] opacity-0"
          : "lg:-left-[50%] opacity-0"
      }`}
      ref={stepRef}
      id={`step-${id}`}
    >
      <div className="w-full lg:w-5/12"></div>
      <div className="z-10 bg-interactive-light border-2 border-interactive-light rounded-xl shadow-md w-full lg:w-5/12 p-4">
        <h5 className="font-bold text-heading-5-bold text-white mb-1">
          {step.step}
        </h5>
        <p className="text-white-secondary">{step.details}</p>
        {step.important_notes && (
          <ul className="list-disc pl-2 flex flex-col gap-1 mt-2 text-sm text-white-secondary">
            {step.important_notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        )}
        {step.example && (
          <p className="text-sm text-white-secondary mt-2">
            <span className="font-semibold">Example:</span> {step.example}
          </p>
        )}
      </div>
    </div>
  );
};

export default Step;
