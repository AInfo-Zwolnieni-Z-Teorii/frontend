import React, { useEffect, useState } from "react"
import { API_BASE_URL } from "../config"

const CategoryPicker = ({ onUpdate, initialCategories = [] }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialCategories)
  const [categories, setCategories] = useState<{ name: string; slug: string }[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories`, {
          method: "GET",
          credentials: "include",
        })

        if (!response.ok) {
          const errorData = await response.json()
          setError(errorData.error || "Wystąpił błąd podczas pobierania kategorii.")
          return
        }

        const data = await response.json()
        setCategories(data)
      } catch (error) {
        setError("Wystąpił błąd podczas pobierania kategorii.")
      }
    }

    fetchCategories()
  }, [])

  const toggleSelection = (type: string) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type]
    setSelectedTypes(updatedTypes)
    onUpdate(updatedTypes)
  }

  return (
    <div className="flex flex-col items-center w-full justify-center h-3/4 py-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Wybierz Kategorię</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.slug}
            className={`px-9 py-5 rounded-md font-medium text-lg shadow-lg ${
              selectedTypes.includes(category.slug) ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
            onClick={() => toggleSelection(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryPicker

