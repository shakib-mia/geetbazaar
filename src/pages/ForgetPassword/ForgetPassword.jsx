import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";
// import * as ReactOwlCarousel from "react-owl-carousel";
import { useNavigate } from "react-router-dom";
import AuthSlider from "../../components/AuthSlider/AuthSlider";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import loginBg from "../../assets/images/loginbg.jpg";

// import { Link } from "react-router-dom";

const ForgetPassword = () => {
  // const disabled =
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  // const navigate = useNavigate()

  const navigate = useNavigate();

  const resetPassword = (e) => {
    // codes fore reset password will go here
    setSending(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("emailId", e.target["forgot-email"].value);

    axios
      .post(backendUrl + "reset-password", {
        user_email: e.target["forgot-email"].value.toLowerCase(),
      })
      .then(({ data }) => {
        console.log(data);
        setSending(false);
        navigate("/verify-otp/reset?token=" + data);
        // data;
        // if (data.modifiedCount) {
        //   setSending(false);
        //   setSent(true);
        //   toast.success(
        //     "Password Set is Successful. Check your Email for Your Password",
        //     {
        //       position: "bottom-center",
        //     }
        //   );
        // }
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.response.data.message);
        setSending(false);
      });
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
        <div className="p-4 border-2 backdrop-blur-lg bg-black/15 border-white/30 rounded-xl">
          {/* <BsChevronLeft
            className="absolute left-0 top-1 text-heading-5 cursor-pointer"
            onClick={() => navigate(-1)}
          /> */}
          <div className="flex justify-between items-center">
            <h4 className="text-heading-4-bold font-bold text-center text-white">
              Forgot Your Password
            </h4>
          </div>
          <form className="mt-3" onSubmit={resetPassword}>
            <InputField
              type="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="forgot-email"
              required={true}
              fieldClassName="!border-none !bg-white/30"
            />

            <Button disabled={sending} type={"submit"}>
              Submit{sending ? "ting" : ""}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
