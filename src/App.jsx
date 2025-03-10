import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import GridImages from "./components/GridImages";
import Footer from "./components/Footer";
import BlogTile from "./components/BlogTile";
import BlogCreation from "./pages/BlogCreation";
import BlogReview from "./pages/BlogReview"; // Import BlogReview
import Login from "./pages/LogIn";
import LoginAddSite from "./pages/LogInAddSite";
import PostSite from "./pages/PostSite";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import Error404 from "./pages/Error404";
import ErrorBoundary from "./ErrorBoundary";
import Contact from "./pages/Contact";
import ONas from "./pages/oNas";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookieConsent from "./components/CookiesConsent";

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	return (
		<ErrorBoundary>
			<Router>
				<div className="flex flex-col min-h-screen w-full">
					<Navigation />

					<main className="flex-1">
						<Routes>
							{/* Home Page */}
							<Route
								path="/"
								element={
									<>
										<GridImages />
										<BlogTile />
									</>
								}
							/>
							{/* Blog Creation Page */}
							<Route
								path="/blog-create"
								element={
									isAuthenticated ? (
										<BlogCreation />
									) : (
										<Navigate to="/log-in-add-site" />
									)
								}
							/>
							{/* Blog Review Page */}
							<Route path="/blog-review" element={<BlogReview />} />
							<Route path="/o-nas" element={<ONas />} />
							{/* search */}
							<Route path="/search" element={<Search />} />
							{/* contact */}
							<Route path="/contact" element={<Contact />} />
							{/* Log In */}
							<Route path="/log-in" element={<Login />} />
							{/* Log In 2 */}
							<Route
								path="/log-in-add-site"
								element={<LoginAddSite setAuth={setIsAuthenticated} />}
							/>
							{/* Sign In */}
							<Route path="/sign-in" element={<SignIn />} />
							{/*Pricacy Policy */}
							<Route path="/privacy-policy" element={<PrivacyPolicy />} />
							{/* Post */}
							<Route path="/post/:slug" element={<PostSite />} />
							{/* Inne trasy */}
							<Route path="*" element={<Error404 />} /> {/* Obsługa 404 */}
						</Routes>
					</main>
					
					<CookieConsent />
					<Footer />
				</div>
			</Router>
		</ErrorBoundary>
	);
};

export default App;
