import React from "react";
import { useLocation } from "react-router-dom";

const BlogReview = () => {
	const location = useLocation();
	const { state } = location || {};
	const { name, image, categories, content } = state || {};

	if (!state) {
		return <div>No data provided. Please submit the form first.</div>;
	}

	return (
		<div className="min-h-screen flex flex-col items-center p-6 pt-24 bg-slate-50">
			<h1 className="text-4xl font-bold text-blue-600 mb-6">
				Twój blog wygląda tak:
			</h1>
			<div className="w-full bg-white p-6 pb-1 rounded-lg shadow-lg flex flex-col items-center justify-center">
				<h1 className="pt-10 pb-1 mb-9 text-3xl font-light text-blue-600 border-b-2 border-blue-600">
					{name}
				</h1>
				<div className="grid grid-cols-4 gap-4 pt-10 pb-4 w-3/4 mx-auto">
					{categories.map((type) => (
						<div
							key={type}
							className={
								"lg:px-12 md:px-8 lg:py-8 md:py-5 py-3 px-5 rounded-md font-medium text-sm lg:text-lg xl:text-xl shadow-lg bg-gray-50 text-gray-800 flex align-center justify-center"
							}
						>
							{type}
						</div>
					))}
				</div>
				<div className="py-10 w-3/4 mx-auto">
					<img
						src={URL.createObjectURL(image)}
						alt="wybrane zdjecie"
						className="w-full"
					/>
				</div>
				<div className="pt-10 pb-28 w-3/5 mx-auto">
					<h2 className="text-2xl">{content}</h2>
				</div>
				<div className="w-full gap-5 flex justify-end items-center mx-auto my-10">
					<button className=" border-2 font-bold font-xl rounded-lg border-blue-600 py-5 px-5 text-blue-600 hover:bg-slate-100 hover:border-blue-400 hover:text-blue-400">
						<img src="/assets/edit.png" alt="" />
					</button>
					<button className=" border-2 font-bold font-xl rounded-lg border-blue-600 py-5 px-28 text-blue-600 hover:bg-slate-100 hover:border-blue-400 hover:text-blue-400">
						Potwierdź
					</button>
				</div>
			</div>
		</div>
	);
};

export default BlogReview;
