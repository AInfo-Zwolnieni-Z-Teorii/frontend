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

const App = () => {
  return (
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
          {/* Log In */}
          <Route path="/log-in" element={<Login />} />
          {/* Post */}
          <Route path="/post" element={<PostSite />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;