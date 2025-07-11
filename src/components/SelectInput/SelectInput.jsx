import React, { useState } from "react";
import checkmark from "./../../assets/icons/checkmark.webp";

const SelectInput = ({ id, item }) => {
  const [checked, setChecked] = useState(item.selected);
  // const [selectedInput, setSelectedInput] = useState([])
  // console.log(item);
  // console.log(item);

  const handleChange = (itemChecked) => {
    setChecked(itemChecked);
    // console.log(item);
    // if (item.selected) {
    item.selected = itemChecked;
    // }
  };

  // console.log(item.text);

  return (
    <div className="flex gap-1 items-center my-1" key={id}>
      <input
        type="checkbox"
        id={item.name + "_" + id}
        name={item.name}
        className="hidden"
        onChange={(e) => handleChange(e.target.checked)}
      />
      <div
        className={`border w-2 h-2 flex items-center justify-center ${
          checked && "border-primary-light"
        }`}
      >
        {checked && <img src={checkmark} className="w-full" alt="" />}
      </div>
      <label
        htmlFor={item.name + "_" + id}
        className={`cursor-pointer mb-0 ${
          item?.text?.length > 20 && "lg:w-5/6"
        }`}
      >
        {item.text}
      </label>
    </div>
  );
};

export default SelectInput;
