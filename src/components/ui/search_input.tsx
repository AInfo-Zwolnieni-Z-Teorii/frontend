import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full pl-4 pr-12 py-2 bg-gray-100 rounded-lg ${className}`}
      {...props}
    />
  )
}
