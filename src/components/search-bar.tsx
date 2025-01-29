"use client"

import { ArrowUp } from "lucide-react"
import { Button } from "./ui/category"
import { Input } from "./ui/search_input"
import React from "react"

export function SearchBar() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Input type="text" placeholder="Podaj nazwę interesującego ci bloga.." />
      <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-violet-500 hover:bg-violet-600 text-white rounded-full p-1">
        <ArrowUp className="h-4 w-4" />
      </Button>
    </div>
  )
}

