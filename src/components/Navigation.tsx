import React, { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="flex items-center py-7 bg-white w-full lg:px-0 px-10 lg:w-4/5 xl:w-4/5 justify-between mx-auto">
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center flex-1 gap-6 sm:gap-5 md:gap-12 lg:gap-16 xl:gap-24" aria-label="Main Navigation">
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

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            className="p-2 text-blue-300 hover:text-blue-400"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu - Now slides down instead of using absolute positioning */}
      <div
        className={`lg:hidden bg-blue-100 transition-all duration-300 ease-in-out ${
          isOpen ? 'h-64' : 'h-0'
        } overflow-hidden`}
      >
        <nav className="flex flex-col p-6 gap-6 text-xl">
          <a
            href="/"
            className="text-black hover:text-blue-500"
            onClick={toggleMenu}
          >
            Home
          </a>
          <a
            href="#about"
            className="text-black hover:text-blue-500"
            onClick={toggleMenu}
          >
            O nas
          </a>
          <a
            href="#contact"
            className="text-black hover:text-blue-500"
            onClick={toggleMenu}
          >
            Kontakt
          </a>
          <a
            href="/sign-in"
            className="text-black hover:text-blue-500"
            onClick={toggleMenu}
          >
            Log in
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navigation;