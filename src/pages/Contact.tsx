import React, { useState, useEffect } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [error, setError] = useState<{ email?: string; message?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Check if form was recently submitted
  useEffect(() => {
    const fetchData = async () => {
      const lastSubmitTime = localStorage.getItem('lastContactSubmit');
      if (lastSubmitTime) {
        const timeDiff = Date.now() - parseInt(lastSubmitTime);
        // Disable button if less than 5 minutes since last submission
        if (timeDiff < 5 * 60 * 1000) {
          setIsButtonDisabled(true);
          setTimeout(() => {
            setIsButtonDisabled(false);
            localStorage.removeItem('lastContactSubmit');
          }, 5 * 60 * 1000 - timeDiff);
        } else {
          localStorage.removeItem('lastContactSubmit');
        }
      }
      
      const response1 = await fetch('https://ainfo-backend.vercel.app/tests/cookies', {
        method: 'GET',
      });

      const response2 = await fetch('https://ainfo-backend.vercel.app/tests/cookies', {
        method: 'POST',
      });

      const response3 = await fetch('https://ainfo-backend.vercel.app/tests/cookies-not-secure', {
        method: 'POST',
      });
    };

    fetchData();
  }, []);

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
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format adresu email.';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Wiadomość nie może być pusta.';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Wiadomość musi zawierać co najmniej 5 znaków.';
    } else if (formData.message.length > 1000) {
      newErrors.message = 'Wiadomość nie może przekraczać 1000 znaków.';
    }
    
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || isButtonDisabled) {
      return;
    }
    
    setIsSubmitting(true);
    setIsButtonDisabled(true);
    
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
          setIsButtonDisabled(false); // Allow retry on validation errors
        } else {
          // General error
          setError({
            general: data.message || 'Nie udało się wysłać wiadomości. Spróbuj ponownie później.'
          });
          // Allow retry after 30 seconds on server error
          setTimeout(() => setIsButtonDisabled(false), 30000);
        }
      } else {
        setSubmitSuccess(true);
        setFormData({ email: '', message: '' });
        // Store submission time in localStorage
        localStorage.setItem('lastContactSubmit', Date.now().toString());
        // Keep button disabled until page refresh or timer expiration
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania wiadomości:', error);
      setError({
        general: 'Nie udało się wysłać wiadomości. Spróbuj ponownie później.'
      });
      // Allow retry after 30 seconds on network error
      setTimeout(() => setIsButtonDisabled(false), 30000);
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
              className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={() => setSubmitSuccess(false)}
              disabled={isButtonDisabled}
            >
              Wyślij kolejną wiadomość
            </button>
            {isButtonDisabled && (
              <p className="mt-2 text-sm text-gray-600">
                Możliwość wysłania kolejnej wiadomości będzie dostępna za kilka minut.
              </p>
            )}
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
            
            {error.general && (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                {error.general}
              </div>
            )}

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
              <p className="text-xs text-gray-500">
                {formData.message.length}/1000 znaków
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isSubmitting || isButtonDisabled}
              >
                {isSubmitting ? 'Wysyłanie...' : isButtonDisabled ? 'Proszę czekać...' : 'Wyślij wiadomość'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
