import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected?: boolean
}

export const Button: React.FC<ButtonProps> = ({ isSelected, className = "", children, ...props }) => {
  return (
    <button
      className={`px-9 py-5 rounded-md font-medium text-lg shadow-lg ${
        isSelected ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-gray-100"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

