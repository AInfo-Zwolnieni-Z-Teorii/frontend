import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { IPost, IValidationError } from "../interfaces/postList";
import React from "react";

const BlogTile = () => {
	const [limit, setLimit] = useState(7);
	const [posts, setPosts] = useState<IPost[] | IValidationError>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [limitIncreased, setLimitIncreased] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true);
			const response = await fetch(`/api/posts?limit=${limit}`);

			if (!response.ok) {
				console.error("Error fetching posts");
				setIsLoading(false);
				return;
			}

			const data: IPost[] | IValidationError = await response.json();
			console.log(data);

			setPosts(data);
			setIsLoading(false);
		};

		fetchPosts();
	}, [limit]);
	const increaseLimit = () => {
		console.log("Limit increased");
		setLimit(20); // U
		setLimitIncreased(true);
	};

	return (
		<div className="flex flex-col mx-auto space-y-6 w-4/5 max-w-[1500px]">
			<AnimatePresence>
				{isLoading ? (
					<motion.div
						key="loader"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="flex justify-center items-center h-40"
					>
						<motion.div
							animate={{ rotate: 360 }}
							transition={{
								duration: 1,
								repeat: Number.POSITIVE_INFINITY,
								ease: "linear",
							}}
							className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
						/>
					</motion.div>
				) : Array.isArray(posts) ? (
					posts.map((post) => (
						<motion.button
							key={post.slug}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}
							className="flex flex-col md:grid md:grid-cols-[1fr,2fr] place-content-center rounded-lg py-4 min-h-40"
							onClick={() => navigate(`/post/${post.slug}`)}
						>
							{/* Image Section */}
							<div className="">
								<img
									src={post.thumbnailName}
									alt={post.title}
									className="rounded-lg w-full h-auto object-cover "
								/>
							</div>

							{/* Text Content */}
							<div className="h-full flex flex-col justify-between items-start px-4 lg:py-4">
								{/* Title */}
								<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 hover:text-blue-500 text-left">
									{post.title}
								</h1>

								{/* Meta Info */}
								<div className="mt-auto">
									<div className="flex items-center text-sm text-gray-500 space-x-4">
										<span className="flex items-center space-x-1">
											<span className="font-medium">#</span>
											<span className="hover:text-blue-300">
												{post.categories && post.categories.length > 0
													? post.categories
															.map((category) => category.name)
															.join(", ")
													: "Brak kategorii"}
											</span>
										</span>
										<span className="flex items-center space-x-1">
											<img
												src="/assets/clock.svg"
												alt="Clock"
												className="w-4 h-4"
											/>
											<span>
												{new Date(post.creationDate).toLocaleDateString()}
											</span>
										</span>
									</div>
								</div>
							</div>
						</motion.button>
					))
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						Wystąpił błąd pobierania postów
					</motion.div>
				)}
			</AnimatePresence>
			<div className="flex justify-center mx-auto">
				{!limitIncreased && ( // Conditionally render button
					<button onClick={increaseLimit} className="focus:outline-none">
						<img
							src="/assets/plus.svg"
							alt="Zwiększ limit"
							className="w-20 my-8"
						/>
					</button>
				)}
			</div>
		</div>
	);
};

export default BlogTile;
