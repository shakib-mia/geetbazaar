import React, { useContext, useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProfileContext } from "../../contexts/ProfileContext";
import { toast } from "react-toastify";
import { backendUrl } from "../../constants";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import bg from "../../assets/images/login-bg.jpg";
import AuthSlider from "../../components/AuthSlider/AuthSlider";
// import * as ReactOwlCarousel from "react-owl-carousel";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  // const location = useLocation();
  const navigate = useNavigate();
  const { setUId, setUserData, userData, setToken } =
    useContext(ProfileContext);
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  // console.log(location.pathname);
  useEffect(() => {
    if (user) {
      console.log(user);
      setUserData({
        ...userData,
        user_email: user.user.email,
        last_name:
          user.user.displayName.split(" ")[
            user.user.displayName.split(" ").length - 1
          ],

        first_name: user.user.displayName
          .split(" ")
          .slice(0, user.user.displayName.split(" ").length - 1),
      });
      // console.log(userData);

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

      axios.post(backendUrl + "user-signup", signupData).then(({ data }) => {
        if (data.acknowledged) {
          setUId(data.insertedId);
          // console.log(signupData.email);
          toast.success("Signup Successful. Please Login Now.");
          setUserData({ ...userData, user_email: signupData.email });
          navigate("/signup-details");
        }
      });
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

    // axios.post("https://beta.forevisiondigital.com/admin/api/userRegistration", formData).then(res => {
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
    <div className="flex justify-center items-center min-h-screen text-black min-w-[100vw] absolute left-0 bg-center bg-cover bg-no-repeat">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto rounded-lg overflow-hidden shadow-[0_10px_12px] shadow-[#000]">
        <aside className="p-1">
          <AuthSlider />
          {/* <ReactOwlCarousel
            items={1}
            className="h-full !hidden lg:!block auth-slider"
            autoplay
            autoplayTimeout={3000}
            loop
            dots={true}
            mouseDrag={false} // disables mouse swiping
            touchDrag={false} // disables touch swiping
            pullDrag={false} // disables pull drag behavior
          >
            <img
              src={bg}
              alt="background"
              className="hidden lg:block !w-full !h-full object-cover object-[7%] rounded-md"
            />

            <img
              src={bg}
              alt="background"
              className="hidden lg:block !w-full !h-full object-cover object-[7%] rounded-md"
            />

            <img
              src={bg}
              alt="background"
              className="hidden lg:block !w-full !h-full object-cover object-[7%] rounded-md"
            />
          </ReactOwlCarousel> */}
        </aside>
        <div className="p-4">
          <div className="flex justify-between items-end">
            <h4 className="text-heading-5-bold lg:text-left lg:text-heading-4-bold font-bold text-center text-blue-400 lg:whitespace-nowrap">
              Welcome to GeetBazaar 👋
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
              <InputField {...props} key={id} containerClassName="mt-3" />
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
  );
};

export default SignUp;
