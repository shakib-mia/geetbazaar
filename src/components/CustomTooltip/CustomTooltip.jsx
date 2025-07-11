import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const bgColor = payload[0]?.color || "#2B52DD"; // fallback color

    return (
      <div
        style={{
          backgroundColor: bgColor,
          color: "#fff",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <p>{`${label}`}</p>
        {payload.map((item, index) => (
          <p key={index}>{`${item.value.toFixed(2)}`}</p>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
