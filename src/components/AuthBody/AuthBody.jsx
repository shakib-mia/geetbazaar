import React from "react";
import { Link, useLocation } from "react-router-dom";
import bg from "./../../assets/images/cover.png";

const AuthBody = ({
  heading,
  altDescription,
  altText,
  altLink,
  children,
  onSubmit,
  id,
  onChange,
  className,
  closeIcon,
  handleClose,
  whiteContainerClass,
}) => {
  const location = useLocation();

  return (
    // <div className="">
    <form
      onSubmit={onSubmit}
      onChange={onChange}
      className={`h-screen w-screen bg-no-repeat bg-cover ${className}`}
      id={id}
      style={{
        backgroundImage:
          location.pathname === "/profile" ||
          location.pathname === "/all-songs" ||
          location.pathname === "/home" ||
          location.pathname === "/" ||
          `url(${bg})`,
      }}
    >
      <div
        className="flex flex-col xl:flex-row items-center justify-center h-full w-full backdrop-blur-sm"
        onClick={handleClose}
      >
        {location.pathname === "/profile" ||
          location.pathname === "/all-songs" ||
          location.pathname === "/home" ||
          location.pathname === "/" || <div className="w-1/2"></div>}
        <div
          className={`w-11/12 xl:w-1/3 shadow-md xl:shadow-xl p-3 rounded-[22px] bg-black text-white relative ${whiteContainerClass}`}
          onClick={(e) => e.stopPropagation()}
        >
          {closeIcon && (
            <button
              type="button"
              className={`${
                whiteContainerClass && whiteContainerClass.includes("overflow")
                  ? "right-1 top-1"
                  : "-right-3 -top-3"
              } absolute text-heading-5 bg-white w-4 h-4 rounded-full flex items-center justify-center text-interactive-light-destructive`}
              onClick={handleClose}
            >
              &times;
            </button>
          )}
          <div className="w-full flex justify-between items-center pb-2">
            <h5 className="text-heading-5-bold">{heading}</h5>
            <p className="text-paragraph-1 hidden xl:block">
              {altDescription}{" "}
              <Link
                to={altLink}
                className="text-interactive-light hover:text-interactive-light-hover"
              >
                {altText}
              </Link>
            </p>
          </div>
          {children}

          <p className="text-paragraph-1 xl:hidden text-center xl:text-left">
            {altDescription}{" "}
            <Link
              to={altLink}
              className="text-interactive-light hover:text-interactive-light-hover"
            >
              {altText}
            </Link>
          </p>
        </div>
      </div>
    </form>
    // </div>
  );
};

export default AuthBody;
