import React from "react"
import { useState, useEffect } from "react"

const CategoryPicker = ({ onUpdate, initialCategories = [] }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialCategories)

  useEffect(() => {
    setSelectedTypes(initialCategories)
  }, [initialCategories])

  const blogTypes = ["GPT", "AGD", "poradniki", "życie bez AI", "chat GPT+", "AI", "AI iQ", "AI gry"]

  const toggleSelection = (type) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type]
    setSelectedTypes(updatedTypes)
    onUpdate(updatedTypes)
  }

  return (
    <div className="flex flex-col items-center w-full justify-center h-3/4 py-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 ">3. WYBIERZ KATEGORIE BLOGA</h1>
      <div className="grid grid-cols-4 gap-4">
        {blogTypes.map((type) => (
          <button
            key={type}
            className={`px-9 py-5 rounded-md font-medium text-lg shadow-lg ${
              selectedTypes.includes(type) ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
            onClick={() => toggleSelection(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryPicker

