"use client"

import React from "react";

import { useState } from "react";
import type { ChangeEvent, FormEvent, FormEventHandler } from "react";
import FormInput from "./FormInput"
import Alert from "./Alert"

interface FormData {
  email: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  email?: string
  password?: string
  confirmPassword?: string
}

const AuthFormSignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const [formStatus, setFormStatus] = useState<{ type: 'error' | 'success' | null; message: string | null }>({ type: null, message: null });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.email) {
      newErrors.email = "Email jest wymagany"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Nieprawidłowy format email"
    }

    if (!formData.password) {
      newErrors.password = "Hasło jest wymagane"
    } else if (formData.password.length < 6) {
      newErrors.password = "Hasło musi mieć co najmniej 6 znaków"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Potwierdzenie hasła jest wymagane"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Hasła nie są identyczne"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setFormStatus({ type: null, message: null });
  
    if (validateForm()) {
      try {
        // Dodaj tutaj logikę przesyłania formularza
        setFormStatus({
          type: 'success',
          message: 'Formularz został pomyślnie przesłany!',
        });
        console.log("Form submitted:", formData);
      } catch (error) {
        setFormStatus({
          type: 'error',
          message: 'Wystąpił błąd podczas rejestracji. Spróbuj ponownie.',
        });
      }
    } else {
      setFormStatus({
        type: 'error',
        message: 'Popraw błędy w formularzu.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
     

      <div>
        <FormInput
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
       {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <FormInput
          type="password"
          name="password"
          placeholder="Hasło"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <div>
        <FormInput
          type="password"
          name="confirmPassword"
          placeholder="Powtórz hasło"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
     {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200"
      >
        ZALOGUJ SIĘ
      </button>

      <div className="text-center text-[14px] text-[#64748B] mt-4">
        <p>
          Logując się, przyjmujesz{" "}
          <a href="#" className="text-[#6366F1] hover:underline">
            warunki polityki prywatności
          </a>
        </p>
        <p className="mt-6">
          <a href="/log-in" className="text-[#6366F1] hover:underline">
            Masz już konto? Zaloguj się!
          </a>
        </p>
      </div>
    </form>
  )
}

export default AuthFormSignIn

