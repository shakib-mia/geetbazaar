import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ProfileContext } from "../../contexts/ProfileContext";
import { navItem } from "../../constants";
import { MdLogout, MdMenu, MdClose } from "react-icons/md";
import { FaBell, FaCaretDown, FaRegUserCircle } from "react-icons/fa";
import logo from "../../assets/images/logo_black.png";
import profile from "./../../assets/images/profile.png";
import ReactGA from "react-ga4";
import NotificationDropdown from "../NotificationDropdown/NotificationDropdown";
import { RiTokenSwapLine } from "react-icons/ri";
import axios from "axios";

const Navbar = () => {
  const {
    setProfileData,
    userData,
    setUserData,
    loginTime,
    setLogoutTime,
    dollarRate,
  } = useContext(ProfileContext);
  const { pathname } = window.location;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [rightDropdownOpen, setRightDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownMenuRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Ensure that the click is outside the main dropdown and any nested dropdowns
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) && // Outside the main dropdown
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target) // Outside the nested dropdown
      ) {
        setDropdownOpen(false); // Close the main dropdown
        // setNestedDropdownOpen(false); // Close any nested dropdowns
      }
    };

    // Add event listener to detect mouse clicks
    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      // Cleanup event listener when the component is unmounted
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []); // Empty dependency array to run once on mount and unmount

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const logicalNavItems = userData.yearlyPlanEndDate
    ? navItem.filter(
        ({ text }) => text !== "Plans" && text !== "Yearly Plan Request"
      )
    : navItem.filter(({ text }) => text !== "Song Upload");

  // const activePage =
  //   navItem.find((item) => item.path === pathname) ||
  //   navItem
  //     .flatMap((item) => item.dropdownItem || [])
  //     .find((dropdown) => dropdown.dropdownPath === pathname) ||
  //   {};

  const sendTimeSpentToAnalytics = (duration) => {
    ReactGA.event({
      category: "User",
      action: "Time Spent After Login",
      value: Math.round(duration),
    });
  };

  const handleLogout = () => {
    setProfileData({});
    setUserData({});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    // navigate("/login");
    window.location.href = "/login";

    setLogoutTime(Date.now());
    sendTimeSpentToAnalytics((Date.now() - loginTime) / 1000);
  };

  // Simulate a fetch for notifications (you can replace it with an actual API call)
  // useEffect(() => {
  //   setNotifications([
  //     { id: 1, message: "New message received" },
  //     { id: 2, message: "Your plan has been updated" },
  //     { id: 3, message: "Payment processed successfully" },
  //   ]);
  // }, []);

  // console.log(
  //   userData?.lifetimeRevenue?.toFixed(2),
  //   userData?.lifetimeDisbursed?.toFixed(2),
  //   userData?.tokenized || 0
  // );

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  useEffect(() => {
    if (!userData?.display_image) return; // যদি userData?.display_image না থাকে fetch করবেন না

    axios
      .get(userData?.display_image)
      .then(() => setError(false)) // ইমেজ ঠিক আছে, error false করে দিবে
      .catch(() => setError(true)); // ইমেজ নেই বা error, true করে দিবে
  }, [userData?.display_image]);

  return (
    <>
      <div
        className="fixed top-2 rounded-lg lg:shadow-lg container lg:px-0 left-0 right-0 lg:mx-auto bg-white text-grey-dark bg-opacity-70 backdrop-blur z-[99999]"
        id="topbar"
        onMouseLeave={() => setRightDropdownOpen(false)}
      >
        <nav className="flex flex-wrap lg:flex-nowrap items-center justify-between px-2">
          <div className="flex justify-between items-center w-full lg:w-auto">
            <Link className="inline-block py-1  text-heading-6" to={"/"}>
              <img src={logo} alt="logo" className="w-[150px]" />
            </Link>

            {/* Mobile menu button */}
            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className=" text-heading-4"
              >
                {mobileMenuOpen ? <MdClose /> : <MdMenu />}
              </button>
            </div>
          </div>

          {/* Mobile dropdown for profile */}
          {rightDropdownOpen && (
            <div className="absolute right-4 top-4 w-[200px] bg-gray-800  shadow-lg rounded-lg z-50 lg:hidden">
              <div className="px-4 py-2">
                <p className="text-sm">
                  {userData?.first_name + " " + userData?.last_name}
                </p>
                <p className="text-xs text-gray-400">
                  {userData?.user_email || userData?.emailId}
                </p>
              </div>
              <div className="border-t border-gray-700">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-700"
                >
                  Logout <MdLogout className="inline-block" />
                </button>
              </div>
            </div>
          )}

          {/* Navigation menu - responsive */}
          <div
            className={`${
              mobileMenuOpen ? "flex" : "hidden"
            } lg:flex flex-col lg:flex-row w-full lg:w items-start lg:items-center justify-between lg:w-[65%]`}
          >
            {/* Nav Items */}
            <div className="flex flex-col lg:flex-row w-full lg:w-auto items-start lg:items-center lg:h-auto overflow-y-auto lg:overflow-y-visible divide-y lg:divide-y-0 divide-interactive-light-disabled">
              {logicalNavItems.map((item) => (
                <div key={item.path} className="relative w-full lg:w-auto">
                  {item.text === "Forms" ? (
                    <button
                      className="flex items-center p-2 lg:py-4 gap-1  w-full lg:w-auto group"
                      onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle the dropdown
                      ref={dropdownRef} // Attach the ref here
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span className="overflow-hidden transition-all whitespace-nowrap relative text-heading-6">
                          {item.text}
                        </span>
                        <FaCaretDown />
                      </span>
                    </button>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={` px-2 py-2 lg:py-2 flex items-center group w-full lg:w-auto gap-1 transition-all`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span>{item.icon}</span>
                      <span className="overflow-hidden group-hover:w-full transition-all whitespace-nowrap relative text-heading-6">
                        {item.text}
                      </span>
                    </NavLink>
                  )}
                  {dropdownOpen && (
                    <ul
                      className="bg-white shadow-lg rounded-lg lg:absolute lg:left-0 lg:mt-2 lg:w-[15rem] w-full"
                      ref={dropdownMenuRef}
                    >
                      {item.dropdownItem?.map((subItem) => (
                        <li
                          key={subItem.dropdownPath}
                          className="hover:bg-gray-700 transition hover:text-white"
                        >
                          <NavLink
                            to={subItem.dropdownPath}
                            className="px-2 py-1 block w-full"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent the dropdown from closing when clicking on a link
                            }}
                          >
                            {subItem.text}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Profile Section */}
            <div className="hidden lg:flex items-center gap-2">
              {/* <NotificationDropdown
                notificationDropdownOpen={notificationDropdownOpen}
                setNotificationDropdownOpen={setNotificationDropdownOpen}
              /> */}
              <button
                onClick={() =>
                  setNotificationDropdownOpen(!notificationDropdownOpen)
                }
                className="flex items-center  relative z-20"
              >
                <span className="text-[20px]">
                  <FaBell />
                </span>
                {unreadCount > 0 && (
                  <span className="absolute -top-[4px] -right-[4px] text-[12px]  bg-red-500 rounded-full w-2 h-2 text-center inline-flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              <div className="flex gap-1 items-center">
                <Link
                  to={"/accounts"}
                  className="hover:bg-interactive-light hover:shadow-[0_0_20px] hover:text-white transition hover:shadow-interactive-light px-1 py-[4px] rounded text-subtitle-1"
                >
                  <span className="italic">
                    {userData.billing_country === "India" ? "₹" : "$"}
                    {userData.billing_country === "India"
                      ? (
                          parseFloat(
                            userData?.lifetimeRevenue?.toFixed(2) || 0
                          ) -
                          (parseFloat(
                            userData?.lifetimeDisbursed?.toFixed(2) || 0
                          ) +
                            (userData?.tokenized || 0))
                        ).toFixed(2) || 0
                      : (
                          (parseFloat(
                            userData?.lifetimeRevenue?.toFixed(2) || 0
                          ) -
                            (parseFloat(
                              userData?.lifetimeDisbursed?.toFixed(2) || 0
                            ) +
                              (userData?.tokenized || 0))) *
                          dollarRate
                        ).toFixed(2) || 0}
                  </span>
                </Link>
                <span className="flex gap-[4px] items-center">
                  <RiTokenSwapLine /> {userData?.tokenized?.toFixed(2) || 0}
                </span>
              </div>
              <div
                ref={dropdownMenuRef}
                onMouseEnter={() => setRightDropdownOpen(true)}
              >
                {!error && userData?.display_image ? (
                  <img
                    src={userData?.display_image || profile}
                    className="rounded-full w-[40px] aspect-square object-cover cursor-pointer"
                    alt="profile"
                  />
                ) : (
                  <FaRegUserCircle className="text-gray-400 text-heading-5 w-full h-full" />
                )}
                {rightDropdownOpen && (
                  <div
                    className="absolute right-0 mt-0 w-[250px] bg-white backdrop-blur shadow-lg rounded-t-none rounded-lg overflow-hidden"
                    style={{
                      top:
                        document.getElementById("topbar").clientHeight + "px",
                    }}
                  >
                    {/* <div className="w-1 h-1 border-t border-r border-gray-800 absolute -top-[4px] -rotate-45 right-1"></div> */}
                    <div
                      onClick={() => navigate("/profile")}
                      className="p-2 cursor-pointer relative"
                    >
                      <p className="text-heading-6 font-semibold">
                        {userData?.first_name + " " + userData?.last_name}
                      </p>
                      <p className="text-button">
                        {userData?.user_email || userData?.emailId}
                      </p>
                    </div>
                    <div className="border-t border-gray-700">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-2 py-2 text-interactive-light-destructive hover:text-white hover:bg-interactive-light-destructive"
                      >
                        Logout <MdLogout className="inline-block" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* {notificationDropdownOpen && ( */}
      <>
        <NotificationDropdown
          notificationDropdownOpen={notificationDropdownOpen}
          setNotificationDropdownOpen={setNotificationDropdownOpen}
          setNotifications={setNotifications}
          notifications={notifications}
        />
      </>
      {/* )} */}
    </>
  );
};

export default Navbar;
