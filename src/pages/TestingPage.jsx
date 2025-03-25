import React from "react";

const DashedPlusIcon = ({ className = "" }) => {
  return (
    <svg
      className={`w-96 h-96 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle with double border */}
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1" fill="none" />
      
      {/* Dashed plus sign */}
      <path
        d="M12 6V18"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="2,2"
        strokeLinecap="round"
      />
      <path
        d="M6 12H18"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="2,2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DashedPlusIcon;