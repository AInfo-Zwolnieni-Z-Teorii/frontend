import React, { useState } from "react";

const BlogName = ({ onUpdate }) => {
  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    const updatedName = event.target.value;
    setName(updatedName); // Update local state
    onUpdate(updatedName); // Send updated name to the parent
  };

  return (
    <div className="flex flex-col items-center justify-center h-3/4 pt-20">
      {/* Header */}
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Nadaj nazwę swojemu blogowi!
      </h1>
      <form className="rounded-lg p-8 w-full max-w-4xl">
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Wpisz nazwę swojego bloga..."
          className="w-full p-4 shadow-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </form>
    </div>
  );
};

export default BlogName;