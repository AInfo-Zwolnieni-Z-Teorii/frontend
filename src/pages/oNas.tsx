import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-black text-white p-8">
      {/* Text Content */}
      <div className="md:w-1/2 space-y-8 p-4">
        <h1 className="text-5xl font-bold mb-12">O NAS</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Najlepsze ceny</h2>
            <p className="text-sm text-gray-300">
              Nasze ceny są pod ścisłą kontrolą, ponieważ współpracujemy z tysiącami hoteli 
              i bezpośrednio kilkudziesięciu dostawców. To także oznacza, że zawsze mamy 
              świetne oferty dla większości kierunków.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Hotele na całym świecie</h2>
            <p className="text-sm text-gray-300">
              Mamy ponad 100 opcji noclegów na całym świecie. Dotyczy to hoteli, hosteli, 
              apartamentów, willi a nawet kempingów. Znajdź odpowiednie zakwaterowanie w 
              dowolnym terminie rok.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Obsługa klienta 24/7</h2>
            <p className="text-sm text-gray-300">
              Nasi specjaliści wsparcia Ci w tym pomogą, wybiorą hotel i zarezerwują go. 
              Jeśli masz problem podczas Twojej podróży, nasz specjalista będzie online i 
              znajdzie rozwiązanie pod Twój czas.
            </p>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="md:w-1/2 p-4">
        <div className="rounded-[40px] overflow-hidden">
          <img 
            src="/assets/hotel-room.jpg" 
            alt="Luksusowy pokój hotelowy z widokiem na miasto"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
  