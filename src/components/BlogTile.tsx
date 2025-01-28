import React from "react";
import { Link, useNavigate } from "react-router-dom";
const posts = [
	{
		id: 1,
		image: "/assets/image1.png",
		title: "Chiny - nowa choroba, czy można się wyleczyć?",
		category: "Azja",
		date: "05 lutego 2025",
	},
	{
		id: 2,
		image: "/assets/image1.png",
		title: "Chiny - nowa choroba, czy można się wyleczyć?",
		category: "Azja",
		date: "05 lutego 2025",
	},
	{
		id: 3,
		image: "/assets/image1.png",
		title: "Chiny - nowa choroba, czy można się wyleczyć?",
		category: "Azja",
		date: "05 lutego 2025",
	},
	{
		id: 4,
		image: "/assets/image1.png",
		title: "Chiny - nowa choroba, czy można się wyleczyć?",
		category: "Azja",
		date: "05 lutego 2025",
	},
];

const BlogTile = () => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col w-4/5 mx-auto space-y-6">
			{posts.map((post) => (
				<button
					key={post.id}
					className="flex flex-col md:flex-row justify-between rounded-lg py-4"
					onClick={() => navigate("/post")}
				>
					{/* Image Section */}
					<div className="w-full md:w-1/3 mb-4 md:mb-0">
						<img
							src={post.image}
							alt={post.title}
							className="rounded-lg w-full h-auto object-cover"
						/>
					</div>

					{/* Text Content */}
					<div className="flex flex-col justify-between w-full md:w-2/3 md:ml-6">
						{/* Title */}
						<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-auto">
							{post.title}
						</h1>

						{/* Meta Info */}
						<div className="flex items-center text-sm text-gray-500 mt-auto space-x-4">
							<span className="flex items-center space-x-1">
								<span className="font-medium">#</span>
								<span>{post.category}</span>
							</span>
							<span className="flex items-center space-x-1">
								<img src="/assets/clock.svg" alt="Clock" className="w-4 h-4" />
								<span>{post.date}</span>
							</span>
						</div>
					</div>
				</button>
			))}
			<div className="flex justify-center">
				<Link to="/blog-creation" className="mx-auto">
					<img src="/assets/plus.svg" alt="Dodaj Bloga" className="w-20 my-8" />
				</Link>
			</div>
		</div>
	);
};

export default BlogTile;
