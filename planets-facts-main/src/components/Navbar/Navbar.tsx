import { useState } from "react";
import { Link, useLocation } from "wouter";
import { PLANETS as LINKS } from "../../types/Planets";
import "./navbar.css";

export const Navbar = () => {
  const [openLinks, setOpenLinks] = useState(false);
  const [location] = useLocation();

  const handleClick = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
      <nav className="h-16 floating-header flex justify-between items-center pointer-events-auto relative">
        <div className="corner-brkt corner-brkt-tl scale-75" />
        <div className="corner-brkt corner-brkt-tr scale-75" />
        <div className="corner-brkt corner-brkt-bl scale-75" />
        <div className="corner-brkt corner-brkt-br scale-75" />

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 opacity-80">
            <div className="w-[1px] h-4 bg-nasa-red animate-pulse" />
            <div className="w-[1px] h-3 bg-holo-cyan animate-pulse [animation-delay:0.2s]" />
          </div>
          <Link href="/">
            <h1 className="text-xs font-black tracking-[1em] uppercase hover:text-holo-cyan transition-colors duration-500 cursor-pointer drop-shadow-[0_0_8px_rgba(0,242,255,0.2)]">
              ORBITAL
            </h1>
          </Link>
        </div>

        <button
          onClick={handleClick}
          className={`p-2 rounded flex flex-col gap-1 relative z-20 lg:hidden ${openLinks ? "cross" : ""}`}
        >
          <div className="h-0.5 w-6 bg-white transition-all"></div>
          <div className="h-0.5 w-6 bg-white transition-all"></div>
          <div className="h-0.5 w-6 bg-white transition-all"></div>
        </button>

        <ul id="navbar-menu" className={`navbar-menu flex gap-8 items-center ${openLinks ? "open" : ""}`}>
          {LINKS.map((link, i) => (
            <li key={i} className="relative group">
              <Link
                href={`/planet/${link}`}
                className={`text-[9px] font-black uppercase tracking-[0.4em] transition-all duration-500 ${location === `/planet/${link}` ? "text-white" : "text-gray-500 hover:text-white"
                  }`}
                onClick={() => setOpenLinks(false)}
              >
                {link.toUpperCase()}
              </Link>
              <div className={`absolute -bottom-1 left-0 h-[1.5px] bg-nasa-red transition-all duration-500 ${location === `/planet/${link}` ? "w-full opacity-80" : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-40"
                }`} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
