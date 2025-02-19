import { useEffect, useState } from "react";
import type { DetailedPost } from "../interfaces/postSite";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function PostSite() {
	const [post, setPost] = useState<DetailedPost | null>(null);
	const [error, setError] = useState<string | null>(null);
	const { slug } = useParams<{ slug: string }>();

	useEffect(() => {
		const fetchPost = async () => {
			if (!slug) {
				setError("No slug provided");
				return;
			}

			try {
				const url = `https://ainfo-api.vercel.app/api/posts/full/${slug}`;
				const response = await fetch(url);
				console.log(url);

				if (response.status === 404) {
					setError("Post not found");
					return;
				}

				if (!response.ok) {
					const errorData = await response.json();
					if (errorData.errors) {
						setError(errorData.errors[0].msg);
					} else {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					return;
				}

				const data: DetailedPost = await response.json();
				// Decode content if necessary
				data.content = data.content.map((block) =>
					block.map((item) => {
						if (item.type === "text" && item.text) {
							item.text = item.text.map((textItem) => ({
								...textItem,
								paragraph: JSON.parse(`"${textItem.paragraph}"`),
							}));
						}
						return item;
					})
				);
				setPost(data);
			} catch (e) {
				console.error("Error fetching post:", e);
				setError(
					`Error fetching post: ${e instanceof Error ? e.message : String(e)}`
				);
			}
		};

		fetchPost();
	}, [slug]);

	if (error) return <div>Error: {error}</div>;

	// 🔄 Loading Spinner Animation
	if (!post)
		return (
			<div className="flex justify-center items-center h-40">
				<AnimatePresence>
					<motion.div
						key="loader"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="flex justify-center items-center"
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
				</AnimatePresence>
			</div>
		);

	return (
		<article className="max-w-7xl mx-auto px-4 py-8">
			{/* Author info and post title */}
			<div className="mb-10 shadow-xl px-12 py-5">
				<div className="flex items-center gap-4 mb-6">
					<img
						src={`/assets/${post.authorAvatar}`}
						alt={post.author}
						width={37}
						height={37}
						className="rounded-full aspect-square"
					/>
					<div className="flex items-center gap-8">
						<div className="text-gray-600">
							<span className="font-medium text-gray-900">{post.author}</span>
							<span className="mx-2">•</span>
							<span>Autor posta</span>
						</div>
						<div className="text-gray-600">
							{new Date(post.creationDate).toLocaleDateString("pl-PL")}
						</div>
					</div>
				</div>
				<h1 className="text-4xl font-bold mb-6">{post.title}</h1>
				<p className="text-xl text-gray-600">{post.introduction.content}</p>
			</div>

			{/* Categories */}
			<div className="flex gap-4 my-8">
				{post.categories.map((category) => (
					<button
						key={category.slug}
						className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
					>
						{category.name}
					</button>
				))}
			</div>

			{/* Table of Contents and Main Image */}
			<div className="flex flex-row w-full">
				<aside className="w-1/4 shrink-0">
					<h2 className="text-xl font-semibold mb-4">SPIS TREŚCI</h2>
					<div className="space-y-2">
						{post.tableOfContents.flat().map((item) => (
							<a
								href={`#${item.anchor}`}
								key={item.anchor}
								className="block text-gray-700 hover:text-indigo-600"
							>
								{item.header}
							</a>
						))}
					</div>
				</aside>
				<img
					src={`/assets/${post.thumbnailName}`}
					alt={post.title}
					width={1200}
					height={600}
					className="w-3/4 rounded-lg mb-12"
				/>
			</div>

			<div className="flex gap-12">
				{/* Main Content */}
				<div className="flex-1">
					<section className="space-y-12">
						{post.content.flat().map((item, index) => {
							switch (item.type) {
								case "text":
									return (
										<div key={index} id={item.anchor}>
											<h2 className="text-2xl font-semibold mb-4">
												{item.header}
											</h2>
											<p className="text-gray-700">{item.paragraph}</p>
										</div>
									);
								case "image":
									return (
										<img
											key={index}
											src={`/assets/${item.src}`}
											alt={item.alt}
											width={600}
											height={400}
											className="w-full rounded-lg"
										/>
									);
								case "image-text":
									return (
										<div
											key={index}
											className={`flex gap-8 ${item.layout === "right" ? "flex-row-reverse" : ""}`}
										>
											<img
												src={`/assets/${item.image?.src}`}
												alt={item.image?.alt}
												width={600}
												height={400}
												className="w-1/2 rounded-lg"
											/>
											<div className="w-1/2">
												{item.text?.map((textItem, textIndex) => (
													<div key={textIndex} id={textItem.anchor}>
														<h2 className="text-2xl font-semibold mb-4">
															{textItem.header}
														</h2>
														<p className="text-gray-700">
															{textItem.paragraph}
														</p>
													</div>
												))}
											</div>
										</div>
									);
							}
						})}
					</section>
				</div>
			</div>
		</article>
	);
}
