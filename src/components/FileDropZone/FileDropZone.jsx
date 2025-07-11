// components/FileDropzone.jsx

import React, { useRef, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";

export default function FileDropzone({
  label = "Upload File",
  onFileSelect = () => {},
  allowedTypes = [],
  className = "",
}) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleClick = () => inputRef.current.click();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && isValidFile(file)) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && isValidFile(file)) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const isValidFile = (file) =>
    allowedTypes.length === 0 || allowedTypes.includes(file.type);

  return (
    <div
      className={`aspect-square bg-[#141622] rounded-lg border-2 transition-all ${
        dragActive
          ? "border-solid border-blue-500"
          : "border-dashed border-gray-500"
      } flex flex-col items-center justify-center text-white cursor-pointer transition ${className}`}
      onClick={handleClick}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleChange}
      />
      {fileName.length ? (
        <FaRegCheckCircle className="text-heading-3 text-interactive-light-confirmation-focus mb-1" />
      ) : (
        <FiUploadCloud className="text-heading-3 text-gray-400 mb-1" />
      )}
      <h3 className="font-semibold text-paragraph-1 mb-1 mx-1 text-center">
        {label}
      </h3>
      <p className="text-subtitle-2 text-gray-400 text-center px-4 leading-4">
        {fileName || "Drag and drop a file next, or click to upload"}
      </p>
    </div>
  );
}
