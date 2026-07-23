import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useTransition } from "../transition/TransitionContext";
import "./BackButton.css";

const BackButton = () => {
  const { startAnimation } = useTransition();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const btnRef = useRef(null);
  const arrowRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverlayed, setIsOverlayed] = useState(false);

  useEffect(() => {
    // Overlay check function to verify if button overlaps with text content
    const checkOverlay = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      // Find the main text container on project detail, experience detail, or blog detail pages
      const container = document.querySelector(".blog-article-container, .project-container, .experience-container");
      if (!container) return;

      const btnRect = wrapper.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Safe buffer margin of 20px
      const safeBuffer = 20;

      if (btnRect.right + safeBuffer > containerRect.left) {
        setIsOverlayed(true);
      } else {
        setIsOverlayed(false);
      }
    };

    // Scroll listener to hide button when scrolling down past 50px
    const handleScrollAndResize = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      checkOverlay();
    };

    window.addEventListener("scroll", handleScrollAndResize);
    window.addEventListener("resize", handleScrollAndResize);
    
    // Run an initial check plus a small delayed check to ensure DOM has settled
    handleScrollAndResize();
    const timeoutId = setTimeout(checkOverlay, 100);

    // GSAP Magnetic hover animation
    const wrapper = wrapperRef.current;
    const btn = btnRef.current;
    const arrow = arrowRef.current;

    if (wrapper && btn && arrow) {
      const moveEvent = (e) => {
        const wrapperRect = wrapper.getBoundingClientRect();
        const relX = e.clientX - (wrapperRect.left + wrapperRect.width / 2);
        const relY = e.clientY - (wrapperRect.top + wrapperRect.height / 2);

        // Max displacement (scaled for a smaller 50px button)
        const btnMaxDisplacement = 15;
        const arrowMaxDisplacement = 20;

        const btnDisplacementX = (relX / wrapperRect.width) * btnMaxDisplacement;
        const btnDisplacementY = (relY / wrapperRect.height) * btnMaxDisplacement;
        const arrowDisplacementX = (relX / wrapperRect.width) * arrowMaxDisplacement;
        const arrowDisplacementY = (relY / wrapperRect.height) * arrowMaxDisplacement;

        gsap.to(btn, {
          x: btnDisplacementX,
          y: btnDisplacementY,
          ease: "power3.out",
          duration: 0.35,
        });

        gsap.to(arrow, {
          x: arrowDisplacementX,
          y: arrowDisplacementY,
          ease: "power3.out",
          duration: 0.35,
        });
      };

      const leaveEvent = () => {
        gsap.to([btn, arrow], {
          x: 0,
          y: 0,
          ease: "power3.out",
          duration: 0.8,
        });
      };

      wrapper.addEventListener("mousemove", moveEvent);
      wrapper.addEventListener("mouseleave", leaveEvent);

      return () => {
        window.removeEventListener("scroll", handleScrollAndResize);
        window.removeEventListener("resize", handleScrollAndResize);
        wrapper.removeEventListener("mousemove", moveEvent);
        wrapper.removeEventListener("mouseleave", leaveEvent);
        clearTimeout(timeoutId);
      };
    }

    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const shouldHide = !startAnimation || isScrolled || isOverlayed;

  return (
    <div className="back-btn-wrapper" ref={wrapperRef}>
      <motion.div
        ref={btnRef}
        className="back-btn-circle"
        onClick={() => navigate(-1)}
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: shouldHide ? -100 : 0, 
          opacity: shouldHide ? 0 : 1,
          pointerEvents: shouldHide ? "none" : "auto"
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
      >
        <div className="back-arrow" ref={arrowRef}>
          <p>&#8592;</p>
        </div>
      </motion.div>
    </div>
  );
};

export default BackButton;
