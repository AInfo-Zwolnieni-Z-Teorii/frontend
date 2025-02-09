import React, { useEffect, useState } from "react";
import { IPost } from "../interfaces/featuredPost";

const GridImages = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(
					"https://ainfo-api.vercel.app/api/posts/featured"
				);

				if (!response.ok) {
					throw new Error("Error fetching posts");
				}

				const data = await response.json();

				setPosts(data.posts);
			} catch (err) {
				setError("Failed to load posts.");
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPosts();
	}, []);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;
	if (posts.length === 0) return <p>No posts available.</p>;

	// Główne wyróżnione posty
	const mainPost = posts.find((post) => post.featured) || posts[0];

	// Pozostałe posty
	const otherPosts = posts.filter((post) => post != mainPost);

	return (
		<div className="w-4/5 mx-auto pb-14 pt-3 flex align-center justify-center">
			<div className="md:grid md:grid-cols-3 md:gap-5 md:h-grid-template w-full max-w-[1500px]">
				<div className="md:col-span-2 md:row-span-2">
					<div
						key={mainPost.slug}
						className="relative bg-cover bg-center shadow overflow-hidden h-[calc(100vh-200px)] max-w-[1000px] md:h-full w-full"
						style={{
							backgroundImage: `url(/assets/${mainPost.thumbnailName})`,
						}}
					>
						<div className="absolute inset-0 bg-black bg-opacity-50"></div>
						<div className="absolute bottom-2 left-2 text-white p-7">
							<h3 className="font-bold text-3xl md:text-5xl pb-8 md:pb-16">
								{mainPost.title}
							</h3>
							<div className="text-base md:text-lg mt-2">
								<span>
									#{mainPost.categories.map((cat) => cat.name).join(", ")}
								</span>
								<span className="ml-4">
									{new Date(mainPost.creationDate).toLocaleDateString()}
								</span>
							</div>
						</div>
					</div>
				</div>
				{otherPosts.slice(0, 5).map((post) => (
					<div
						key={post.slug}
						className="relative bg-cover bg-center shadow overflow-hidden h-64 md:h-full w-full hidden md:block max-w-[500px]"
						style={{ backgroundImage: `url(/assets/${post.thumbnailName})` }}
					>
						<div className="absolute inset-0 bg-black bg-opacity-50"></div>
						<div className="absolute bottom-6 left-6 text-white">
							<h3 className="font-bold text-lg">{post.title}</h3>
							<div className="text-sm mt-2">
								<span>
									#{post.categories.map((cat) => cat.name).join(", ")}
								</span>
								<span className="ml-4">
									{new Date(post.creationDate).toLocaleDateString()}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default GridImages;
