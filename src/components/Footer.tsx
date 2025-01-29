// File: Footer.jsx

import React from "react";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-footer_bg flex justify-center align-center h-auto w-full" >
      <div className="w-1/2 md:w-full flex flex-col gap-4 md:gap-0 justify-center items-center md:flex-row py-20">
        <div className="flex align-middle justify-center gap-8 w-1/2">
          <a href="#instagram" aria-label="Instagram" className="text-pink-600 text-2xl">
            <FaInstagram style={{fontSize:"5rem"}} />
          </a>
          <a href="#facebook" aria-label="Facebook" className="text-blue-600 text-2xl">
            <FaFacebook style={{fontSize:"5rem"}} />
          </a>
          <a href="#tiktok" aria-label="TikTok" className="text-black text-2xl">
            <FaTiktok style={{fontSize:"5rem"}}/>
          </a>
        </div>
        <div className="">
          <p className="font-medium text-2xl sm:text-3xl md:font-text-3.5xl lg:text-4xl xl:text-5xl">aiproject2024@gmail.com</p>

        </div>
      </div>
      
    </footer>
  );
};

export default Footer;