import React, { useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import axios from "axios";
import bg from "../../assets/images/login-bg.jpg";
import { backendUrl } from "../../constants";
import { toast } from "react-toastify";
// import * as ReactOwlCarousel from "react-owl-carousel";
import { ProfileContext } from "../../contexts/ProfileContext";

const ResetPasswordOtp = () => {
  const { userData } = useContext(ProfileContext);
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
    <div className="flex justify-center items-center min-h-screen text-white min-w-[100vw] absolute left-0 bg-center bg-cover bg-no-repeat auth-slider">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto rounded-lg overflow-hidden shadow-[0_10px_12px] shadow-[#000]">
        <aside className="p-1">
          {/* <ReactOwlCarousel
            items={1}
            className="h-full !hidden lg:!block"
            autoplay
            autoplayTimeout={3000}
            loop
            animateIn="fadeIn"
            animateOut="fadeOut"
            dots={true}
          >
            <img
              src={bg}
              alt="background"
              className="!w-full !h-full object-cover object-[7%] rounded-md aspect-square"
            />

            <img
              src={
                "https://t4.ftcdn.net/jpg/07/62/21/69/360_F_762216992_HjUZb565ohcpBh6R2rtal3JlOEf94XSX.jpg"
              }
              alt="background"
              className="!w-full !h-full object-cover object-center rounded-md aspect-square"
            />

            <img
              src={
                "https://as1.ftcdn.net/v2/jpg/10/97/26/64/1000_F_1097266431_IG7QdOTzN4kgYRCCqEqTv3A5ZXDdxllx.jpg"
              }
              alt="background"
              className="!w-full !h-full object-cover object-right rounded-md aspect-square"
            />
          </ReactOwlCarousel> */}
        </aside>
        <div className="p-4">
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
