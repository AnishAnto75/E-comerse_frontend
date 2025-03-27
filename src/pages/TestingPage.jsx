import { useState } from 'react';

const FileInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload File
        </label>
        
        <div className="mt-1 flex items-center">
          <label htmlFor="file-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Choose File
            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange}/>
          </label>
          
          {selectedFile ? (
            <div className="ml-4 flex items-center">
              <span className="text-sm text-gray-500 mr-2">
                {selectedFile.name}
              </span>
              <button type="button" onClick={handleRemoveFile} className="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" >
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          ) : (
            <span className="ml-4 text-sm text-gray-500">No file selected</span>
          )}
        </div>
        
        {selectedFile && (
          <div className="mt-2 text-xs text-gray-500">
            File type: {selectedFile.type || "Unknown"} | File size:{" "}
            {(selectedFile.size / 1024).toFixed(2)} KB
          </div>
        )}
      </div>
    </div>
  );
};

export default FileInput;