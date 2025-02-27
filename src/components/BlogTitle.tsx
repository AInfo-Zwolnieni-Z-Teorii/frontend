import React from "react"
import { useState, useEffect } from "react"

interface BlogTitleProps {
  onUpdate: (content: string) => void;
  initialContent?: string;
}

const BlogTitle = ({ onUpdate, initialContent = "" }: BlogTitleProps) => {
  const [content, setContent] = useState(initialContent)

  useEffect(() => {
    setContent(initialContent)
  }, [initialContent])

  const handleInputChange = (value: string) => {
    setContent(value)
    onUpdate(value)
  }

  return (
    <div className="flex flex-col items-center justify-center h-3/4 pt-20">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">2. DODAJ KRÓTKI OPIS</h1>
      <form className="rounded-lg p-8 w-full max-w-4xl">
        <textarea
          value={content}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Wprowadź krótkie streszczenie bloga..."
          className="w-full p-4 shadow-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-24"
        />
      </form>
    </div>
  )
}

export default BlogTitle
