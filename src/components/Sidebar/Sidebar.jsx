import React, { useContext, useState } from "react";
// import logo from "./../../assets/images/logo2.webp";
// import search from "./../../assets/icons/navbar/search.webp";
import logout from "./../../assets/icons/navbar/logout.webp";
import NavItem from "../NavItem/NavItem";
import profile from "./../../assets/images/profile.png";
import logo from "./../../assets/images/logo2.webp";

import { imageDomain, navItem } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import ReactGA from "react-ga4";

const Sidebar = () => {
  const [hovered, setHovered] = useState(false);
  const {
    setProfileData,
    userData,
    logoutTime,
    setUserData,
    loginTime,
    setLogoutTime,
  } = useContext(ProfileContext);
  // console.log(userData);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    // document
    //   .getElementById("search")
    //   .classList.add("bg-surface-white-surface-1");
    setHovered(true);
  };

  const handleMouseLeave = () => {
    // document
    //   .getElementById("search")
    //   .classList.remove("bg-surface-white-surface-1");

    setTimeout(() => setHovered(false), 500);
  };

  const handleLogout = () => {
    setProfileData({});
    setUserData({});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");

    setLogoutTime(Date.now());
    sendTimeSpentToAnalytics((Date.now() - loginTime) / 1000);
  };

  const sendTimeSpentToAnalytics = (duration) => {
    ReactGA.event({
      category: "User",
      action: "Time Spent After Login",
      value: Math.round(duration), // Duration in seconds
    });
  };

  const logicalNavItems = userData.yearlyPlanEndDate
    ? navItem.filter(
        ({ text }) => text !== "Plans" && text !== "Yearly Plan Request"
      )
    : navItem.filter(({ text }) => text !== "Song Upload");
  console.log(logicalNavItems);

  return (
    <aside
      className="fixed top-0 left-0 h-screen shadow-lg p-2 bg-[#000] w-[15%] transition-all duration-500 overflow-hidden overflow-y-auto hidden xl:flex xl:flex-col xl:justify-between z-[9999]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* <section></section> */}
      <section>
        {/* <Link to={"/"}>
          <img src={logo} alt="logo" id="navbarLogo" className="w-fit h-fit" />
        </Link> */}

        {/* <div className="mt-4 flex items-center justify-center flex-col">
          <div className="relative w-full">
            <input
              type="text"
              className="border-[1px] border-surface-white-line rounded-[4px] w-full h-[40px] pl-[38px] focus-within:outline-none"
              id="search"
              name="search"
              placeholder="Search Here..."
            />
            <img
              src={search}
              alt=""
              className="absolute top-0 bottom-0 left-1 m-auto"
            />
          </div>
        </div> */}
        <a
          className="inline-block w-7 lg:w-2/12"
          href={"https://forevisiondigital.com/"}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={logo}
            alt="logo"
            id="navbarLogo"
            className="w-auto max-w-[75%] lg:max-w-[150px] h-auto"
          />
        </a>

        <div className="mt-4 flex flex-col gap-2 whitespace-nowrap text-white">
          {logicalNavItems.map((props, key) => (
            <NavItem {...props} key={key} hovered={hovered} />
          ))}
        </div>
      </section>

      <div className="mb-0 border-t-[1px] border-surface-white-line pt-[20px] flex items-center gap-1 text-white">
        {userData?.display_image ? (
          <img
            src={userData?.display_image}
            className="rounded-full w-[40px] aspect-square object-cover"
            alt="profile"
          />
        ) : (
          <img
            className={`w-[40px] aspect-square object-cover`}
            src={profile}
            alt="Demo"
          />
        )}
        <>
          <Link to={"/profile"} className="overflow-hidden whitespace-nowrap">
            <h1 className="text-subtitle-1-bold">
              {userData?.first_name + " " + userData?.last_name}
            </h1>
            <p className="text-button">
              {userData?.user_email || userData?.emailId}
            </p>
          </Link>
          {/* <div className="overflow-hidden whitespace-nowrap">
            <h1 className="text-subtitle-1-bold">
              {userData?.first_name + " " + userData?.last_name}
            </h1>
            <p className="text-button">
              {userData?.user_email || userData?.emailId}
            </p>
          </div> */}
          {/* <img
              src={logout}
              alt=""
              className="ml-auto cursor-pointer w-2 h-2"
              onClick={handleLogout}
            /> */}

          <MdLogout className="ml-auto cursor-pointer" onClick={handleLogout} />
        </>
      </div>
    </aside>
  );
};

export default Sidebar;
