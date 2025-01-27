import React, { useState } from "react";

const CategoryPicker = ({ onUpdate }) => {
  // State to store selected blog types
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Blog types
  const blogTypes = [
    "GPT",
    "AGD",
    "komputery",
    "życie bez AI",
    "chat GPT+",
    "AI",
    "AI iQ",
    "AI gry",
  ];

  // Function to handle selection toggling
  const toggleSelection = (type) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(updatedTypes);
    onUpdate(updatedTypes);
  };

  return (
    <div className="flex flex-col items-center w-full justify-center h-3/4 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Wybierz typ twojego Bloga:
      </h1>

      {/* Button grid */}
      <div className="grid grid-cols-4 gap-4">
        {blogTypes.map((type) => (
          <button
            key={type}
            className={`px-9 py-5 rounded-md font-medium text-lg shadow-lg ${
              selectedTypes.includes(type)
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
            onClick={() => toggleSelection(type)} // Toggle the selection
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPicker;