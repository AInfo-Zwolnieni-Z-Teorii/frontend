// src/components/SectionContent.tsx
import React from "react";

const SectionContent: React.FC = () => {
  return (
    <main className="flex-1 bg-white shadow-md p-6 space-y-6">
      <section>
        <h2 className="text-2xl font-bold">Czym jest Lorem Ipsum?</h2>
        <p>
          Lorem Ipsum, czyli sztuczne inteligentne teksty, to dziedzina nauki zajmująca się tworzeniem systemów...
        </p>
        <img src="image.png" alt="Section illustration" className="mt-4 rounded-md" />
      </section>

      <section>
        <h2 className="text-2xl font-bold">Lorem Ipsum w pracy</h2>
        <p>
          Automatyzacja procesów zmienia sposób, w jaki pracujemy. Lorem Ipsum wspiera nas w analizie danych...
        </p>
        <img src="image.png" alt="Section illustration" className="mt-4 rounded-md" />
      </section>

      <section>
        <h2 className="text-2xl font-bold">Etyka i zagrożenia Lorem Ipsum</h2>
        <p>
          Czy Lorem Ipsum może być zagrożeniem? Rozwój tej technologii rodzi wiele pytań o prywatność...
        </p>
        <img src="image.png" alt="Section illustration" className="mt-4 rounded-md" />
      </section>

      <section>
        <h2 className="text-2xl font-bold">Kreatywność z Lorem Ipsum</h2>
        <p>
          Sztuczne inteligentne teksty nie tylko analizują dane, ale również tworzą. Lorem Ipsum komponuje...
        </p>
        <img src="image.png" alt="Section illustration" className="mt-4 rounded-md" />
      </section>
    </main>
  );
};

export default SectionContent;