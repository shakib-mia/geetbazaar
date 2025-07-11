import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaWpforms, FaCrown, FaHome, FaMoneyBillWave } from "react-icons/fa"; // Icon for "Revenue"
import { BsFileMusicFill, BsUpload } from "react-icons/bs";
import { GoTag } from "react-icons/go"; // Icon for "Plans"
import { LiaItunesNote } from "react-icons/lia";
// import { LuUserCheck2 } from "react-icons/lu";
import { IoMenuOutline } from "react-icons/io5"; // Hamburger icon
import { ProfileContext } from "../../contexts/ProfileContext";
import { MdLogout } from "react-icons/md";
import { BiUserCheck } from "react-icons/bi";

const BottomBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formsDropdownOpen, setFormsDropdownOpen] = useState(false);
  const { setProfileData, setToken } = useContext(ProfileContext);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleFormsDropdown = () => setFormsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    setProfileData({});
    setToken("");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    // {
    //   icon: <FaWpforms className="text-[24px]" />,
    //   text: "Forms",
    //   dropdownItem: [
    //     { dropdownPath: "/promotional-tool", text: "Promotional Tool" },
    //     { dropdownPath: "/youtube-oac", text: "YouTube OAC" },
    //     {
    //       dropdownPath: "/youtube-claim-release",
    //       text: "YouTube Claim Release",
    //     },
    //     {
    //       dropdownPath: "/link-facebook-and-instagram-profile-with-songs",
    //       text: "Link Facebook & Instagram Profiles with Songs",
    //     },
    //     {
    //       dropdownPath: "/facebook-insta-whitelisting",
    //       text: "Facebook & Instagram Whitelisting",
    //     },
    //     {
    //       dropdownPath: "/youtube-video-takedown",
    //       text: "YouTube Video Takedown",
    //     },
    //   ],
    // },
    {
      icon: <BsUpload className="text-heading-6" />,
      text: "Song Upload",
      path: "/song-upload",
    },
    {
      icon: <FaMoneyBillWave className="text-2xl text-white" />, // Updated to Revenue
      text: "Revenue",
      path: "/revenue",
    }, // Updated Revenue NavLink
    {
      icon: <LiaItunesNote className="text-heading-6 text-center" />,
      text: "My Releases",
      path: "/all-songs",
    },
    {
      icon: <FaCrown className="text-heading-6 text-yellow-300" />,
      text: "Yearly Plan Request",
      path: "/yearly-plan",
    },
    {
      icon: <BiUserCheck className="text-heading-6 text-yellow-300" />,
      text: "KYC",
      path: "/kyc",
    },
    {
      icon: (
        <BsFileMusicFill className="text-heading-6 !text-white text-center" />
      ),
      text: "CRBT Codes",
      path: "/crbt-codes",
    },
    {
      icon: <MdLogout className="text-2xl text-white" />,
      text: "Logout",
      action: handleLogout, // Add this action to call handleLogout when clicked
    },
  ];

  return (
    <nav
      className="fixed bottom-0 z-[99999] px-1 shadow w-screen bg-black text-white flex justify-center xl:hidden py-2"
      id="bottomBar"
    >
      {/* Left side: Home, Plans, and Hamburger */}
      <div className="flex w-2/5 items-center justify-around">
        {/* Hamburger Menu to toggle dropdown */}
        <div
          className="w-1/5 flex justify-center flex-col items-center px-1 gap-[4px] cursor-pointer relative"
          onClick={toggleDropdown}
        >
          <IoMenuOutline className="text-2xl text-white" />
          <h2 className="text-paragraph-2">Menu</h2>
        </div>

        <NavLink
          to="/"
          className="w-1/5 flex justify-center flex-col items-center px-1 gap-[4px]"
        >
          <FaHome className="text-2xl text-white" />
          <h2 className="text-paragraph-2">Home</h2>
        </NavLink>

        <NavLink
          to="/plans"
          className="w-1/5 flex justify-center flex-col items-center px-1 gap-[4px]"
        >
          <GoTag className="text-2xl text-white" />
          <h2 className="text-paragraph-2">Plans</h2>
        </NavLink>
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute bottom-[60px] bg-white shadow-[0_-10px_20px_0_#ddd] rounded-md py-2 w-full text-center">
          {navItems.map(({ icon, text, path, dropdownItem, action }, key) => (
            <div
              key={key}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {dropdownItem ? (
                <div className="cursor-pointer" onClick={toggleFormsDropdown}>
                  <div className="flex items-center gap-2">
                    {icon} {text}
                  </div>
                  {/* Forms Dropdown */}
                  {formsDropdownOpen && (
                    <div className="ml-4 mt-2 bg-gray-50 rounded-md shadow-md">
                      {dropdownItem.map((item, subKey) => (
                        <NavLink
                          to={item.dropdownPath}
                          className="w-full gap-1 px-4 py-2 hover:bg-gray-200 text-white flex items-center"
                          key={subKey}
                          onClick={() => setDropdownOpen(false)}
                        >
                          <span className="inline-block rounded-full w-[2px] h-[2px] bg-black"></span>{" "}
                          {item.text}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : action ? (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    action();
                    setDropdownOpen(false); // Close the dropdown after logout
                  }}
                >
                  {icon} {text}
                </div>
              ) : (
                <NavLink
                  to={path}
                  className="flex items-center gap-2"
                  onClick={() => setDropdownOpen(false)}
                >
                  {icon}
                  {text}
                </NavLink>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default BottomBar;
