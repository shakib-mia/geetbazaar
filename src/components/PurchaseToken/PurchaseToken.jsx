import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import React from "react";
import Button from "../Button/Button";

const purchaseToken = async () => {
  try {
    // Replace with your actual purchase logic or API call
    // Example:
    // const response = await fetch('/api/purchase-token', { method: 'POST' });
    // const data = await response.json();
    alert("Token purchased successfully!");
  } catch (error) {
    alert("Failed to purchase token.");
  }
};

const PurchaseToken = () => {
  return (
    <>
      <Button disabled={true} styleType="outlined" onClick={purchaseToken}>
        <BiSolidPurchaseTagAlt /> Purchase Token
      </Button>
    </>
  );
};

export default PurchaseToken;
