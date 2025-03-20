import React, { useState } from 'react';

const RadioSelection = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [error, setError] = useState('');

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedValue) {
      setError('Please select an option.');
      return;
    }

    setError('');
    console.log('Selected value:', selectedValue);
    // Proceed with further processing
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={`option-${index}`}
              name="radio-options"
              value={option}
              checked={selectedValue === option}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label htmlFor={`option-${index}`} className="ml-3 block text-sm font-medium text-gray-700">
              {option}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};

export default RadioSelection;