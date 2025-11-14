import React from "react";

const Button = (props) => {
  const {
    text,
    type = "button",
    disabled,
    onClick,
    children,
    className = "",
    variant = "interactive-light", // default variant
    styleType = "solid", // "solid" | "outlined"
    ...rest
  } = props;
  const baseClasses = `
    w-full mt-2 py-2 rounded-lg font-extrabold
    flex justify-center items-center gap-1
    transition 
    hover:shadow-none disabled:shadow-none
    disabled:cursor-not-allowed
  `;

  // Solid style
  const solidClasses = `
    bg-${variant}
    hover:bg-${variant}-hover
    active:bg-${variant}-active
    focus:bg-${variant}-focus
    text-white
    disabled:bg-${variant}-disabled
    disabled:text-black disabled:text-opacity-70
  `;

  // Outlined style
  const outlinedClasses = `
    border-2 border-gray-dark
    text-${variant}
    bg-transparent
    hover:bg-interactive-light-disabled
    disabled:border-${variant}-disabled
    disabled:text-${variant}-disabled
  `;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${
        styleType === "outlined" ? outlinedClasses : solidClasses
      } ${className}`}
      {...rest}
    >
      {children || text}
    </button>
  );
};

export default Button;
