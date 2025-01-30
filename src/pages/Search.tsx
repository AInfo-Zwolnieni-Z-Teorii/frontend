import React from "react"
import { SearchBar } from "../components/search-bar"
import { CategoryFilter } from "../components/category-filter"
import { PostCard } from "../components/post-card"


const posts = [
  { id: 1, title: "NOWOŚCI W AI", imageUrl: "/assets/image1.png" },
  { id: 2, title: "TUTORIALE", imageUrl: "/assets/image1.png" },
  { id: 3, title: "ZASTOSOWANIA AI", imageUrl: "/assets/image1.png" },
  { id: 4, title: "ETYKA I PRZYSZŁOŚĆ AI", imageUrl: "/assets/image1.png" },
  { id: 5, title: "BADANIA NAUKOWE", imageUrl: "/assets/image1.png" },
  { id: 6, title: "KREATYWNOŚĆ Z AI", imageUrl: "/assets/image1.png" },
  { id: 7, title: "RECENZJE NARZĘDZI", imageUrl: "/assets/image1.png" },
  { id: 8, title: "AI W ŻYCIU CODZIENNYM", imageUrl: "/assets/image1.png" },
]

export default function Search() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 w-full"> 
      <div className="w-full shadow-lg h-auto px-1 sm:px-16 py-12 mx-auto rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8">WYSZUKIWANIE BLOGU</h1>
        <SearchBar />
        <br /><br />
        <CategoryFilter />
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
        {posts.map((post) => (
          <PostCard key={post.id} title={post.title} imageUrl={post.imageUrl} />
        ))}
      </div>
    </div>
  )
}

