import React, { useContext } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { PlanContext } from "../../contexts/PlanContext";
import { ProfileContext } from "../../contexts/ProfileContext";

const GSTCalculator = ({ location, formData }) => {
  const { planStore } = useContext(PlanContext);
  const { userData, dollarRate } = useContext(ProfileContext);

  // Determine the correct price source
  const rawPrice =
    userData.billing_country === "India"
      ? planStore.price || formData.price
      : parseFloat(location.search.split("?")[2] || formData.price);

  // Convert raw price to number
  const totalPriceInPaisa = parseInt(rawPrice, 10);

  // Convert to rupees (or dollar equivalent in rupees)
  let totalPrice = totalPriceInPaisa / 100;

  // Multiply by dollarRate if billing_country is NOT India
  if (userData.billing_country !== "India") {
    totalPrice = totalPrice * dollarRate;
  }

  // GST calculation
  const gstRate = 18;
  const originalPrice = totalPrice / (1 + gstRate / 100);
  const gstAmount = totalPrice - originalPrice;

  return (
    <aside className="w-1/2 p-2 flex items-center">
      <span className="font-bold">
        {userData.billing_country !== "India" ? "$" : <>&#8377;</>}
        {totalPrice.toFixed(2)} (Includes{" "}
        {userData.billing_country !== "India" ? "$" : <>&#8377;</>}
        {gstAmount.toFixed(2)} 18% GST)
      </span>
    </aside>
  );
};

export default GSTCalculator;
