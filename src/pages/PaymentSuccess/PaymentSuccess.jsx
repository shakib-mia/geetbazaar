import React, { useContext } from "react";
import bg from "../../assets/images/dashboard-bg.webp";
import { PlanContext } from "../../contexts/PlanContext";
import { FaCheck, FaRupeeSign } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { ProfileContext } from "../../contexts/ProfileContext";

const PaymentSuccess = () => {
  const { planStore } = useContext(PlanContext);
  const { userData } = useContext(ProfileContext);
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-xl rounded-md bg-white shadow-lg p-3">
        <div className="bg-success relative w-5 h-5 rounded-full flex justify-center items-center text-white text-heading-5 mx-auto">
          <FaCheck className="absolute z-20" />
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success z-0 opacity-75"></span>
        </div>

        <h4 className="text-heading-4 mt-3 text-center">Payment Successful</h4>

        <div className="grid grid-cols-2 mt-5 divide-x divide-y divide-grey border border-grey">
          <h6 className="p-2 text-heading-6">Plan Name</h6>
          <h6 className="p-2 text-heading-6-bold !border-t-0">
            {planStore.planName}
          </h6>
          <h6 className="p-2 text-heading-6 !border-l-0">Price</h6>
          <h6 className="p-2 text-heading-6-bold flex items-center gap-0">
            {userData.billing_country === "India" ? <FaRupeeSign /> : "$"}
            {parseFloat(planStore.price) / 100}
          </h6>

          <h6 className="p-2 text-heading-6 !border-l-0">Payment ID</h6>
          <h6 className="p-2 text-heading-6-bold">{planStore.payment_id}</h6>
        </div>

        {/* <div className="text-center mt-4">
          Back to{" "}
          <Link
            className="text-interactive-light underline hover:text-interactive-light-hover hover:no-underline"
            to={"/"}
          >
            Home
          </Link>
        </div> */}

        <Button
          type={"success"}
          containerClassName={"mt-4 w-full"}
          onClick={() => navigate("/")}
          className={
            "w-full justify-center !bg-interactive-light-confirmation hover:!bg-interactive-light-confirmation-hover active:!bg-interactive-light-confirmation-active"
          }
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
