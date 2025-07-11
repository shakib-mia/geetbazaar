import React, { useContext, useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { ProfileContext } from "../../contexts/ProfileContext";
import Swal from "sweetalert2";
import axios from "axios";
import { backendUrl } from "../../constants";

const Tokenize = ({ showTokenize, isINR, accountBalance, tokenize }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { dollarRate, token, setRefetch } = useContext(ProfileContext);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputAmount = parseFloat(amount);
    if (!inputAmount || inputAmount <= 0) {
      return Swal.fire(
        "Invalid Amount",
        "Please enter a valid amount.",
        "warning"
      );
    }

    if (inputAmount > parseFloat(accountBalance)) {
      return Swal.fire(
        "Amount Too High",
        `You cannot tokenize more than your current balance (₹${accountBalance})`,
        "error"
      );
    }

    const amountInINR = isINR ? inputAmount : inputAmount / dollarRate;

    const result = await Swal.fire({
      title: "Confirm Tokenization",
      html: `Are you sure you want to tokenize <strong>${
        isINR ? "₹" : "$"
      }${inputAmount}</strong>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, tokenize",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    axios
      .post(
        backendUrl + "tokenize",
        { tokenizedINR: amountInINR },
        { headers: { token } }
      )
      .then((res) => {
        console.log(res.data);
        setRefetch((ref) => !ref);
        const amount = isINR ? amountInINR : amountInINR * dollarRate;
        Swal.fire({
          icon: "success",
          title: "Tokenization Complete",
          text: `₹${amount.toFixed(
            2
          )} has been deducted from your account balance.`,
          confirmButtonColor: "#3085d6",
        });
        setAmount("");
        showTokenize(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Tokenization Failed",
          text: err?.response?.data?.message || "Something went wrong!",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      className={`fixed top-0 left-0 z-[99999] backdrop-blur-lg h-screen w-screen flex justify-center items-center px-4 transition-opacity ${
        tokenize
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={() => showTokenize(false)}
    >
      <div
        className="bg-gradient-to-br from-[rgba(23_23_23/0.6)] to-neutral-800 p-2 max-w-md w-full shadow-2xl text-white rounded-2xl space-y-2 transition-[scale]"
        onClick={(e) => e.stopPropagation()}
        style={{
          scale: tokenize ? "1" : "0",
        }}
      >
        <h5 className="text-heading-5-bold font-semibold text-center">
          Tokenize Funds
        </h5>
        <p className="text-paragraph-1 text-neutral-300 text-center">
          Turn your earnings into tokens and use them to purchase plans or
          services—no need to wait for withdrawals.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            min={0}
            max={parseFloat(accountBalance)}
            type="number"
            onChange={handleAmountChange}
            value={amount}
            required={true}
            label={`Enter Amount (${isINR ? "INR" : "USD"})`}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Convert to Token"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Tokenize;
