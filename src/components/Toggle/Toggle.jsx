import React from "react";

const Toggle = ({ checked, setChecked }) => {
  return (
    <label className="flex justify-center cursor-pointer">
      <div className="border-2 border-interactive-light px-[2px] items-center rounded-full inline-flex shadow-[inset_0px_0px_2px_#333] w-6 h-4 relative">
        <div
          className={`absolute top-0 bottom-0 my-auto transition-transform ease-in duration-150 ${
            checked ? "translate-x-[63%]" : "translate-x-0"
          } transform-gpu`}
          style={{ left: "2px", right: "2px" }} // Ensures the circle can move the full track width
        >
          <div
            className={`w-3 h-3 rounded-full relative mt-[2px] bg-interactive-light shadow-[1px_1px_5px_#333] transition-all duration-150 ease-in ${
              checked ? "rotate-180" : "rotate-0"
            }`}
          >
            <div className="w-[2px] h-[2px] bg-white absolute top-[4px] left-[4px] rounded-full"></div>
          </div>
        </div>
      </div>
      <input
        type="checkbox"
        className="hidden"
        onChange={(e) => setChecked(e.target.checked)}
      />
    </label>
  );
};

export default Toggle;
