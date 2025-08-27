import logo from "../../assets/images/logo_white.png";
import React, { useContext, useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProfileContext } from "../../contexts/ProfileContext";
import { toast } from "react-toastify";
import { backendUrl } from "../../constants";
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
// import auth from "../../firebase.init";
import AuthSlider from "../../components/AuthSlider/AuthSlider";
// import * as ReactOwlCarousel from "react-owl-carousel";
import loginBg from "../../assets/images/loginbg.jpg";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { VscLoading } from "react-icons/vsc";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  // const location = useLocation();
  const navigate = useNavigate();
  const { setUserData, userData, setToken } = useContext(ProfileContext);
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  // console.log(location.pathname);
  useEffect(() => {
    if (user) {
      console.log({ user: user.user });

      setUserData({
        ...userData,
        user_email: user.user.email,
        last_name:
          user.user.displayName.split(" ")[
            user.user.displayName.split(" ").length - 1
          ],

        first_name: user.user.displayName
          .split(" ")
          .slice(0, user.user.displayName.split(" ").length - 1)
          .join(" "),
      });

      const signupData = {
        email: user.user.email,
        first_name: user.user.displayName
          .split(" ")
          .slice(0, user.user.displayName.split(" ").length - 1)
          .join(" "),
        last_name:
          user.user.displayName.split(" ")[
            user.user.displayName.split(" ").length - 1
          ],
        display_image: user.user.photoURL,
      };
      // console.log(signupData);
      setUserData({ ...userData, user_email: signupData.email, ...signupData });
      navigate("/signup-details");

      // axios
      //   .post(backendUrl + "user-signup", signupData)
      //   .then(({ data }) => {
      //     if (data.acknowledged) {
      //       // setUId(data.insertedId);
      //       // console.log(signupData.email);
      //       toast.success("Signup Successful. Please Login Now.");
      //       setUserData({ ...userData, user_email: signupData.email });
      //       navigate("/signup-details");
      //     }
      //   })
      //   .catch((err) =>
      //     toast.error(err.response.data, { position: "bottom-center" })
      //   );
    }
  }, [user]);

  const fields = [
    {
      id: "signup-email",
      name: "user_email",
      label: "Email",
      type: "email",
      placeholder: "Email Address",
      onChange: (e) => setEmail(e.target.value),
      value: email,
    },
    {
      id: "signup-pass",
      name: "user_password",
      label: "Password",
      type: "password",
      placeholder: "Enter Password",
      onChange: (e) => setPassword(e.target.value),
      value: password,
    },
    {
      id: "confirm-password",
      name: "user_confirm_password",
      label: "Confirm Password",
      type: "password",
      placeholder: "Re-enter Address",
      onChange: (e) => setConfirmPass(e.target.value),
      value: confirmPass,
    },
  ];

  const signup = (e) => {
    e.preventDefault();

    const signupData = {
      email: e.target["user_email"].value.toLowerCase(),
      password: e.target["user_password"].value,
      signupAt: new Date().toISOString(), // e.g. "2025-05-27T09:30:00.000Z"
    };

    axios
      .post(backendUrl + "user-signup", signupData)
      .then(({ data }) => {
        if (data.token.length) {
          setUserData({
            ...userData,
            user_email: signupData.email,
          });
          setToken(data.token);
          // navigate("/signup-details");
          navigate("/verify-otp");
        }
      })
      .catch((err) =>
        toast.error(err.response.data, { position: "bottom-center" })
      );

    // const formData = new FormData(e.target);

    // axios.post("https://beta.geetbazaardigital.com/admin/api/userRegistration", formData).then(res => {
    //   if (res.data.success) {
    // (res.data);
    //     setUserData({ ...userData, email: e.target.user_email.value, userId: res.data.data })
    //     navigate("/login");
    //     setPrevRoute(location.pathname)
    //     // navigate("/signup-details")
    //   } else {
    //     toast.error(res.data.message)
    //   }
    // })
  };

  return (
    <>
      <div className="max-w-6xl absolute top-0 left-0 z-[9999] mx-auto right-0 pt-2 flex justify-between">
        <img src={logo} className="w-[300px]" alt="" />
      </div>
      <div className="flex justify-center items-center min-h-screen text-black min-w-[100vw] absolute left-0 bg-center bg-cover bg-no-repeat">
        <div
          className="flex justify-center items-center min-h-screen text-black min-w-[100vw] absolute left-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${loginBg})` }}
        >
          <div className="p-4 border-2 backdrop-blur-lg bg-black/15 border-white/30 rounded-xl max-w-xl w-full">
            <div className="flex justify-between items-end">
              <h4 className="text-heading-5-bold lg:text-left lg:text-heading-4-bold font-bold text-center text-white lg:whitespace-nowrap">
                Sign Up
              </h4>

              {/* <aside className="hidden lg:block">
            Already have an account?{" "}
            <Link to={"/login"} className="text-interactive-light-disabled">
              Login
            </Link>
          </aside> */}
            </div>

            <form onSubmit={signup}>
              {fields.map((props, id) => (
                <InputField
                  {...props}
                  key={id}
                  containerClassName="mt-3"
                  fieldClassName="!border-none !bg-white/30"
                />
              ))}
              <div className="mt-3 mb-2 text-center">
                <Button
                  type="submit"
                  text="Sign Up"
                  disabled={
                    !(
                      email.length > 0 &&
                      password.length &&
                      password === confirmPass
                    )
                  }
                >
                  Sign Up
                </Button>
              </div>
            </form>

            <button
              className="flex w-full py-2 border border-interactive-light-disabled rounded-full justify-center items-center group transition hover:bg-interactive-light"
              onClick={() => {
                signInWithGoogle();
              }}
              // disabled={googleLoading}
            >
              {!loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 272 92"
                  preserveAspectRatio="xMidYMid meet"
                  className="w-1/4 h-auto"
                >
                  <path
                    className="fill-white"
                    d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
                  />
                  <path
                    className="fill-white"
                    d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
                  />
                  <path
                    className="fill-white"
                    d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
                  />
                  <path className="fill-white" d="M225 3v65h-9.5V3h9.5z" />
                  <path
                    className="fill-white"
                    d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
                  />
                  <path
                    className="fill-white"
                    d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"
                  />
                </svg>
              ) : (
                <VscLoading className="animate-spin text-white text-heading-6" />
              )}
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-interactive-light-disabled text-button uppercase"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
