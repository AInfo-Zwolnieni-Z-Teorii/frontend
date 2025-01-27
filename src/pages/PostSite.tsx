import React from 'react'
import { Star } from 'lucide-react'

export default function PostSite() {
  return (
    <article className="max-w-7xl mx-auto px-4 py-8">
      {/* Author info and post title */}
      <div className=" mb-10 shadow-xl px-12 py-5">
        <div className="flex items-center gap-4 mb-6">
          <img
            src="../assets/AINFO_LOGO.png"
            alt="Joe Biden"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="flex items-center gap-8">
            <div className="text-gray-600">
              <span className="font-medium text-gray-900">Joe Biden</span>
              <span className="mx-2">•</span>
              <span>Autor blogu</span>
            </div>
            <div className="text-gray-600">20 stycznia 2025</div>
            <div className="flex items-center gap-4">
              <div className="text-gray-600">
                Ranking: 
                <span className="ml-1 font-medium text-gray-900">4.8</span>
                <Star className="inline-block w-4 h-4 ml-1 text-yellow-400 fill-current" />
              </div>
              <div className="text-gray-600">
                Recenzji: <span className="font-medium text-gray-900">2</span>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-6">Czy AI Zmieni Nasze Życie na Zawsze?</h1>
        <p className="text-xl text-gray-600">
          Wprowadzenie do sztucznej inteligencji – jak działa i dlaczego stała się tak popularna. 
          Jakie aplikacje i technologie z AI już nas otaczają, od smartfonów po inteligentne domy. 
          Czy AI może stać się zagrożeniem? Rozważania o etyce, prywatności i bezpieczeństwie.
        </p>
      </div>

      {/* Categories */}
      <div className="flex gap-4 my-8">
        <button className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
          życie bez AI
        </button>
        <button className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
          AI
        </button>
      </div>

      
        {/* Table of Contents */}
        <div className='flex flex-row w-full'>
            <aside className="w-1/4 shrink-0">
                <h2 className="text-xl font-semibold mb-4">SPIS TREŚCI</h2>
                <div className="space-y-2">
                    {[
                    "Czym jest AI?",
                    "AI w codziennym życiu",
                    "AI w pracy",
                    "AI + medycyna",
                    "zagrożenia AI",
                    "kreatywność AI",
                    "Przyszłość AI",
                    "AI zastąpi człowieka"
                    ].map((item) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                        <span className="text-gray-700">{item}</span>
                    </label>
                    ))}
                </div>
            </aside>
            <img
                src="data:image/png;base64,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"
                alt="AI Technology Visualization"
                width={1200}
                height={600}
                className="w-3/4 rounded-lg mb-12"
            />
        </div>
        
        <div className="flex gap-12">
        {/* Main Content */}
        <div className="flex-1">

          <section className="space-y-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Czym jest AI?</h2>
              <p className="text-gray-700">
                AI, czyli sztuczna inteligencja, to dziedzina nauki zajmująca się tworzeniem systemów, które potrafią uczyć się, analizować dane i podejmować decyzje. Dzięki postępowi technologicznemu AI staje się coraz bardziej zaawansowana, a jej zastosowania są niemal nieograniczone. Nie zdajemy sobie sprawy, jak często korzystamy z AI. Asystenci głosowi, aplikacje do tłumaczeń, rekomendacje filmów na Netflixie – to tylko kilka przykładów, jak AI ułatwia nam życie.
              </p>
            </div>

            <div className="flex gap-8">
              <img
                src="data:image/png;base64,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"
                alt="AI Robot Head"
                width={600}
                height={400}
                className="w-1/2 rounded-lg"
              />
              <div className="w-1/2">
                <h2 className="text-2xl font-semibold mb-4">AI w pracy</h2>
                <p className="text-gray-700">
                  Automatyzacja procesów biznesowych i produkcyjnych zmienia sposób, w jaki pracujemy. AI wspiera nas w analizie danych, obsłudze klienta, a nawet w rekrutacji. Jednak pojawiają się pytania o przyszłość pracy i rolę człowieka w zautomatyzowanym świecie.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Sztuczna inteligencja a medycyna</h2>
                <p className="text-gray-700">
                  AI rewolucjonizuje medycynę, wspierając lekarzy w diagnostyce, analizie wyników badań czy projektowaniu nowych leków. Dzięki AI możliwe jest szybsze wykrywanie chorób i bardziej precyzyjne leczenie.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Etyka i zagrożenia AI</h2>
              <p className="text-gray-700 mb-4">
                Czy AI może być zagrożeniem? Rozwój tej technologii rodzi wiele pytań o prywatność, bezpieczeństwo i kontrolę. Ważne jest, aby rozwijać AI w sposób odpowiedzialny, z poszanowaniem wartości etycznych.
              </p>
              <img
                src="data:image/png;base64,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"
                alt="ChatGPT Interface"
                width={1200}
                height={400}
                className="w-full rounded-lg"
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Kreatywność z AI</h2>
              <p className="text-gray-700">
                Sztuczna inteligencja nie tylko analizuje dane, ale również tworzy. AI komponuje muzykę, maluje obrazy i pisze książki. Czy to oznacza, że wkrótce maszyny zastąpią artystów?
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Przyszłość AI – co nas czeka?</h2>
              <p className="text-gray-700">
                Przyszłość AI zapowiada się ekscytująco. Autonomiczne pojazdy, inteligentne systemy edukacyjne czy eksploracja kosmosu – możliwości są niemal nieograniczone. Jednak z każdą nową technologią pojawiają się także wyzwania.
              </p>
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}