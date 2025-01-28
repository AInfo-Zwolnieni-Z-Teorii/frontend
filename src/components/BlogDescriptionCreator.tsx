// File: BlogForm.jsx

import React, { useState } from "react";

const BlogForm = ({ onSubmit }) => {
	const [blogContent, setBlogContent] = useState("");

	const handleInputChange = (event) => {
		setBlogContent(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(blogContent);
	};
	return (
		<div className="min-h-screen flex items-center justify-center p-4 w-full">
			<form onSubmit={handleSubmit} className="rounded-lg p-8 w-full max-w-4xl">
				<h1 className="text-xl font-semibold text-gray-800 mb-6 text-center">
					Podaj treść twojego <br />
					Bloga:
				</h1>
				<textarea
					value={blogContent}
					onChange={handleInputChange}
					placeholder="Wpisz tutaj treść swojego bloga..."
					className="w-full h-[50vh] p-4 shadow-lg border-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
				/>
				<button
					type="submit"
					className="mt-6 w-1/4 mx-auto flex items-center gap-2 justify-center border border-blue-600 text-blue-600 font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
				>
					<img src="/assets/magic.svg" alt="magic wand" className="w-5 mr-2" />
					<span>STWÓRZ BLOG</span>
				</button>
			</form>
		</div>
	);
};

export default BlogForm;
