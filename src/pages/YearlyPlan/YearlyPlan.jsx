import React from "react";
import YearlyPlanText from "../../components/YearlyPlanText/YearlyPlanText";
import YearlyPlanForm from "../../components/YearlyPlanForm/YearlyPlanForm";

const YearlyPlan = () => {
  return (
    <div className="pb-4">
      <div className="flex flex-col xl:flex-row gap-3 xl:gap-2 w-5/6 lg:w-1/2 shadow-xl mx-auto mb-3 lg:mb-6 my-6 rounded-xl overflow-hidden bg-interactive-light">
        {/* <Form
        on
        heading="Yearly Plans"
        containerClassName="xl:mt-5 !mx-0 xl:!ml-4 !w-full xl:!w-5/12 !px-4"
        fields={fields}
        headingSize="text-heading-3-bold"
      ></Form> */}

        <aside className="lg:p-4 h-1/2 lg:h-full overflow-y-auto p-2 text-white">
          <YearlyPlanText />
        </aside>
        {/* <aside className="w-full xl:w-1/2 bg-white py-2 px-2 lg:py-4 lg:px-5">
          <p className="text-interactive-light mb-3 lg:mb-6 text-heading-4">
            Please Fill out the form to send the request for yearly plan.
          </p>
          <YearlyPlanForm />
        </aside> */}
      </div>
    </div>
  );
};

export default YearlyPlan;
