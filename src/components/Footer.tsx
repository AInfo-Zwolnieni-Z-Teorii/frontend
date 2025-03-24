// File: Footer.jsx

import React from "react";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-footer_bg w-full mt-auto">
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-center items-center py-10 md:py-12 lg:py-16 xl:py-20 mx-auto">
        {/* Icons container - exactly half width on non-mobile */}
        <div className="w-full md:w-1/2 flex justify-center gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          <a 
            href="https://www.instagram.com/ainfo_project/" 
            aria-label="Instagram" 
            className="text-pink-600"
            target="_blank"
          >
            <FaInstagram className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 3xl:w-28 3xl:h-28 4xl:w-32 4xl:h-32" />
          </a>
          <a 
            href="https://www.facebook.com/groups/1336341120619650/?ref=share&rdid=LZbYprfb0RdIY4Qo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fg%2F1CniuPP7Co"
            aria-label="Facebook" 
            className="text-blue-600"
            target="_blank"
          >
            <FaFacebook className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 3xl:w-28 3xl:h-28 4xl:w-32 4xl:h-32" />
          </a>
          <a 
            href="https://www.tiktok.com/@ainfo_project" 
            aria-label="TikTok" 
            className="text-black"
            target="_blank"
          >
            <FaTiktok className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 3xl:w-28 3xl:h-28 4xl:w-32 4xl:h-32" />
          </a>
        </div>

        {/* Text container - exactly half width on non-mobile */}
        <div className="w-full md:w-1/2 flex flex-col gap-3 md:gap-4 lg:gap-5 justify-center items-center mt-4 md:mt-0">
          <p className="font-medium text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl">
            ainfoproject2024@gmail.com
          </p>
          <p className="font-medium">
            <Link 
              to={"/privacy-policy"} 
              className="text-gray-500 hover:text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl"
            >
              Polityka Prywatności
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;