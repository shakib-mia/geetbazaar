import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
// import bg from "../../assets/images/login-bg.jpg";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import AuthSlider from "../../components/AuthSlider/AuthSlider";
// import * as ReactOwlCarousel from "react-owl-carousel";
import loginBg from "../../assets/images/loginbg.jpg";
import logo from "../../assets/images/logo_white.png";
import LoginUsers from "../../components/LoginUsers/LoginUsers";
import meta from "../../assets/images/platforms/meta.png";
import youtube from "../../assets/images/platforms/youtube.png";
import spotify from "../../assets/images/platforms/spotify.png";
import appleMusic from "../../assets/images/platforms/apple-music.png";
import { VscLoading } from "react-icons/vsc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [signInWithGoogle, user, googleLoading] = useSignInWithGoogle(auth);
  const { setToken, setUserData, setLoginTime } = useContext(ProfileContext);

  useEffect(() => {
    if (user) {
      const email = user.user.email;
      axios
        .get(`${backendUrl}handle-firebase-login/${email}`)
        .then(({ data }) => {
          if (data?.token) {
            sessionStorage.setItem("token", data.token);
            setToken(data.token);
            setLoginTime(Date.now());
            setUserData(data.details || { user_email: email });
            navigate("/");
          }
        })
        .catch((err) => toast.error(err.response?.data?.message));
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}user-login`, {
        email,
        password,
      });
      if (data?.token) {
        sessionStorage.setItem("token", data.token);
        setToken(data.token);
        setLoginTime(Date.now());
        setUserData(data.details || { user_email: email });
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const users = JSON.parse(localStorage.getItem("users"));

  return (
    <>
      <div className="max-w-6xl absolute top-0 left-0 z-[9999] mx-auto right-0 pt-2 flex justify-between">
        <img src={logo} className="w-[300px]" alt="" />
      </div>
      <div
        className="flex justify-center items-center min-h-screen text-black min-w-[100vw] absolute left-0 bg-center bg-cover bg-no-repeat"
        id="login-page"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        {/* <div className="absolute top-0 left-0 w-screen h-screen z-0">
        <AuthSlider />
        </div> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl my-7 lg:my-0 px-1 gap-2">
          <aside className="text-grey-dark">
            <div className="flex items-center">
              <h4 className="text-heading-5 !font-light lg:text-left lg:text-heading-4 text-center text-white">
                Welcome to Dashboard
                {/* 👋 */}
              </h4>
            </div>
            {/* <div className="flex justify-between items-center">
            <aside>
              <h5 className="text-heading-5-bold">Sign in to</h5>
              <img src={logo} className="h-4 mt-2" alt="GeetBazaar" />
            </aside>
          <aside>
              <img src={loginVector} className="animate-bounce h-7" alt="" />
            </aside> 
          </div> */}

            <h6 className="text-heading-6 font-medium mt-1 lg:mt-4">
              Your Earnings, Your Way with GeetCoin
            </h6>
            <p className="text-heading-6 leading-[1.5] mt-4">
              Welcome to the GeetBazaar Dashboard – your all-in-one platform for{" "}
              <i>music</i>, <i>podcasts</i>, and <i>audio stories</i>. Sign in
              to manage your releases, track revenue, and connect with a global
              audience effortlessly. Whether you’re an independent creator or
              part of a label, GeetBazaar ensures you maximize every earning,
              leaving <b>not a single rupee unused</b> – all from a single,
              intuitive dashboard.
            </p>

            <div className="flex gap-4 items-center flex-wrap mt-2">
              <img
                src={spotify}
                className="w-5 aspect-square bg-white rounded-full"
                alt=""
              />
              <img
                src={appleMusic}
                className="w-[155px] object-contain"
                alt=""
              />
              <img src={youtube} className="w-5 aspect-square" alt="" />
              <img src={meta} className="w-5 aspect-square" alt="" />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {users.map((item) => (
                <LoginUsers {...item} />
              ))}
            </div>
          </aside>
          <div className="max-w-md w-full ml-auto overflow-hidden">
            <div
              className="border-2 backdrop-blur-lg bg-black/15 border-white/30 rounded-xl"
              // style={{
              //   borderImage: "linear-gradient(to right, #7F00E1, #FF0080) 1",
              // }}
            >
              <div className="p-4 relative">
                <h5 className="text-heading-5-bold lg:text-left lg:text-heading-5-bold font-bold text-center text-white">
                  Sign in
                  {/* 👋 */}
                </h5>
                <form onSubmit={handleLogin} className="mt-3 lg:mt-3 space-y-3">
                  <InputField
                    type="email"
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required={true}
                    fieldClassName="!text-white !border-none !bg-white/30"
                    labelClassName="!text-white"
                  />

                  <InputField
                    type="password"
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required={true}
                    fieldClassName="!text-white !border-none !bg-white/30"
                    labelClassName="!text-white"
                  />
                  <Button
                    type="submit"
                    disabled={loading || !email.length || !password.length}
                    className="!mt-[2.5rem]"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </form>

                <div className="flex  text-center mt-3 justify-center gap-1 lg:gap-3 flex-col lg:flex-row">
                  <Link
                    to="/signup"
                    className="text-interactive-light-disabled text-button uppercase"
                  >
                    Register
                  </Link>

                  <div className="w-[1px] h-full bg-white"></div>

                  <Link
                    to="/forgot-password"
                    className="text-interactive-light-disabled text-button uppercase"
                  >
                    Reset password
                  </Link>
                </div>

                <div className="flex items-center my-2">
                  <div className="flex-grow border-t border-white-secondary my-2"></div>
                  <span className="px-2 text-white-secondary text-button">
                    OR
                  </span>
                  <div className="flex-grow border-t border-white-secondary my-2"></div>
                </div>

                <button
                  className="flex w-full py-2 border border-interactive-light-disabled rounded-full justify-center items-center group transition hover:bg-interactive-light"
                  onClick={() => {
                    signInWithGoogle();
                  }}
                  // disabled={googleLoading}
                >
                  {!googleLoading ? (
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

                {/* <button className="flex w-full py-2 border border-interactive-light rounded-full justify-center items-center group transition hover:bg-interactive-light mt-3">
            <svg
              viewBox="0 0 62.488 12.094"
              className="w-1/3 h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="matrix(0.076238, 0, 0, 0.076238, -9.869545, -16.954924)">
                <path
                  className="fill-[rgb(24_119_242)] group-hover:fill-white transition"
                  d="M 193.587 247.245 C 183.937 247.245 181.147 251.525 181.147 260.965 L 181.147 276.625 L 206.887 276.625 L 204.307 301.925 L 181.157 301.925 L 181.157 378.705 L 150.267 378.705 L 150.267 301.925 L 129.457 301.925 L 129.457 276.625 L 150.267 276.625 L 150.267 261.395 C 150.267 235.875 160.557 222.395 189.267 222.395 C 195.283 222.381 201.295 222.738 207.267 223.465 L 207.267 247.275 Z"
                />
                <path
                  className="fill-[rgb(24_119_242)] group-hover:fill-white transition"
                  d="M 209.027 324.445 C 209.027 295.925 222.537 274.445 250.847 274.445 C 266.287 274.445 275.717 282.385 280.227 292.245 L 280.227 276.625 L 309.817 276.625 L 309.817 378.705 L 280.227 378.705 L 280.227 363.265 C 275.937 373.135 266.287 380.855 250.847 380.855 C 222.537 380.855 209.027 359.405 209.027 330.855 Z M 239.907 331.315 C 239.907 346.535 245.477 356.615 259.847 356.615 C 272.507 356.615 278.937 347.395 278.937 332.815 L 278.937 322.565 C 278.937 307.985 272.507 298.765 259.847 298.765 C 245.477 298.765 239.907 308.845 239.907 324.065 Z"
                />
                <path
                  className="fill-[rgb(24_119_242)] group-hover:fill-white transition"
                  d="M 374.157 274.475 C 386.157 274.475 397.527 277.055 403.747 281.335 L 396.887 303.215 C 390.453 300.151 383.423 298.539 376.297 298.495 C 359.567 298.495 352.297 308.145 352.297 324.665 L 352.297 330.665 C 352.297 347.185 359.587 356.835 376.297 356.835 C 383.423 356.79 390.453 355.179 396.887 352.115 L 403.747 373.985 C 397.527 378.275 386.167 380.855 374.157 380.855 C 337.907 380.855 321.397 361.335 321.397 330.025 L 321.397 325.305 C 321.397 293.995 337.907 274.475 374.157 274.475 Z"
                />
                <path
                  className="fill-[rgb(24_119_242)] group-hover:fill-white transition"
                  d="M 407.817 331.565 L 407.817 322.565 C 407.817 293.615 424.327 274.565 458.007 274.565 C 489.747 274.565 503.687 293.865 503.687 322.175 L 503.687 338.475 L 438.687 338.475 C 439.337 352.415 445.557 358.635 462.687 358.635 C 474.277 358.635 486.497 356.275 495.507 352.415 L 501.157 373.565 C 493.007 377.865 476.277 381.075 461.487 381.075 C 422.397 381.065 407.817 361.565 407.817 331.565 Z M 438.697 318.265 L 476.017 318.265 L 476.017 315.695 C 476.017 304.545 471.517 295.695 458.017 295.695 C 444.067 295.705 438.697 304.505 438.697 318.225 Z"
                />
                <path
                  className="fill-[rgb(24_119_242)] group-hover:fill-white transition"
                  d="M 618.157 330.885 C 618.157 359.405 604.437 380.885 576.157 380.885 C 560.717 380.885 549.997 373.165 545.707 363.295 L 545.707 378.735 L 516.547 378.735 L 516.547 225.365 L 547.427 222.565 L 547.427 290.765 C 551.927 281.765 561.797 274.465 576.167 274.465 C 604.477 274.465 618.167 295.915 618.167 324.465 Z M 587.277 323.805 C 587.277 309.435 581.707 298.715 566.907 298.715 C 554.247 298.715 547.387 307.715 547.387 322.305 L 547.387 333.025 C 547.387 347.605 554.247 356.615 566.907 356.615 C 581.707 356.615 587.277 345.895 587.277 331.525 Z"
                />
                <path
                  className="fill-[rgb(24_119_242)] group-hover:fill-white transition"
                  d="M 628.487 330.235 L 628.487 325.095 C 628.487 295.705 645.217 274.475 679.317 274.475 C 713.417 274.475 730.157 295.705 730.157 325.095 L 730.157 330.235 C 730.157 359.615 713.427 380.855 679.327 380.855 C 645.227 380.855 628.487 359.615 628.487 330.235 Z M 699.267 322.945 C 699.267 309.435 693.687 298.715 679.267 298.715 C 664.847 298.715 659.317 309.435 659.317 322.945 L 659.317 332.385 C 659.317 345.895 664.897 356.615 679.267 356.615 C 693.637 356.615 699.267 345.895 699.267 332.385 Z"
                />
                <path
                  className="fill-[rgb(24_119_242)] group-hover:fill-white transition"
                  d="M 740.427 330.235 L 740.427 325.095 C 740.427 295.705 757.157 274.475 791.257 274.475 C 825.357 274.475 842.087 295.705 842.087 325.095 L 842.087 330.235 C 842.087 359.615 825.357 380.855 791.257 380.855 C 757.157 380.855 740.427 359.615 740.427 330.235 Z M 811.207 322.945 C 811.207 309.435 805.627 298.715 791.257 298.715 C 776.887 298.715 771.317 309.435 771.317 322.945 L 771.317 332.385 C 771.317 345.895 776.887 356.615 791.257 356.615 C 805.627 356.615 811.207 345.895 811.207 332.385 Z"
                />
                <path
                  className="fill-[rgb(24_119_242)] group-hover:fill-white transition"
                  d="M 884.547 325.305 L 914.997 276.625 L 947.807 276.625 L 915.857 327.025 L 949.097 378.705 L 916.287 378.705 L 884.547 328.705 L 884.547 378.705 L 853.657 378.705 L 853.657 225.365 L 884.547 222.565 Z"
                />
              </g>
            </svg>
          </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
