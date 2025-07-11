import gsap from "gsap";
import React, { useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const Feature = ({ feature, plans, index }) => {
  const featureRef = React.useRef(null);

  useEffect(() => {
    gsap.to(featureRef.current, {
      opacity: 1,
      left: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: featureRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true, // Ensures the animation only plays once
      },
    });
  }, [feature, index]);

  return (
    //   <td colSpan={plans.length + 1} className="py-1">
    <div
      className={`grid grid-cols-${
        plans.length + 1
      } items-center gap-4 px-4 py-3 rounded-2xl shadow transition hover:shadow-lg ${
        index % 2 === 0
          ? "bg-gradient-to-r from-[#0F172A] to-[#1E293B]"
          : "bg-gradient-to-r from-[#1E293B] to-[#0F172A]"
      } opacity-0 relative -left-7`}
      ref={featureRef}
    >
      <div className="text-white font-medium">{feature}</div>
      {plans.map((plan, planIndex) => (
        <div key={planIndex} className="text-center">
          {plan.features[index] ? (
            <FaCheck className="text-green-400 text-lg mx-auto" />
          ) : (
            <FaTimes className="text-red-500 text-lg mx-auto" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Feature;
