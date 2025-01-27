import React, { useState, useRef } from "react";

const ImagePicker = ({ onUpdate }) => {
  const [selectedImage, setSelectedImage] = useState(null); // Przechowuj obiekt File
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      onUpdate(file); 
    }
  };

  const handleResetImage = () => {
    setSelectedImage(null);
    onUpdate(null); // Reset selected image
  };

  return (
    <div className="flex flex-col items-center justify-center h-3/4 py-20">
      

      {/* Image Upload Section */}
      <div className="border-2 border-dashed border-blue-600 rounded-lg p-8 w-3/5 h-full">
        <div className="flex flex-col items-center">
          {/* Conditionally render based on whether an image is selected */}
          {!selectedImage ? (
            <>
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef} // Attach ref to the input
                className="hidden"
                onChange={handleImageChange}
              />
              {/* Button to trigger file input */}
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 mt-24 px-8 rounded flex items-center mb-4"
                onClick={() => fileInputRef.current?.click()} // Safely invoke the click method
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
              {/* Display Selected Image */}
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="w-40 h-40 object-cover rounded-md mb-4"
              />
              {/* Reset Button */}
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
            <img
              src="/src/assets/image1.png"
              alt="Example 1"
              className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-80"
            />
            <img
              src="/src/assets/image1.png"
              alt="Example 2"
              className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-80"
            />
            <img
              src="/src/assets/image1.png"
              alt="Example 3"
              className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-80"
            />
            <img
              src="/src/assets/image1.png"
              alt="Example 4"
              className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePicker;