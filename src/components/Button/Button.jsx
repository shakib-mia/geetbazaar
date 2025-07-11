import React, { useState } from "react";
import arrow from "../../assets/icons/arrow.svg";

const Button = ({
  text,
  id,
  type,
  disabled,
  onClick,
  leftIcon,
  rightIcon,
  small,
  paddingZero,
  containerClassName,
  className,
  children,
  onFocus,
  onBlur,
  borderColor = "border-white", // Default color
  title,
  variant,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    // <>
    //   {type !== "submit" && (
    //     <div
    //       className={`border-[2px] ${containerClassName} ${
    //         focus && !disabled ? borderColor : "border-transparent"
    //       } rounded-full ${paddingZero ? "p-0" : "p-[4px]"}`}
    //     >
    //       <button
    //         title={title}
    //         id={id}
    //         className={`${
    //           small ? "px-2 py-1 w-fit mx-auto" : "px-3 py-2"
    //         } disabled:bg-interactive-light-disabled disabled:cursor-not-allowed text-white bg-interactive-light text-button hover:bg-interactive-light-hover focus:bg-interactive-light-focus active:bg-interactive-light-active focus:outline outline-offset-4 outline-2 outline-interactive-light-focus font-bold rounded-full uppercase flex gap-1 disabled:text-grey ${className} transition`}
    //         onClick={() => {
    //           onClick && onClick();
    //           setFocus(true);
    //         }}
    //         disabled={disabled}
    //         type={type}
    //         onFocus={() => {
    //           setFocus(true);
    //           onFocus && onFocus();
    //         }}
    //         onBlur={() => {
    //           setFocus(false);
    //           onBlur && onBlur();
    //         }}
    //       >
    //         {leftIcon && (
    //           <img src={arrow} className="rotate-180" alt="left-icon" />
    //         )}
    //         {text && <div>{text}</div>}
    //         {children}
    //         {rightIcon && <img src={arrow} alt="right-icon" />}
    //       </button>
    //     </div>
    //   )}

    //   {type === "submit" && (
    //     <div
    //       className={`border-[2px] cursor-pointer inline-block ${containerClassName} ${
    //         focus && !disabled ? borderColor : "border-transparent"
    //       } rounded-full p-[4px]`}
    //     >
    //       <input
    //         title={title}
    //         type="submit"
    //         disabled={disabled}
    //         onFocus={() => setFocus(true)}
    //         onBlur={() => setFocus(false)}
    //         className={`${
    //           small ? "px-2 py-1" : "px-3 py-2"
    //         } disabled:bg-interactive-light-disabled cursor-pointer disabled:cursor-not-allowed text-white bg-interactive-light text-button hover:bg-interactive-light-hover focus:bg-interactive-light-focus active:bg-interactive-light-active focus:outline outline-offset-4 outline-2 outline-interactive-light-focus font-bold rounded-full uppercase flex gap-1 disabled:text-grey ${className} transition`}
    //         value={text}
    //       />
    //     </div>
    //   )}
    // </>

    <button
      type={type}
      className={`w-full mt-2 shadow-black ${
        variant ? "bg-interactive-light-" + variant : "bg-interactive-light"
      } disabled:bg-interactive-light-${
        variant ? variant + "-" : ""
      }disabled py-2 rounded-lg hover:bg-interactive-light${
        variant ? "-" + variant : ""
      }-hover shadow-[0_8px_16px] disabled:shadow-none disabled:cursor-not-allowed hover:shadow-none shadow-interactive-light-${
        variant ? variant + "-" : ""
      }focus transition font-extrabold disabled:hover:bg-interactive-light-${
        variant ? variant + "-" : ""
      }disabled disabled:text-black disabled:text-opacity-70 text-white flex justify-center items-center gap-1 ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children || text}
    </button>
  );
};

export default Button;
