import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const SelectOptions = ({
  id,
  label,
  onChange,
  options,
  containerClassName = "",
  fieldClassName = "",
  note,
  placeholder,
  required,
  name,
  value,
}) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(value?.length > 0);

  return (
    <div className="relative mt-[24px]">
      <div className="relative flex items-center bg-gray-700 rounded-lg">
        <select
          id={id}
          name={name}
          // value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className={`w-full bg-transparent text-white-deactivated cursor-pointer border-none outline-none p-2 text-base appearance-none ${fieldClassName}`}
        >
          {placeholder && (
            <option disabled selected value="">
              {placeholder}
            </option>
          )}
          {options.map((option, key) => (
            <option
              key={key}
              value={option}
              selected={value === option}
              className="text-black"
            >
              {option}
            </option>
          ))}
        </select>
        <FaChevronDown className="absolute right-4 text-gray-400" />
      </div>
      {/* {label && (
        <label
          htmlFor={id}
          className={`absolute left-4 transform -translate-y-1/2 text-gray-400 transition-all text-base pointer-events-none text-sm -top-[12px]`}
        >
          {label}
        </label>
      )} */}
      {note && (
        <p className="text-right text-sm text-gray-400 text-button">{note}</p>
      )}
    </div>
  );
};

export default SelectOptions;
