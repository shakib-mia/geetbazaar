import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import profile from "./../../assets/images/profile-baul.webp";
import { RiDeleteBinFill } from "react-icons/ri";
import { ProfileContext } from "../../contexts/ProfileContext";
import { backendUrl } from "../../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const LoginUser = ({ firstName, lastName, display_image, name, email }) => {
  const [error, setError] = React.useState(false);
  const {
    loggedInUsers,
    setLoggedInUsers,
    setToken,
    setUserData,
    setLoginTime,
  } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //   console.log(email);

  useEffect(() => {
    if (!display_image) return; // যদি display_image না থাকে fetch করবেন না

    axios
      .get(display_image)
      .then(() => setError(false)) // ইমেজ ঠিক আছে, error false করে দিবে
      .catch(() => setError(true)); // ইমেজ নেই বা error, true করে দিবে
  }, [display_image]);

  const handleDeleteSavedUser = (e) => {
    e.stopPropagation();
    // const users = JSON.parse(localStorage.getItem("users")) || [];
    const filteredUsers = loggedInUsers.filter((user) => user.email !== email);
    // console.log(filteredUsers);
    setLoggedInUsers(filteredUsers);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
  };

  const handleLoginWithEmail = () => {
    setLoading(true);
    axios
      .get(`${backendUrl}handle-firebase-login/${email}`)
      .then(({ data }) => {
        if (data?.token) {
          sessionStorage.setItem("token", data.token);
          setToken(data.token);
          setLoginTime(Date.now());
          setUserData(data.details || { user_email: email });
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => toast.error(err.response?.data?.message));
  };

  return (
    <div
      className="border p-2 rounded flex backdrop-blur-lg flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 text-white gap-2 relative"
      onClick={handleLoginWithEmail}
    >
      {loading && (
        <div className="absolute inset-0 bg-black/50 flex justify-center items-center rounded">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
        </div>
      )}
      <FaTimes
        className="absolute right-1 top-1 text-white"
        onClick={handleDeleteSavedUser}
      />
      <img
        src={error || !display_image ? profile : display_image}
        alt={name}
        className="w-7 rounded-full aspect-square object-cover"
      />
      <p>
        {firstName} {lastName}
      </p>
    </div>
  );
};

export default LoginUser;
