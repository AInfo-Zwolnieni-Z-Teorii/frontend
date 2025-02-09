import React from "react";
import { useState } from "react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(!localStorage.getItem("cookieConsent"));

  const handleAccept = () => {
    setIsVisible(false);
    localStorage.setItem("cookieConsent", "true");
  };

  return (
    isVisible && (
      <div className="fixed bottom-0 left-0 right-0 bg-blue-100 text-black p-6 md:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between w-full border-t border-blue-300">
        <p className="text-lg md:text-xl mb-4 md:mb-0 text-center md:text-left flex items-center">
          🍪 Ta strona używa plików cookie, aby zapewnić najlepsze doświadczenia użytkownika. Kontynuując, zgadzasz się na ich użycie.
        </p>
        <button
          onClick={handleAccept}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg md:text-xl"
        >
          Akceptuję
        </button>
      </div>
    )
  );
};

export default CookieConsent;