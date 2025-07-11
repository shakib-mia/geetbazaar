import React, { useState } from "react";

const RecordLabelCreationMethod = ({ method, setMethod }) => {
  return (
    <>
      <div className="flex mb-4">
        <button
          type="button"
          className={`w-full py-1 ${
            method === "form" ? "border-b-2 border-interactive-light" : ""
          }`}
          onClick={() => setMethod("form")}
        >
          FORM FILL UP
        </button>
        <button
          type="button"
          className={`w-full py-1 ${
            method === "upload" ? "border-b-2 border-interactive-light" : ""
          }`}
          onClick={() => setMethod("upload")}
        >
          UPLOAD PDF
        </button>
      </div>
    </>
  );
};

export default RecordLabelCreationMethod;
