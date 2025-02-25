import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IPost } from "../interfaces/featuredPost";
import { API_BASE_URL } from "../config";

const GridImages = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/posts/featured`
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

  return (
    <div className="w-4/5 mx-auto pb-14 pt-3 flex align-center justify-center">
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
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
            />
          </motion.div>
        ) : error ? (
          <p>{error}</p>
        ) : posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <div className="md:grid md:grid-cols-3 md:gap-5 md:h-grid-template w-full max-w-[1500px]">
            <div className="md:col-span-2 md:row-span-2">
              <motion.div
                key={posts[0].slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative bg-cover bg-center shadow overflow-hidden h-[calc(100vh-200px)] max-w-[1000px] md:h-full w-full cursor-pointer"
                style={{ backgroundImage: `url(${posts[0].thumbnailName})` }}
                onClick={() => navigate(`/post/${posts[0].slug}`)}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="absolute bottom-2 left-2 text-white p-7">
                  <h3 className="font-bold text-3xl md:text-5xl pb-8 md:pb-16 hover:text-blue-300">
                    {posts[0].title}
                  </h3>
                  <div className="text-base md:text-lg mt-2">
                    <span className="hover:text-blue-200">#{posts[0].categories.map((cat) => cat.name).join(", ")}</span>
                    <span className="ml-4">
                      {new Date(posts[0].creationDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
            {posts.slice(1, 6).map((post) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative bg-cover bg-center shadow overflow-hidden h-64 md:h-full w-full hidden md:block max-w-[500px] cursor-pointer"
                style={{ backgroundImage: `url(${post.thumbnailName})` }}
                onClick={() => navigate(`/post/${post.slug}`)}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-bold text-lg hover:text-blue-300">{post.title}</h3>
                  <div className="text-sm mt-2">
                    <span className="hover:text-blue-200">#{post.categories.map((cat) => cat.name).join(", ")}</span>
                    <span className="ml-4">
                      {new Date(post.creationDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GridImages;