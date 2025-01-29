
import React from "react"
import { Link } from "react-router-dom"

interface PostCardProps {
  title: string
  imageUrl: string
}

export function PostCard({ title, imageUrl }: PostCardProps) {
  return (
    <Link to="/post">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
      <div className="relative w-full h-full">
        <img 
            src={imageUrl || "/placeholder.svg"} 
            alt={title} 
            className="w-full h-full object-cover"
        />
        </div>
        <div className="absolute inset-0 bg-black/40 hover:bg-black/60 transition-colors">
          <h2 className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold text-center px-4">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}


