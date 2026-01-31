import { useState } from "react";
import { Link, useLocation } from "wouter";
import logo from "../../assets/logo.png";
import { PLANETS as EXPLORATION_LINKS } from "../../types/Planets";
import { scienceModules } from "../../data/moduleData";
import "./navbar.css";

export const Navbar = () => {
  const [openLinks, setOpenLinks] = useState(false);
  const [location] = useLocation();

  const handleClick = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <header className="fixed top-6 left-0 w-full z-[1000] flex justify-center px-[1%] pointer-events-none">
      <div className="simple-navbar-container">
        {/* Corner Decorations */}
        <span className="nav-corner corner-tl"></span>
        <span className="nav-corner corner-tr"></span>
        <span className="nav-corner corner-bl"></span>
        <span className="nav-corner corner-br"></span>

        <Link href="/" className="flex items-center gap-4 no-underline pointer-events-auto shrink-0">
          <img
            src={logo}
            alt="Orbital Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-sm font-black tracking-[0.5em] uppercase text-white">
            ORBITAL
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8 pointer-events-auto">
          {EXPLORATION_LINKS.map((link) => (
            <Link
              key={link}
              href={`/planet/${link}`}
              className={`desktop-nav-link ${location === `/planet/${link}` ? "active" : ""}`}
            >
              {link}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleClick}
          className={`hamburger-trigger pointer-events-auto lg:hidden ${openLinks ? "active" : ""}`}
          aria-label="Menu"
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </button>

        <nav className={`simple-mission-menu ${openLinks ? "open" : ""}`}>
          <div className="menu-inner-container">
            <div className="menu-decoration-header">
              <span className="menu-meta">SYSTEM_CMD // NAVIGATION_DRAWER</span>
              <div className="h-px w-full bg-white/10 mt-2"></div>
            </div>

            <ul className="menu-list">
              {EXPLORATION_LINKS.map((link, idx) => (
                <li key={link} className="menu-item-wrapper">
                  <span className="menu-item-index">0{idx + 1}</span>
                  <Link
                    href={`/planet/${link}`}
                    className={`menu-link-item ${location === `/planet/${link}` ? "active" : ""}`}
                    onClick={() => setOpenLinks(false)}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="menu-footer">
              <span className="menu-meta">MISSION_ORBITAL // v1.0.4</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
