"use client"

import { useState } from "react"
import { Button } from "./ui/category"
import React from "react"

const categories = [
  { id: "newest", label: "najnowsze" },
  { id: "popular", label: "popularne" },
  { id: "recommended", label: "zalecane" },
  { id: "interesting", label: "interesujące" },
]

export function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("newest")

  const toggleSelection = (categoryId: string) => {
    setSelectedCategory((prevSelected) => (prevSelected === categoryId ? null : categoryId))
  }

  return (
    <div className="grid grid-cols-2 md:flex md:flex-row gap-2 justify-center max-w-2xl mx-auto">
      {categories.map((category) => (
        <Button
          key={category.id}
          isSelected={selectedCategory === category.id}
          className="w-full md:flex-1"
          onClick={() => toggleSelection(category.id)}
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}

