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
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'ainfoproject2024@gmail.com',
          subject: 'Nowa wiadomość z formularza kontaktowego',
          text: `Email: ${formData.email}\n\nWiadomość: ${formData.message}`,
          replyTo: formData.email
        }),
      });
      
      setSubmitSuccess(true);
      setFormData({ email: '', message: '' });
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-navy-900 mb-12">
        SKONTAKTUJ SIĘ
      </h1>
      
      {submitSuccess ? (
        <div className="w-full max-w-md text-center">
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
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <input
              type="email"
              name="email"
              className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 ${
                error.email ? 'border-red-500 focus:ring-red-200' : 'focus:ring-indigo-600'
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
            <textarea
              name="message"
              className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 ${
                error.message ? 'border-red-500 focus:ring-red-200' : 'focus:ring-indigo-600'
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
          
          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Wysyłanie...' : 'Wyślij'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
