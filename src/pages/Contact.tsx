import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [error, setError] = useState<{ email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (error[name as keyof typeof error]) {
      setError({
        ...error,
        [name]: undefined
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; message?: string } = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format adresu email.';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Wiadomość nie może być pusta.';
    }
    
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://ainfo-api.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          content: formData.message
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (data.errors) {
          // Handle validation errors from the API
          const newErrors: { email?: string; message?: string } = {};
          
          data.errors.forEach((err: any) => {
            if (err.path === 'email') {
              newErrors.email = err.msg;
            } else if (err.path === 'content') {
              newErrors.message = err.msg;
            }
          });
          
          setError(newErrors);
        } else {
          // General error
          setError({
            message: data.message || 'Nie udało się wysłać wiadomości. Spróbuj ponownie później.'
          });
        }
      } else {
        setSubmitSuccess(true);
        setFormData({ email: '', message: '' });
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania wiadomości:', error);
      setError({
        message: 'Nie udało się wysłać wiadomości. Spróbuj ponownie później.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            SKONTAKTUJ SIĘ
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Wypełnij formularz, a odpowiemy najszybciej jak to możliwe
          </p>
        </div>
        
        {submitSuccess ? (
          <div className="text-center">
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
              Wiadomość została wysłana pomyślnie!
            </div>
            <button
              className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={() => setSubmitSuccess(false)}
            >
              Wyślij kolejną wiadomość
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 ${
                  error.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-600'
                }`}
                placeholder="Twój adres email..."
                value={formData.email}
                onChange={handleChange}
              />
              {error.email && (
                <p className="text-sm text-red-500">{error.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Wiadomość
              </label>
              <textarea
                id="message"
                name="message"
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 ${
                  error.message ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-600'
                }`}
                rows={5}
                placeholder="Wpisz swoją wiadomość..."
                value={formData.message}
                onChange={handleChange}
              />
              {error.message && (
                <p className="text-sm text-red-500">{error.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Wyślij wiadomość
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
