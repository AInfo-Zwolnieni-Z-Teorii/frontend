import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { ContentItem, DetailedPost, TextContent, ImageContent } from "../interfaces/postSite";
import React from "react";

interface BlogFormProps {
  onSubmit?: (data: Partial<DetailedPost>) => void;
  initialContent?: string;
}

export default function BlogDescriptionCreator({ onSubmit }: BlogFormProps) {
  const [blocks, setBlocks] = useState<ContentItem[]>([]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [selectedImages, setSelectedImages] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();

  const handleAddBlock = (type: string, layout?: "right" | "left") => {
    if (blocks.length >= 10) {
      alert("Maksymalna liczba bloków to 10!");
      return;
    }
    

    const newBlock: ContentItem = {
      type: type as "text" | "image" | "image-text",
      text: type.includes("text") ? [{ header: "", paragraph: "", anchor: `section-${blocks.length}` }] : undefined,
      image: type.includes("image") ? { src: "", alt: "" } : undefined,
      layout: layout,
    };

    setBlocks([...blocks, newBlock]);
  };

  const handleRemoveBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
    const newSelectedImages = { ...selectedImages };
    delete newSelectedImages[index];
    setSelectedImages(newSelectedImages);
  };

  const handleTextChange = (blockIndex: number, textIndex: number, field: keyof TextContent, value: string) => {
    const newBlocks = [...blocks];
    const block = newBlocks[blockIndex];

    if (block.text) {
      block.text[textIndex] = {
        ...block.text[textIndex],
        [field]: value,
        anchor: field === "header" 
          ? `section-${blockIndex}-${value.toLowerCase().replace(/\s+/g, "-")}`
          : block.text[textIndex].anchor,
      };
      setBlocks(newBlocks);
    }
  };

  const handleImageChange = (blockIndex: number, field: keyof ImageContent, value: string) => {
    const newBlocks = [...blocks];
    const block = newBlocks[blockIndex];

    if (block.image) {
      block.image[field] = value;
    }

    setBlocks(newBlocks);
  };

  const handleImageFileChange = (blockIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const newBlocks = [...blocks];
      const block = newBlocks[blockIndex];
      const imageUrl = URL.createObjectURL(file);

      if (block.image) {
        block.image.src = file;
      }

      setBlocks(newBlocks);
      setSelectedImages({ ...selectedImages, [blockIndex]: file });
    }
  };

  const validateBlocks = () => {
    if (blocks.length === 0) {
      alert("Dodaj przynajmniej jeden blok treści!");
      return false;
    }

    for (const block of blocks) {
      if (block.type.includes("text")) {
        if (!block.text?.[0]?.header?.trim()) {
          alert("Wszystkie bloki tekstowe muszą mieć nagłówek!");
          return false;
        }
        if (!block.text?.[0]?.paragraph?.trim()) {
          alert("Wszystkie bloki tekstowe muszą mieć treść!");
          return false;
        }
      }
      if (block.type.includes("image")) {
        if (!block.image?.src) {
          alert("Wszystkie bloki ze zdjęciem muszą mieć dodane zdjęcie!");
          return false;
        }
        if (!block.image?.alt?.trim()) {
          alert("Wszystkie zdjęcia muszą mieć opis alternatywny (alt)!");
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateBlocks()) {
      return;
    }
  
    const tableOfContents = blocks
      .filter((block) => block.text?.[0]?.header)
      .map((block) => ({
        header: block.text![0].header,
        anchor: block.text![0].anchor,
      }));
  
      const postData: Partial<DetailedPost> = {
        content: [blocks], // Tablica tablic
        tableOfContents: [tableOfContents], // Tablica tablic
      };
  
    if (onSubmit) {
      onSubmit(postData);
    } else {
      navigate("/blog-review", {
        state: {
          content: postData,
          name: document.querySelector<HTMLInputElement>('input[placeholder="Wpisz nazwę swojego bloga..."]')?.value || "",
          image: {
            preview: document.querySelector<HTMLImageElement>('.w-40.h-40.object-cover')?.src,
          },
          categories: Array.from(document.querySelectorAll('.bg-blue-600.text-white')).map(
            (el) => el.textContent?.trim() || ""
          ),
        },
      });
    }
  };

  const renderImageUpload = (blockIndex: number) => (
    <div className="flex flex-col gap-3">
      <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-blue-50 h-full flex flex-col justify-center">
        <input
          type="file"
          accept="image/*"
          ref={(el) => {
            fileInputRefs.current[blockIndex] = el;
          }}
          className="hidden"
          onChange={(e) => handleImageFileChange(blockIndex, e)}
        />
        {selectedImages[blockIndex] ? (
          <div className="flex flex-col items-center">
            <img
              src={selectedImages[blockIndex]}
              alt="Selected"
              className="max-w-full max-h-48 object-contain mb-4"
            />
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              onClick={() => {
                const newSelectedImages = { ...selectedImages };
                delete newSelectedImages[blockIndex];
                setSelectedImages(newSelectedImages);
                
                const newBlocks = [...blocks];
                if (newBlocks[blockIndex].image) {
                  newBlocks[blockIndex].image!.src = "";
                }
                setBlocks(newBlocks);
              }}
            >
              Usuń zdjęcie
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              className="w-full max-w-xs mx-auto mb-3 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              onClick={() => fileInputRefs.current[blockIndex]?.click()}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Dołącz zdjęcie z komputera
            </button>
            <p className="text-sm text-gray-500">lub przemieść go tu z foldera</p>
          </>
        )}
      </div>
      <input
        type="text"
        placeholder="Opis zdjęcia (alt)"
        className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => handleImageChange(blockIndex, "alt", e.target.value)}
      />
    </div>
  );

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-12">
          STWÓRZ WŁASNY SZABLON
          <br />
          TWOJEGO BLOGA TAK JAK CHCESZ!
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            { type: "text", label: "POLE TEKSTOWE", color: "bg-green-400 hover:bg-green-500" },
            { type: "image", label: "ZDJĘCIE", color: "bg-blue-600 hover:bg-blue-700" },
            { type: "image-text", label: "ZDJĘCIE|TEKST", color: "bg-blue-600 hover:bg-blue-700", layout: "left" as "left" },
            { type: "image-text", label: "TEKST|ZDJĘCIE", color: "bg-blue-600 hover:bg-blue-700", layout: "right" as "right" },
          ].map((option) => (
            <div key={option.type + (option.layout || '')} className="relative group">
              <button
                onClick={() => handleAddBlock(option.type, option.layout)}
                className={`w-full p-8 text-white text-xl font-semibold rounded-2xl shadow-lg transition-all duration-200 ${option.color}`}
              >
                {option.label}
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {blocks.map((block, blockIndex) => (
            <div key={blockIndex} className="relative bg-white rounded-2xl shadow-lg p-6">
              <button
                type="button"
                onClick={() => handleRemoveBlock(blockIndex)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                {block.type === "text" && (
                  <div className="md:col-span-2 space-y-4">
                    <input
                      type="text"
                      placeholder="Nagłówek"
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={block.text?.[0]?.header || ""}
                      onChange={(e) => handleTextChange(blockIndex, 0, "header", e.target.value)}
                    />
                    <textarea
                      placeholder="Treść"
                      className="w-full p-3 border border-gray-200 rounded-xl h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={block.text?.[0]?.paragraph || ""}
                      onChange={(e) => handleTextChange(blockIndex, 0, "paragraph", e.target.value)}
                    />
                  </div>
                )}

                {block.type === "image" && (
                  <div className="md:col-span-2">
                    {renderImageUpload(blockIndex)}
                  </div>
                )}

                {block.type === "image-text" && (
                  <>
                    <div className={`${block.layout === "right" ? "md:order-2" : "md:order-1"}`}>
                      {renderImageUpload(blockIndex)}
                    </div>
                    <div className={`space-y-4 ${block.layout === "right" ? "md:order-1" : "md:order-2"}`}>
                      <input
                        type="text"
                        placeholder="Nagłówek"
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={block.text?.[0]?.header || ""}
                        onChange={(e) => handleTextChange(blockIndex, 0, "header", e.target.value)}
                      />
                      <textarea
                        placeholder="Treść"
                        className="w-full p-3 border border-gray-200 rounded-xl h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={block.text?.[0]?.paragraph || ""}
                        onChange={(e) => handleTextChange(blockIndex, 0, "paragraph", e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}

          {blocks.length > 0 && (
            <button
              onClick={handleSubmit}
              className="mt-6 w-1/4 mx-auto flex items-center gap-2 justify-center border border-blue-600 text-blue-600 font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              <img src="/assets/magic.svg" alt="magic wand" className="w-5 mr-2" />
              <span>STWÓRZ BLOG</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}