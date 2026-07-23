import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { scrambleElement } from "./scramble";
import "./menu.css";

import LogoImg from "../../assets/images/home/portrait.svg";

const Menu = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const hamburgerTl = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMenuOpenRef = useRef(false);

  const menuLinks = [
    { path: "/", label: "Index" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/experience", label: "Experience" },
    { path: "/blog", label: "Journal" },
  ];

  // GSAP animation for hamburger icon transform
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const spans = nav.querySelectorAll(".nav-toggler-hamburger span");
    if (spans.length >= 2) {
      const tl = gsap.timeline({ paused: true });
      tl.to(
        spans[0],
        {
          y: "0.2rem",
          rotation: 45,
          width: "1.1rem",
          duration: 0.3,
          ease: "power2.inOut",
        },
        0
      ).to(
        spans[1],
        {
          y: "-0.2rem",
          rotation: -45,
          width: "1.1rem",
          duration: 0.3,
          ease: "power2.inOut",
        },
        0
      );
      hamburgerTl.current = tl;
    }

    // Scroll listener for sticky glassy navbar (Deadlock Studios style)
    const handleScroll = () => {
      if (window.scrollY < 50) {
        nav.classList.add("top");
      } else {
        nav.classList.remove("top");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hamburgerTl.current) hamburgerTl.current.kill();
    };
  }, []);

  const closeMenu = useCallback(() => {
    if (!isMenuOpenRef.current) return;
    isMenuOpenRef.current = false;
    setIsMenuOpen(false);

    if (hamburgerTl.current) hamburgerTl.current.reverse();

    const overlay = overlayRef.current;
    if (overlay) {
      overlay.style.transition = "opacity 0.4s ease, visibility 0.4s ease";
      overlay.style.opacity = "0";
      overlay.style.visibility = "hidden";
      overlay.style.pointerEvents = "none";
    }
  }, []);

  const toggleMenu = () => {
    const overlay = overlayRef.current;
    const tl = hamburgerTl.current;
    if (!overlay || !tl) return;

    if (!isMenuOpenRef.current) {
      isMenuOpenRef.current = true;
      setIsMenuOpen(true);
      tl.play();

      overlay.style.visibility = "visible";
      overlay.style.pointerEvents = "all";
      overlay.style.transition = "opacity 0.4s ease";
      overlay.style.opacity = "1";

      // Scramble in all nav links in sequence
      const links = overlay.querySelectorAll(".nav-item a, .nav-footer-item a");
      links.forEach((link, idx) => {
        setTimeout(() => {
          scrambleElement(link, { maxIterations: 8, charDelay: 30 });
        }, idx * 60);
      });
    } else {
      closeMenu();
    }
  };

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  const handleLinkHover = (e) => {
    scrambleElement(e.currentTarget, { maxIterations: 8, charDelay: 30 });
  };

  return (
    <>
      <nav ref={navRef} className="deadlock-nav top">
        <div className="container">
          <div className="nav-container">
            <div className="nav-logo">
              <Link to="/">
                <img src={LogoImg} alt="Dax Vo Brand Logo" />
                <span className="brand-title">DAX VO</span>
              </Link>
            </div>
            <div className="nav-toggler">
              <div className="btn" onClick={toggleMenu}>
                <p className="mono">{isMenuOpen ? "CLOSE" : "MENU"}</p>
                <div className="nav-toggler-hamburger">
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Fullscreen Navigation Overlay */}
      <div className="nav-overlay" ref={overlayRef}>
        <div className="nav-items">
          <div className="nav-overlay-logo">
            <img src={LogoImg} alt="Brand Mark" />
          </div>
          {menuLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <div
                key={link.path}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                <Link
                  to={link.path}
                  onMouseEnter={handleLinkHover}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="nav-footer">
          <div className="container">
            <div className="nav-footer-container">
              <div className="nav-footer-item">
                <a
                  className="mono"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={handleLinkHover}
                >
                  TWITTER / X
                </a>
                <a
                  className="mono"
                  href="https://github.com/chpiano2000"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={handleLinkHover}
                >
                  GITHUB
                </a>
                <a
                  className="mono"
                  href="https://linkedin.com/in/vo-chi-dat"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={handleLinkHover}
                >
                  LINKEDIN
                </a>
              </div>
              <div className="nav-footer-item">
                <a
                  className="mono"
                  href="mailto:datvc.work@gmail.com"
                  onMouseEnter={handleLinkHover}
                  onClick={closeMenu}
                >
                  GET IN TOUCH &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
