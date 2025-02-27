import React, { useState } from 'react';
import FormInput from './FormInput';
import Alert from './Alert';
import { API_BASE_URL } from '../config';

interface AuthFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  buttonText: string;
  showPrivacyPolicy?: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface FormStatus {
  type: 'error' | 'success' | null;
  message: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  onSubmit, 
  buttonText, 
  showPrivacyPolicy = true 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: null, message: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email jest wymagany';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Hasło jest wymagane';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear status and errors when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    setFormStatus({ type: null, message: null });
  };

  const authenticateUser = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.errors?.[0]?.msg || 'Błąd logowania');
      }

      return { 
        success: true
      };
    } catch (error) {
      console.error('Authentication error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Błąd logowania'
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: null, message: null });
    
    try {
      const authResult = await authenticateUser(formData);
      
      if (authResult.success) {
        // Show success message
        setFormStatus({
          type: 'success',
          message: 'Zalogowano pomyślnie!'
        });
        
        // Call the onSubmit prop with the form data
        onSubmit(formData);
        
        // Clear form after successful login
        setFormData({ email: '', password: '' });
      } else {
        setFormStatus({
          type: 'error',
          message: authResult.error || 'Nieprawidłowy email lub hasło'
        });
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Wystąpił błąd podczas logowania'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      {formStatus.type && formStatus.message && (
        <Alert type={formStatus.type}>
          {formStatus.message}
        </Alert>
      )}

      <div className="space-y-2">
        <FormInput
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          error={errors.email}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <FormInput
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Hasło"
          error={errors.password}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Logowanie...' : buttonText}
      </button>

      <div className="text-center text-[14px] text-[#64748B] mt-4">
        
        <p className="mt-6">
          <a href="/sign-in" className="text-[#6366F1] hover:underline">
            Nie masz konta? Zarejestruj się!
          </a>
        </p>
      </div>
    </form>
  );
};

export default AuthForm;