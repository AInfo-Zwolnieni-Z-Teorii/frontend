import React, { ChangeEvent } from 'react';

interface FormInputProps {
  type?: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;  // Added this line to fix the TypeScript error
}

const FormInput: React.FC<FormInputProps> = ({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  error
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-4 rounded-lg border transition-all text-gray-800 placeholder-gray-400 ${
        error 
          ? 'border-red-500 focus:ring-red-200' 
          : 'border-gray-200 focus:ring-indigo-200'
      } bg-white focus:outline-none focus:ring-2`}
      aria-invalid={error ? 'true' : 'false'}
    />
  );
};

export default FormInput;