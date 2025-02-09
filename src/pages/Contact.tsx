import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError('Wiadomość nie może być pusta.');
      return;
    }
    
    setError('');
    
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'ainfoproject2024@gmail.com',
          subject: 'Nowa wiadomość z formularza kontaktowego',
          text: message,
        }),
      });
      alert('Wiadomość wysłana!');
      setMessage('');
    } catch (error) {
      console.error('Błąd podczas wysyłania wiadomości:', error);
      setError('Nie udało się wysłać wiadomości. Spróbuj ponownie później.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-navy-900 mb-12">
        SKONTAKTUJ SIĘ
      </h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <textarea
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            rows={5}
            placeholder="Wpisz swoją wiadomość..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Wyślij
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
