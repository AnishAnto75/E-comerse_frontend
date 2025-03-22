import React, { useState } from "react";

const FileInput = () => {
  const [fileName, setFileName] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md">
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Choose File
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      {fileName && (
        <p className="mt-4 text-gray-700">
          Selected file: <span className="font-semibold">{fileName}</span>
        </p>
      )}
    </div>
  );
};

export default FileInput;