import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import GridImages from "./components/GridImages";
import Footer from "./components/Footer";
import BlogTile from "./components/BlogTile";
import BlogCreation from "./pages/BlogCreation";
import BlogReview from "./pages/BlogReview"; // Import BlogReview
import Login from "./pages/LogIn";
import PostSite from "./pages/PostSite";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import Error404 from "./pages/Error404";
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
    <Router>
      
      <div className="flex align-middle justify-center flex-col w-full h-full">
        
        <Navigation />
       
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
          <Route path="/blog-creation" element={<BlogCreation />} />
          {/* Blog Review Page */}
          <Route path="/blog-review" element={<BlogReview />} />
          {/* search */}
          <Route path="/search" element={<Search />} />
          {/* Log In */}
          <Route path="/log-in" element={<Login />} />
          {/* Sign In */}
          <Route path="/sign-in" element={<SignIn />} />
          {/* Post */}
          <Route path="/post" element={<PostSite />} />
          {/* Inne trasy */}
          <Route path="*" element={<Error404 />} /> {/* Obsługa 404 */}
        </Routes>
        
        <Footer />
      </div>
    </Router>
    </ErrorBoundary>

  );
};

export default App;