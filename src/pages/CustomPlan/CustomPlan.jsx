import React from "react";
import YearlyPlanForm from "../../components/YearlyPlanForm/YearlyPlanForm";

const CustomPlan = () => {
  return (
    <div className="px-1 py-6 xl:p-7">
      <div className="max-w-4xl mx-auto shadow-xl p-4">
        <YearlyPlanForm />
      </div>
    </div>
  );
};

export default CustomPlan;
