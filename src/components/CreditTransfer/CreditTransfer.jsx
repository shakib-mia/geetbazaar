import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";
import SelectOptions from "../SelectOptions/SelectOptions";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";

const CreditTransfer = ({ showCreditTransfer, creditTransfer }) => {
  const { userData, token } = useContext(ProfileContext);
  const [amount, setAmount] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [otpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [hashedOtp, setHashedOtp] = useState("");

  useEffect(() => {
    axios
      .get(backendUrl + "all-users")
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users. Please try again later.");
      });
  }, []);

  const handleSendOtp = (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount to transfer.");
      return;
    }

    if (!selectedUserEmail) {
      alert("Please select a user to transfer to.");
      return;
    }

    setLoading(true);
    axios
      .post(
        backendUrl + "tokenize/send-otp",
        { purpose: "credit-transfer" },
        { headers: { token } }
      )
      .then(({ data }) => {
        toast.success("OTP sent to your registered email.", {
          position: "bottom-center",
        });
        setOtpModal(true);
        setHashedOtp(data.hashedOtp);
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.message ||
          "Failed to send OTP. Please try again.";
        alert(msg);
      })
      .finally(() => setLoading(false));
  };

  const handleVerifyOtpAndTransfer = (e) => {
    e.preventDefault();

    if (otp.length < 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    setOtpLoading(true);
    axios
      .post(
        backendUrl + "tokenize/verify-otp",
        {
          otp,
          amount: parseFloat(amount),
          to: selectedUserEmail,
          hashedOtp,
        },
        { headers: { token } }
      )
      .then(() => {
        alert("Transfer successful");
        setAmount("");
        setSelectedUserEmail("");
        setOtp("");
        setOtpModal(false);
        showCreditTransfer(false);
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.message ||
          "OTP verification failed or transfer failed.";
        alert(msg);
      })
      .finally(() => setOtpLoading(false));
  };

  return (
    <>
      {/* Main Transfer Modal */}
      <div
        className={`fixed top-0 left-0 z-[99999] backdrop-blur-lg h-screen w-screen flex justify-center items-center px-4 transition-opacity duration-500 ${
          creditTransfer
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => showCreditTransfer(false)}
      >
        <div
          className="bg-gradient-to-br from-[rgba(23_23_23/0.6)] to-neutral-800 p-2 max-w-md w-full shadow-2xl text-white rounded-2xl space-y-1"
          onClick={(e) => e.stopPropagation()}
        >
          <h5 className="text-heading-5-bold text-center">Credit Transfer</h5>
          <form onSubmit={handleSendOtp} className="space-y-3">
            <InputField
              type="number"
              label="Enter Token"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              placeholder="Enter amount to transfer"
              id="credit-transfer-amount"
              required
              name="amount"
              max={userData?.tokenized ? userData.tokenized.toFixed(2) : 0}
              note={`You can transfer ${
                userData?.tokenized?.toFixed(2) || 0
              } tokens.`}
            />

            <SelectOptions
              options={users
                .map((user) => user["user-id"])
                .sort((a, b) => a.localeCompare(b))}
              placeholder="Select a User"
              name="email"
              onChange={(e) => setSelectedUserEmail(e.target.value)}
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>

      {/* OTP Modal */}
      {otpModal && (
        <div
          className="fixed top-0 left-0 z-[99999] backdrop-blur-md h-screen w-screen flex justify-center items-center px-4"
          onClick={() => setOtpModal(false)}
        >
          <div
            className="bg-gradient-to-br from-[rgba(23_23_23/0.6)] to-neutral-800 p-2 max-w-lg w-full shadow-xl text-white rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h5 className="text-heading-5-bold font-bold text-center mb-2">
              Enter OTP
            </h5>
            <form onSubmit={handleVerifyOtpAndTransfer}>
              <div className="grid grid-cols-6 gap-2">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props, index) => (
                    <input
                      key={index}
                      {...props}
                      className="bg-neutral-700 border border-gray-500 text-white !w-full aspect-square rounded text-center text-heading-5"
                    />
                  )}
                  containerStyle={{ display: "contents" }}
                />
              </div>

              <Button type="submit" disabled={otpLoading}>
                {otpLoading ? "Verifying..." : "Verify & Transfer"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreditTransfer;
