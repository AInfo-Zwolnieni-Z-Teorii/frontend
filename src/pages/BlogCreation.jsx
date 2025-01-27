import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImagePicker from "../components/ImagePicker";
import CategoryPicker from "../components/CategoryPicker";
import BlogForm from "../components/BlogDescriptionCreator";
import BlogName from "../components/BlogName";

const BlogCreation = () => {
  const [formData, setFormData] = useState({
    image: null,
    categories: [],
    content: "",
    name: ""
  });

  const navigate = useNavigate();

  const handleUpdate = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (content) => {
    // Add content to formData
    const updatedFormData = { ...formData, content };

    if (!updatedFormData.name.trim()) {
      alert("Nazwa bloga jest wymagana!");
      return;
    }

    // Validation: Check if all required fields are filled
    if (!updatedFormData.image) {
      alert("Zdjęcie musi być dodane!");
      return;
    }
    if (updatedFormData.categories.length === 0) {
      alert("Musisz wybrać co najmniej jedną kategorię!");
      return;
    }
    if (!updatedFormData.content.trim()) {
      alert("Treść bloga nie może być pusta!");
      return;
    }

    // If validation passes, navigate to the BlogReview page
    navigate("/blog-review", { state: updatedFormData });
  };

  return (
    <div className="flex flex-col justify-center align-middle w-full bg-slate-50">
      <BlogName onUpdate={(name) => handleUpdate("name", name)} />
      <ImagePicker onUpdate={(image) => handleUpdate("image", image)} />
      <CategoryPicker onUpdate={(categories) => handleUpdate("categories", categories)} />
      <BlogForm onSubmit={handleSubmit} />
    </div>
  );
};

export default BlogCreation;