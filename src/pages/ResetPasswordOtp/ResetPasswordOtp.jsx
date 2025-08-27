import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";
import { toast } from "react-toastify";
// import * as ReactOwlCarousel from "react-owl-carousel";
import loginBg from "../../assets/images/loginbg.jpg";

const ResetPasswordOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.search.split("=")[1];

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  // Function to handle input change and auto focus
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    } else if (
      value.length === 0 &&
      index > 0 &&
      e.inputType === "deleteContentBackward"
    ) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      inputRefs[index].current.value === "" &&
      index > 0
    ) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const otp = inputRefs.map((ref) => ref.current.value).join("");

    axios
      .post(backendUrl + "reset-password/verify", { token, otp })
      .then(({ data }) => {
        if (data.success) {
          toast.success(data.message, {
            position: "bottom-center",
          });
          navigate(`/reset-password?token=${token}`);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Error verifying OTP", {
          position: "bottom-center",
        });
      });
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d{1,4}$/.test(paste)) return; // only allow numeric OTP

    paste.split("").forEach((char, idx) => {
      if (inputRefs[idx]?.current) {
        inputRefs[idx].current.value = char;
      }
    });

    const nextIndex = paste.length >= 4 ? 3 : paste.length;
    if (inputRefs[nextIndex]?.current) {
      inputRefs[nextIndex].current.focus();
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen text-black min-w-[100vw] absolute left-0 bg-center bg-cover bg-no-repeat"
      id="login-page"
    >
      <div
        className="flex justify-center items-center min-h-screen text-black min-w-[100vw] absolute left-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        <div className="p-4 border-2 backdrop-blur-lg bg-black/15 border-white/30 rounded-xl max-w-lg">
          <form onSubmit={handleSubmit}>
            <h5 className="text-heading-5-bold">Verify Email Address</h5>
            <p>Enter the otp sent to your email.</p>

            <div className="grid grid-cols-4 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <InputField
                  key={i}
                  maxLength="1"
                  fieldClassName="aspect-square text-heading-5 text-center w-5 !p-0 !text-center"
                  ref={inputRefs[i]}
                  onChange={(e) => handleInputChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onPaste={handlePaste}
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            <Button type="submit">Verify</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordOtp;
