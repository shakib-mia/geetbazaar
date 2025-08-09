import React from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";
import bg from "../../assets/images/login-bg.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import * as ReactOwlCarousel from "react-owl-carousel";

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
    <div className="flex justify-center items-center min-h-screen text-black min-w-[100vw] absolute left-0 bg-center bg-cover bg-no-repeat">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-sm lg:max-w-4xl mx-auto w-full rounded-lg overflow-hidden shadow-[0_10px_12px] shadow-[#000] p-1">
        <aside className="p-1 pl-0 pb-0">
          {/* <ReactOwlCarousel
            items={1}
            className="h-full !hidden lg:!block auth-slider"
            autoplay
            autoplayTimeout={3000}
            loop
            animateIn="fadeIn"
            animateOut="fadeOut"
            dots={true}
            mouseDrag={false} // disables mouse swiping
            touchDrag={false} // disables touch swiping
            pullDrag={false} // disables pull drag behavior
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
        <form className="p-2 lg:p-4" onSubmit={handleSubmit}>
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
