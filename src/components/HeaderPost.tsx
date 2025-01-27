import { Star } from "lucide-react"
import Image from "next/image"
import React from "react"

interface AroundPostProps {
  author: string
  date: string
  rating: number
  reviews: number
  title: string
  description: string
}

export function AroundPost({ author, date, rating, reviews, title, description }: AroundPostProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-6">
        <Image src="/placeholder.svg" alt={author} width={48} height={48} className="rounded-full" />
        <div className="flex items-center gap-8">
          <div className="text-gray-600">
            <span className="font-medium text-gray-900">{author}</span>
            <span className="mx-2">•</span>
            <span>Autor blogu</span>
          </div>
          <div className="text-gray-600">{date}</div>
          <div className="flex items-center gap-4">
            <div className="text-gray-600">
              Ranking:
              <span className="ml-1 font-medium text-gray-900">{rating}</span>
              <Star className="inline-block w-4 h-4 ml-1 text-yellow-400 fill-current" />
            </div>
            <div className="text-gray-600">
              Recenzji: <span className="font-medium text-gray-900">{reviews}</span>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-6">{title}</h1>
      <p className="text-xl text-gray-600">{description}</p>
    </div>
  )
}

