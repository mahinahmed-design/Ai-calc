import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md  shadow-sm z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Title */}
        <div className="text-white font-semibold text-2xl tracking-wide  ">
          AI Calculator
        </div>

        {/* Byline */}
        <span className="text-white/70 text-m">By Mahin</span>
      </div>
    </header>
  );
};

export default Header;
