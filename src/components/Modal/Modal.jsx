import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ children, handleClose, className, whiteContainerClass }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 z-[99999999999999] flex justify-center items-center ${className}`}
      onClick={handleClose}
    >
      <div
        className={`lg:w-4/6 mx-auto bg-black relative p-1 lg:p-3 shadow-xl shadow-[#000a] rounded-md ${whiteContainerClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-interactive-light-destructive-focus absolute right-1 top-1"
          onClick={handleClose}
        >
          <FaTimes className="text-heading-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
