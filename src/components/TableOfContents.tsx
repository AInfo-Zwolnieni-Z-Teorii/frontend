// src/components/TableOfContents.tsx
import React from "react";

const TableOfContents: React.FC = () => {
  return (
    <aside className="w-full md:w-1/4 bg-white shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Spis Treści</h2>
      <ul className="space-y-2">
        <li>Czym jest Lorem Ipsum?</li>
        <li>Lorem Ipsum w codziennym życiu</li>
        <li>Lorem Ipsum w pracy</li>
        <li>Lorem Ipsum + medycyna</li>
        <li>Zagrożenia Lorem Ipsum</li>
        <li>Kreatywność Lorem Ipsum</li>
        <li>Przyszłość Lorem Ipsum</li>
        <li>Lorem Ipsum zastąpi człowieka?</li>
      </ul>
    </aside>
  );
};

export default TableOfContents;