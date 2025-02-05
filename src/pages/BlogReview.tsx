import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BlogReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blogData = location.state;

  const handleEdit = () => {
    navigate("/blog-creation", { state: { blogData } });
  };

  if (!blogData) {
    return <div>No data provided. Please submit the form first.</div>;
  }

  const { name, image, categories, content } = blogData;

  return (
    <div className="min-h-screen flex flex-col items-center p-6 pt-12 bg-slate-50">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Twój blog wygląda tak:</h1>
      
      <article className="w-full max-w-5xl bg-white rounded-lg shadow-lg">
        {/* Author info and post title */}
        <div className="mb-6 px-8 py-4 border-b">
          <div className="flex items-center gap-3 mb-4">
            <img src="/assets/AINFO_LOGO.png" alt="Author" width={32} height={32} className="rounded-full" />
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Author Name</span>
                <span className="mx-2">•</span>
                <span>Autor blogu</span>
              </div>
              <div className="text-sm text-gray-600">{new Date().toLocaleDateString("pl-PL")}</div>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 px-8 my-4">
          {categories.map((category) => (
            <span
              key={category}
              className="px-4 py-1 text-sm text-white bg-indigo-600 rounded-md"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Table of Contents and Main Image */}
        <div className="flex flex-col md:flex-row gap-6 px-8 my-6">
          <aside className="w-full md:w-1/4">
            <h2 className="text-lg font-semibold mb-3">SPIS TREŚCI</h2>
            <div className="space-y-2">
              {content.content?.[0]?.map((item, index) => (
                item.text?.[0]?.header && (
                  <a 
                    href={`#${item.text[0].anchor}`} 
                    key={index}
                    className="block text-sm text-gray-700 hover:text-indigo-600"
                  >
                    {item.text[0].header}
                  </a>
                )
              ))}
            </div>
          </aside>
          <div className="w-full md:w-3/4">
            {image && image.preview && (
              <img
                src={image.preview}
                alt="Main blog image"
                className="w-full rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="px-8 pb-8">
          <section className="space-y-8">
            {content.content?.[0]?.map((item, index) => {
              switch (item.type) {
                case "text":
                  return (
                    <div key={index} id={item.text?.[0].anchor} className="prose max-w-none">
                      <h2 className="text-xl font-semibold mb-3">{item.text?.[0].header}</h2>
                      <p className="text-gray-700">{item.text?.[0].paragraph}</p>
                    </div>
                  );
                case "image":
                  return (
                    <img
                      key={index}
                      src={item.image?.src}
                      alt={item.image?.alt}
                      className="w-full rounded-lg"
                    />
                  );
                case "image-text":
                  return (
                    <div key={index} className={`flex flex-col md:flex-row gap-6 ${item.layout === "right" ? "md:flex-row-reverse" : ""}`}>
                      <div className="w-full md:w-1/2">
                        <img
                          src={item.image?.src}
                          alt={item.image?.alt}
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        {item.text?.map((textItem, textIndex) => (
                          <div key={textIndex} id={textItem.anchor} className="prose max-w-none">
                            <h2 className="text-xl font-semibold mb-3">{textItem.header}</h2>
                            <p className="text-gray-700">{textItem.paragraph}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </section>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 px-8 py-4 border-t">
          <button 
            onClick={handleEdit}
            className="p-2 border-2 border-blue-600 rounded-lg text-blue-600 hover:bg-slate-50"
          >
            <img src="/assets/edit.png" alt="Edit" className="w-6 h-6" />
          </button>
          <button 
            className="px-8 py-2 border-2 border-blue-600 rounded-lg text-blue-600 hover:bg-slate-50"
          >
            Potwierdź
          </button>
        </div>
      </article>
    </div>
  );
};

export default BlogReview;