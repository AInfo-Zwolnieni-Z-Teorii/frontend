import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import ImagePicker from "../components/ImagePicker"
import CategoryPicker from "../components/CategoryPicker"
import BlogForm from "../components/BlogDescriptionCreator"
import BlogName from "../components/BlogName"

const BlogCreation = () => {
  const location = useLocation()
  const initialData = location.state?.blogData || {
    image: null,
    categories: [],
    content: "",
    name: "",
  }

  const [formData, setFormData] = useState(initialData)

  const navigate = useNavigate()

  const handleUpdate = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (content) => {
    const updatedFormData = { ...formData, content }

    if (!updatedFormData.name.trim()) {
      alert("Nazwa bloga jest wymagana!")
      return
    }

    if (!updatedFormData.image) {
      alert("Zdjęcie musi być dodane!")
      return
    }
    if (updatedFormData.categories.length === 0) {
      alert("Musisz wybrać co najmniej jedną kategorię!")
      return
    }
   

    try {
      // Step 1: Refresh the session
      const refreshResponse = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include", // Include cookies for authentication
      })

      if (!refreshResponse.ok) {
        alert("Sesja wygasła. Proszę zalogować się ponownie.")
        navigate("/login") // Redirect to login if refresh fails
        return
      }

      // Step 2: Proceed to create the blog post
      const accessToken = localStorage.getItem("accessToken") // Retrieve the token

      const response = await fetch("api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: updatedFormData.name,
          categories: updatedFormData.categories,
          thumbnailName: updatedFormData.image.name,
          introduction: {
            header: "Wprowadzenie do posta",
            content: "To jest przykładowe wprowadzenie, które opisuje treść posta w skrócie.",
          },
          content: updatedFormData.content,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        alert(data.errors[0]?.msg || "Wystąpił błąd podczas tworzenia posta")
        return
      }

      navigate("/blog-review", { state: updatedFormData })
    } catch (error) {
      alert("Wystąpił błąd podczas tworzenia posta")
    }
  }

  return (
    <div className="flex flex-col justify-center align-middle w-full bg-slate-50">
      <BlogName onUpdate={(name) => handleUpdate("name", name)} initialName={formData.name} />
      <ImagePicker onUpdate={(image) => handleUpdate("image", image)} initialImage={formData.image} />
      <CategoryPicker
        onUpdate={(categories) => handleUpdate("categories", categories)}
        initialCategories={formData.categories}
      />
      <BlogForm onSubmit={handleSubmit} initialContent={formData.content} />
    </div>
  )
}

export default BlogCreation

