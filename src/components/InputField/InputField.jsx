import React, { forwardRef, useEffect, useState } from "react";
import styles from "./inputfield.module.css"; // Import the CSS module

const InputField = forwardRef((props, ref) => {
  const {
    label,
    placeholder,
    id,
    type = "text", // Default to "text" if type is not provided
    onChange,
    value,
    required,
    containerClassName = "",
    fieldClassName = "",
    disabled,
    ...rest
  } = props;

  const [focused, setFocused] = useState(false);
  // console.log(type);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(value?.length);
  // console.log(focused);

  return (
    <div className={`relative mb-3 ${props.parentClassName}`}>
      <div className={`${styles.inputContainer} ${containerClassName}`}>
        {props.textarea ? (
          <textarea
            ref={ref}
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`${styles.inputField} ${fieldClassName}`}
            required={required}
            {...rest}
          />
        ) : (
          <input
            ref={ref}
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`${styles.inputField} ${fieldClassName}`}
            required={required}
            {...rest}
          />
        )}
        {label && (
          <label
            htmlFor={id}
            className={`${styles.label} ${
              focused ||
              type === "date" ||
              type === "file" ||
              type === "checkbox" ||
              disabled ||
              value?.toString()?.length
                ? styles.focused
                : ""
            } ${type === "checkbox" ? "static" : "absolute"}`}
          >
            {label}
          </label>
        )}
      </div>
      <div
        className={`${
          type !== "file" && "absolute -bottom-2"
        } text-right right-0 text-white-deactivated text-button ${
          props.noteClassName
        }`}
      >
        {props.note}
      </div>
    </div>
  );
});

export default InputField;
