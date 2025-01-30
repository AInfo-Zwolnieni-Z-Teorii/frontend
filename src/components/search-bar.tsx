"use client"

import { ArrowUp } from "lucide-react"
import { Input } from "./ui/search_input"
import React from "react"

export function SearchBar() {
  return (
    <div className="relative w-full px-3 sm:px-4">
      <div className="relative flex items-center w-full">
        <Input 
          type="text" 
          placeholder="Podaj nazwę interesującego ci bloga.." 
          className="w-full h-10 sm:h-11 pl-3 pr-10 rounded-full bg-gray-100/80 border-none text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-xs sm:text-md lg:text-lg"
        />
        <button 
          onClick={() => {}} 
          className="absolute right-1.5 top-1/2 -translate-y-1/2 h-6 w-6 md:h-8 md:w-8 bg-purple-500 hover:bg-purple-600 rounded-full text-white transition-colors flex items-center justify-center"
          aria-label="Wyszukaj"
        >
          <ArrowUp className="h-3 w-3 md:h-4 md:w-4" />
        </button>
      </div>
    </div>
  )
}