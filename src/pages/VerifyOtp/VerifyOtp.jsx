import React, { useContext, useRef } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import * as ReactOwlCarousel from "react-owl-carousel";
import loginBg from "../../assets/images/loginbg.jpg";

const VerifyOtp = () => {
  const { userData, token } = useContext(ProfileContext);
  const navigate = useNavigate();

  console.log(userData);

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

    const config = {
      headers: {
        token,
      },
    };

    axios
      .post(backendUrl + "user-signup/verify-otp", { otp }, config)
      .then(({ data }) => {
        if (data.success) {
          toast.success("OTP verified successfully", {
            position: "bottom-center",
          });
          navigate("/signup-details");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "bottom-center",
        });
      });

    // Example: verifyOtp(otp)
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
        <div className="p-4 border-2 backdrop-blur-lg bg-black/15 border-white/30 rounded-xl max-w-6xl">
          <form action="" onSubmit={handleSubmit}>
            <h5 className="text-heading-5-bold">Verify Email Address</h5>
            <p>Enter the otp sent to your email.</p>

            <div className="grid grid-cols-4 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <InputField
                  key={i}
                  maxLength="1"
                  fieldClassName="aspect-square text-heading-5 text-center !w-[70px] !p-0 !text-center"
                  ref={inputRefs[i]}
                  onChange={(e) => handleInputChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onPaste={handlePaste}
                />
              ))}
            </div>

            <Button>Verify</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
