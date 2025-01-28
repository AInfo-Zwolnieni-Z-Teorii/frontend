import React from "react";

const Navigation = () => {
	return (
		<header className="flex items-center py-7  bg-white w-full lg:px-0 px-10 lg:w-4/5 xl:w-4/5  justify-between mx-auto">
			{/* Logo Section */}
			<div className="flex items-center gap-10 flex-1">
				<img
					src="/assets/AINFO_LOGO.png"
					alt="AI Info Logo"
					className="w-20"
					aria-label="AI Info Logo"
				/>
				<h1 className="xl:text-3xl lg:text-2xl text-xl font-bold leading-none">
					<span className="text-main_dark_blue">AI</span>
					<span className="text-black">nfo</span>
				</h1>
			</div>

			{/* Navigation Section */}
			<nav
				className="flex items-center justify-center flex-1 gap-6 sm:gap-5 md:gap-12 lg:gap-16 xl:gap-24"
				aria-label="Main Navigation"
			>
				<a
					href="/"
					className="text-black font-light hover:text-blue-500 xl:text-3xl md:text-xl text-lg flex-initial"
					aria-label="Navigate to Home"
				>
					Home
				</a>
				<a
					href="#about"
					className="text-black font-light hover:text-blue-500 xl:text-3xl md:text-xl text-lg flex-initial"
					aria-label="Navigate to About Us"
				>
					O&nbsp;nas
				</a>
				<a
					href="#contact"
					className="text-black font-light hover:text-blue-500 xl:text-3xl md:text-xl text-lg flex-initial"
					aria-label="Navigate to Contact"
				>
					Kontakt
				</a>
				<a href="/log-in">
					<button
						className="bg-blue-300 font-light text-blue-600 px-6 py-2 lg:px-12 lg:py-3 xl:px-13 xl:py-3 rounded-full hover:bg-blue-200 xl:text-3xl md:text-xl text-lg flex-2"
						aria-label="Log in to your account"
					>
						Log&nbsp;in
					</button>
				</a>
			</nav>
		</header>
	);
};

export default Navigation;
