import React from "react";

const FooterButton = ({ text }) => {
  return (
    <div>
      <a
        className="relative text-[#838383] hover:text-black transition-colors duration-300 
        after:content-[''] after:absolute after:left-0 after:bottom-[-4px] 
        after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 
        hover:after:w-full font-medium cursor-pointer"
      >
        {text}
      </a>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-[#EBEBEB] py-6">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Logo & Slogan */}
          <div className="space-y-2 cursor-default">
            <p className="text-3xl sm:text-4xl font-bold text-black">SolEdge</p>
            <p className="text-lg sm:text-xl text-[#838383] font-medium">
              Powering Tomorrow, Naturally.
            </p>
          </div>

          {/* About Section */}
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold cursor-default">About</h3>
            <nav className="flex flex-col space-y-1 text-lg font-semibold text-[#838383]">
              <FooterButton text="Contact" />
              <FooterButton text="Blog" />
              <FooterButton text="Our Story" />
            </nav>
          </div>

          {/* Company Section */}
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold cursor-default">Company</h3>
            <nav className="flex flex-col space-y-1 text-lg font-semibold text-[#838383]">
              <FooterButton text="Press" />
              <FooterButton text="Terms of Service" />
              <FooterButton text="Privacy Policy" />
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;