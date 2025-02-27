"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import ImagePicker from "../components/ImagePicker"
import CategoryPicker from "../components/CategoryPicker"
import BlogForm from "../components/BlogDescriptionCreator"
import BlogName from "../components/BlogName"
import BlogTitle from "../components/BlogTitle"
import { API_BASE_URL } from "../config"

const BlogCreation = () => {
  const location = useLocation()
  const initialData = location.state?.blogData || {
    image: null,
    categories: [],
    content: [],
    name: "",
    introduction: "",
  }

  const [formData, setFormData] = useState(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleUpdate = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  // Helper function to get auth token from cookies
  const getAuthToken = () => {
    const cookies = document.cookie.split(";")
    const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith("authToken="))
    return tokenCookie ? tokenCookie.split("=")[1] : null
  }

  // Helper function to refresh auth token
  const refreshToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Token refresh failed")
      }

      const data = await response.json()
      return data.token // Assuming the new token is returned in the response
    } catch (error) {
      console.error("Error refreshing token:", error)
      throw error
    }
  }

  // Helper function to convert blob URL to file
  const blobUrlToFile = async (blobUrl, filename = "image.jpg", type = "image/jpeg") => {
    try {
      const response = await fetch(blobUrl)
      const blob = await response.blob()
      return new File([blob], filename, { type })
    } catch (error) {
      console.error("Error converting blob URL to file:", error)
      throw new Error("Failed to convert blob URL to file")
    }
  }

  // Helper function to process image from various sources
  const processImage = async (image, defaultName = "image.jpg") => {
    if (image?.file instanceof File) {
      return image.file
    } else if (image?.src instanceof File) {
      return image.src
    } else if (image?.preview && typeof image.preview === "string") {
      return await blobUrlToFile(image.preview, defaultName)
    } else if (image?.src && typeof image.src === "string" && image.src.startsWith("blob:")) {
      return await blobUrlToFile(image.src, defaultName)
    }
    return null
  }

  // Helper function to make authenticated API requests
  const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = getAuthToken()

    const defaultOptions = {
      credentials: "include",
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const response = await fetch(url, { ...options, ...defaultOptions })

      if (response.status === 401) {
        // Token expired, try to refresh
        const newToken = await refreshToken()

        // Retry the request with new token
        const retryOptions = {
          ...options,
          ...defaultOptions,
          headers: {
            ...options.headers,
            ...defaultOptions.headers,
            Authorization: `Bearer ${newToken}`,
          },
        }

        const retryResponse = await fetch(url, retryOptions)

        if (!retryResponse.ok) {
          throw new Error("Request failed after token refresh")
        }

        return retryResponse
      }

      return response
    } catch (error) {
      console.error("Request failed:", error)
      throw error
    }
  }

  // Add this helper function at the top with other helpers
  const checkTitleUniqueness = async (title) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/check-title?title=${encodeURIComponent(title)}`, {
        credentials: "include",
      })
      const data = await response.json()
      return data.isUnique
    } catch (error) {
      console.error("Error checking title uniqueness:", error)
      return false
    }
  }

  // Modify the handleSubmit function
  const handleSubmit = async (content) => {
    console.log("=== Starting handleSubmit ===")
    console.log("Received content:", content)
    console.log("Current formData:", formData)

    if (isSubmitting) return
    setIsSubmitting(true)

    const updatedFormData = { ...formData, content }
    console.log("Updated formData:", updatedFormData)

    try {
      console.log("Creating FormData")
      const formDataToSend = new FormData()

      // Generate slug for unique identification (not displayed to users)
      const timestamp = new Date().getTime()
      const uniqueSlug = `${updatedFormData.name.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`
      console.log("Generated unique slug:", uniqueSlug)

      // Basic info - use original name for title, unique slug for identification
      formDataToSend.append("title", updatedFormData.name)
      formDataToSend.append("slug", uniqueSlug)  // Add slug separately
      updatedFormData.categories.forEach(category => {
        formDataToSend.append("categories[]", category)
      })

      // Introduction - use original name
      formDataToSend.append("introduction[header]", updatedFormData.name)
      formDataToSend.append("introduction[content]", updatedFormData.introduction)

      // Process thumbnail - Fixed thumbnail handling
      const thumbnailFile = updatedFormData.image?.file
      if (thumbnailFile instanceof File) {
        console.log("Adding thumbnail:", thumbnailFile.name)
        formDataToSend.append("thumbnail", thumbnailFile)
      } else {
        throw new Error("Brak pliku miniaturki")
      }

      // Process content sections
      if (content?.content?.[0]) {
        const imageFiles = []
        
        content.content[0].forEach((block, index) => {
          console.log(`Processing block ${index}:`, block)

          switch (block.type) {
            case "text":
              if (block.text?.[0]) {
                formDataToSend.append(`content[${index}][type]`, "text")
                formDataToSend.append(`content[${index}][header]`, block.text[0].header || "")
                formDataToSend.append(`content[${index}][paragraph]`, block.text[0].paragraph || "")
              }
              break

            case "image":
              if (block.image) {
                const imageFile = block.image.src
                if (imageFile instanceof File) {
                  console.log(`Adding image for block ${index}:`, imageFile.name)
                  imageFiles.push(imageFile)
                  formDataToSend.append(`content[${index}][type]`, "image")
                  formDataToSend.append(`content[${index}][alt]`, block.image.alt || `Image ${index + 1}`)
                } else {
                  console.warn(`No valid image file for block ${index}`)
                }
              }
              break

            case "image-text":
              formDataToSend.append(`content[${index}][type]`, "image-text")
              if (block.image) {
                const imageFile = block.image.src
                if (imageFile instanceof File) {
                  console.log(`Adding image-text image for block ${index}:`, imageFile.name)
                  imageFiles.push(imageFile)
                  formDataToSend.append(`content[${index}][image][alt]`, block.image.alt || `Image with text ${index + 1}`)
                } else {
                  console.warn(`No valid image file for image-text block ${index}`)
                }
              }
              formDataToSend.append(`content[${index}][layout]`, block.layout || "left")

              if (Array.isArray(block.text)) {
                block.text.forEach((textItem, textIndex) => {
                  formDataToSend.append(`content[${index}][text][${textIndex}][header]`, textItem.header || "")
                  formDataToSend.append(`content[${index}][text][${textIndex}][paragraph]`, textItem.paragraph || "")
                })
              }
              break
          }
        })

        // Add all collected image files at once
        imageFiles.forEach((file, index) => {
          console.log(`Adding image file ${index}:`, file.name)
          formDataToSend.append("images", file)
        })
      }

      // Log final FormData
      console.log("=== Final FormData entries ===")
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], typeof pair[1], pair[1] instanceof File ? pair[1].name : pair[1])
      }

      // Send the request
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        credentials: "include",
        body: formDataToSend,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.errors?.[0]?.msg || "Wystąpił błąd podczas tworzenia posta")
      }

      // Only try to parse JSON if we have content
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        const responseData = await response.json()
        console.log("Server response:", responseData)
      } else {
        console.log("Server response status:", response.status)
      }

      alert("Post został utworzony pomyślnie!")
      navigate("/blog-review", { state: updatedFormData })
    } catch (error) {
      console.error("Error creating blog post:", error)
      alert(error.message || "Wystąpił błąd podczas tworzenia posta")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col justify-center align-middle w-full bg-slate-50">
      <BlogName onUpdate={(name) => handleUpdate("name", name)} initialName={formData.name} />
      <BlogTitle onUpdate={(content) => handleUpdate("introduction", content)} initialContent={formData.introduction} />
      <ImagePicker onUpdate={(image) => handleUpdate("image", image)} initialImage={formData.image} />
      <CategoryPicker
        onUpdate={(categories) => handleUpdate("categories", categories)}
        initialCategories={formData.categories}
      />
      <BlogForm onSubmit={handleSubmit} initialContent={formData.content} />
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Trwa przesyłanie...</p>
            <p className="text-sm text-gray-500">Proszę nie zamykać tej strony</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogCreation

