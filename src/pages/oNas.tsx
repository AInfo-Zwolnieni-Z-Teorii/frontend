import React from 'react';

const ONas: React.FC = () => {
  return (
    <div className="py-4 px-2">
      <div className="w-11/12 md:w-4/5 mx-auto bg-gray-100 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
        {/* First section - Text + Image (side by side on desktop) */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-8">
          <div className="lg:w-1/2 space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold text-gray-800 mb-4">
              O nas
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-700 leading-relaxed">
              Jesteśmy zespołem pasjonatów sztucznej inteligencji, którzy dzielą się
              wiedzą na temat jej zastosowań w różnych dziedzinach. Nasza misja to
              edukowanie, inspirowanie i dostarczanie wartościowych treści dla
              wszystkich zainteresowanych AI.
            </p>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-700 leading-relaxed">
              Chcemy uczyć, jak używać i wykorzystywać sztuczną inteligencję w
              codziennym życiu. Pokazujemy, że AI to nie zagrożenie, ale ogromna
              szansa na rozwój i poprawę jakości życia.
            </p>
          </div>

          {/* Image - Hidden on mobile */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="rounded-2xl overflow-hidden flex items-center justify-center">
              <img 
                src="/assets/AINFO_LOGO.png" 
                alt="AInfo Logo"
                className="w-full h-auto object-contain max-w-[600px] 2xl:max-w-[800px]"
              />
            </div>
          </div>
        </div>

        {/* Second section - Text only */}
        <div className="space-y-6">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-700 leading-relaxed">
            Naszym celem jest dostarczanie darmowych porad dotyczących obsługi 
            i praktycznego zastosowania AI, aby każdy mógł skorzystać z tej technologii.
            Codziennie publikujemy najnowsze informacje na temat osiągnięć w dziedzinie
            sztucznej inteligencji, analizujemy trendy oraz dzielimy się praktycznymi
            wskazówkami, które pomagają zarówno nowicjuszom, jak i zaawansowanym użytkownikom
            rozwijać swoje umiejętności i wykorzystywać AI do swoich potrzeb.
          </p>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-700 leading-relaxed">
            Na naszym blogu znajdziesz poradniki, analizy przypadków oraz eksperckie
            artykuły, które pomogą Ci lepiej zrozumieć i skutecznie korzystać z AI.
            Tworzymy społeczność ludzi, którzy wierzą, że sztuczna inteligencja to narzędzie
            przyszłości, które może poprawić nasze życie i otworzyć nowe możliwości
            w każdej dziedzinie.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ONas;
  