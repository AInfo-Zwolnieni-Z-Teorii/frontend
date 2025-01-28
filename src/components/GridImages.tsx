import React from "react";

const MainPost = {
	id: 1,
	image: "/public/assets/image1.png",
	title: "Dimi, sigma stepów syn, gyatem serce wiodą, ",
	category: "Rosja",
	date: "23 maja 2025",
};

const NewPosts = [
	{
		id: 1,
		image: "/public/assets/image1.png",
		title: "Wraca tam, gdzie świt w Ukrainie słońcem płodą.",
		category: "Rosja",
		date: "23 maja 2025",
	},
	{
		id: 2,
		image: "/public/assets/image1.png",
		title: "Złote łany, duma w piersi, zew wolności w głowie,",
		category: "Azja",
		date: "11 kwietnia 2025",
	},
	{
		id: 3,
		image: "/public/assets/image1.png",
		title: "Matko ziemio, twój ja, Dimi, żyjmy znów w odnowie!",
		category: "Europa",
		date: "28 lutego 2025",
	},
];

const PopularPosts = [
	{
		id: 1,
		image: "/public/assets/image1.png",
		title: "Moskwa - top najlepszych klubów",
		category: "Rosja",
		date: "23 maja 2025",
	},
	{
		id: 2,
		image: "/public/assets/image1.png",
		title: "Filipiny - najlepsze masaże na świecie",
		category: "Azja",
		date: "11 kwietnia 2025",
	},
];

const GridImages = () => {
	return (
		<div className="w-4/5 mx-auto pb-14 pt-3">
			<div className="grid grid-cols-3 gap-5 h-grid-template w-full">
				<div className="col-span-2 row-span-2">
					<div
						key={MainPost.id}
						className="relative bg-cover bg-center shadow overflow-hidden h-full w-"
						style={{ backgroundImage: `url(${MainPost.image})` }}
					>
						<div className="absolute inset-0 bg-black bg-opacity-50"></div>
						<div className="absolute bottom-2 left-2 text-white p-7">
							<h3 className="font-bold text-5xl pb-16">{MainPost.title}</h3>
							<div className="text-lg mt-2">
								<span>#{MainPost.category}</span>
								<span className="ml-4">{MainPost.date}</span>
							</div>
						</div>
					</div>
				</div>
				{PopularPosts.map((post) => (
					<div
						key={post.id}
						className="relative bg-cover bg-center shadow overflow-hidden h-full w-"
						style={{ backgroundImage: `url(${post.image})` }}
					>
						<div className="absolute inset-0 bg-black bg-opacity-50"></div>
						<div className="absolute bottom-6 left-6 text-white">
							<h3 className="font-bold text-lg">{post.title}</h3>
							<div className="text-sm mt-2">
								<span>#{post.category}</span>
								<span className="ml-4">{post.date}</span>
							</div>
						</div>
					</div>
				))}
				{NewPosts.map((post) => (
					<div
						key={post.id}
						className="relative bg-cover bg-center shadow overflow-hidden h-full w-"
						style={{ backgroundImage: `url(${post.image})` }}
					>
						<div className="absolute inset-0 bg-black bg-opacity-50"></div>
						<div className="absolute bottom-6 left-6 text-white">
							<h3 className="font-bold text-lg">{post.title}</h3>
							<div className="text-sm mt-2">
								<span>#{post.category}</span>
								<span className="ml-4">{post.date}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default GridImages;
