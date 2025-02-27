"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"

const ImagePicker = ({ onUpdate, initialImage = null }) => {
  const [selectedImage, setSelectedImage] = useState<{ file: File | null; preview: string } | null>(initialImage)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setSelectedImage(initialImage)
  }, [initialImage])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const imageData = {
        file,
        preview: URL.createObjectURL(file),
      }
      setSelectedImage(imageData)
      onUpdate(imageData)
    }
  }

  const handleResetImage = () => {
    setSelectedImage(null)
    onUpdate(null)
  }

  const handlePredefinedImageSelect = async (imageSrc: string) => {
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const file = new File([blob], 'image.png', { type: 'image/png' });
      const imageData = {
        file,
        preview: imageSrc,
      }
      setSelectedImage(imageData)
      onUpdate(imageData)
    } catch (error) {
      console.error('Error converting image to file:', error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-3/4 py-20">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 ">2. WYBIERZ ZDJĘCIE GŁÓWNE</h1>
      <div className="border-2 border-dashed border-blue-600 rounded-lg p-8 w-3/5 h-full">
        <div className="flex flex-col items-center">
          {!selectedImage ? (
            <>
              <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageChange} />
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 mt-24 px-8 rounded flex items-center mb-4"
                onClick={() => fileInputRef.current?.click()}
              >
                <span>Dołącz zdjęcie z komputera</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 13.586V3a1 1 0 011-1z" />
                </svg>
              </button>
              <p className="text-gray-700 font-medium">lub przemieść go tu z foldera</p>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={selectedImage.preview || "/placeholder.svg"}
                alt="Selected"
                className="w-40 h-40 object-cover rounded-md mb-4"
              />
              <button
                onClick={handleResetImage}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Usuń zdjęcie
              </button>
            </div>
          )}

          <p className="text-gray-600 font-medium text-sm mt-12 text-center">
            Nie masz zdjęcia? Spróbuj jedno z <br />
            naszych
          </p>
          <div className="flex space-x-4 mt-4">
            {["/assets/testImage.png", "/assets/testImage.png", "/assets/testImage.png", "/assets/testImage.png"].map(
              (src, index) => (
                <img
                  key={index}
                  src={src || "/placeholder.svg"}
                  alt={`Example ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-80 ${
                    selectedImage?.preview === src ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => handlePredefinedImageSelect(src)}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImagePicker
