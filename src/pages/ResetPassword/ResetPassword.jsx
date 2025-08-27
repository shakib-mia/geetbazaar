import React from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import * as ReactOwlCarousel from "react-owl-carousel";
import loginBg from "../../assets/images/loginbg.jpg";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const token = new URLSearchParams(window.location.search).get("token");
  const navigate = useNavigate();
  // console.log(token);

  const handleSubmit = (e) => {
    e.preventDefault();

    const password = e.target["password"].value;
    // console.log(otp, token);
    console.log(password);

    axios
      .post(backendUrl + "reset-password/update", { token, password })
      .then(({ data }) => {
        console.log(data);
        if (data.modifiedCount) {
          toast.success("Password Set is Successful.", {
            position: "bottom-center",
          });

          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.response.data.message);
      });
    // Handle the OTP verification logic here
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
        <form
          onSubmit={handleSubmit}
          className="p-4 border-2 backdrop-blur-lg bg-black/15 border-white/30 rounded-xl max-w-lg"
        >
          <h5 className="text-heading-5-bold mb-4">Reset Password</h5>
          <InputField
            type="password"
            label="Enter New Password"
            name="password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
          <InputField
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm New Password"
            value={confirmPassword}
          />

          <Button
            type={"submit"}
            className="!mt-5"
            disabled={newPassword !== confirmPassword || newPassword.length < 6}
          >
            Verify
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
