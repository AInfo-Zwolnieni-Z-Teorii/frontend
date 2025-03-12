import { useState, useRef, useEffect } from "react";
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
      const imageUrl = URL.createObjectURL(file);

      const newBlocks = [...blocks];
      const block = newBlocks[blockIndex];
      if (block.image) {
        block.image.src = file;
      }
      setBlocks(newBlocks);

      setSelectedImages(prev => ({
        ...prev,
        [blockIndex]: imageUrl
      }));
    }
  };

  useEffect(() => {
    return () => {
      Object.values(selectedImages).forEach(url => {
        if (typeof url === 'string' && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [selectedImages]);

  const handleRemoveImage = (blockIndex: number) => {
    const imageUrl = selectedImages[blockIndex];
    if (typeof imageUrl === 'string' && imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl);
    }

    const newSelectedImages = { ...selectedImages };
    delete newSelectedImages[blockIndex];
    setSelectedImages(newSelectedImages);
    
    const newBlocks = [...blocks];
    if (newBlocks[blockIndex].image) {
      newBlocks[blockIndex].image!.src = "";
    }
    setBlocks(newBlocks);
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
      <div 
        className={`border-2 border-dashed ${
          selectedImages[blockIndex] ? 'border-blue-600' : 'border-blue-300'
        } rounded-xl p-8 text-center bg-blue-50 transition-colors duration-200`}
      >
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
            <div className="w-full min-h-[300px] max-h-[500px] mb-4 relative flex items-center justify-center">
              <img
                src={selectedImages[blockIndex]}
                alt="Selected"
                className="rounded-lg max-w-full max-h-full object-contain"
              />
            </div>
            <button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
              onClick={() => handleRemoveImage(blockIndex)}
            >
              Usuń zdjęcie
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center py-8">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded flex items-center mb-4 transition-colors"
              onClick={() => fileInputRefs.current[blockIndex]?.click()}
            >
              <span>Dołącz zdjęcie z komputera</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 13.586V3a1 1 0 011-1z" />
              </svg>
            </button>
            <p className="text-gray-700 font-medium">lub przeciągnij i upuść plik tutaj</p>
          </div>
        )}
      </div>
      
      <input
        type="text"
        placeholder="Opis zdjęcia (alt)"
        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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