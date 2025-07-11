import React from "react";
import { useState } from "react";
import { FaCheck, FaChevronUp } from "react-icons/fa";

const FeatureList = ({ plan, isHighlighted }) => {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => setShowAll(!showAll);
  const visibleFeatures = showAll ? plan.features : plan.features.slice(0, 6);
  const hasExtraFeatures = plan.features.length > 6;
  console.log({ plan, isHighlighted });

  return (
    <>
      <ul className="space-y-1">
        {visibleFeatures.map((feature, idx) => (
          <li key={idx} className="flex gap-2 items-center text-paragraph-1">
            <FaCheck className="w-1/12 text-green-500" />
            <aside className="w-11/12">{feature}</aside>
          </li>
        ))}
      </ul>

      {hasExtraFeatures && !showAll && (
        <div
          className={`relative -top-4 bg-gradient-to-t ${
            isHighlighted ? "from-interactive-light" : "from-black"
          } to-transparent h-10`}
        />
      )}

      {hasExtraFeatures && (
        <div className="mt-2 w-full flex justify-center">
          <button
            onClick={toggleShowAll}
            className={`text-sm flex items-center gap-1 hover:underline ${
              isHighlighted
                ? "text-interactive-light"
                : "text-interactive-light"
            }`}
          >
            Show {showAll ? "Less" : "More"}
            <FaChevronUp
              className={`transition-transform duration-300 ${
                showAll ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>
        </div>
      )}
    </>
  );
};

export default FeatureList;
