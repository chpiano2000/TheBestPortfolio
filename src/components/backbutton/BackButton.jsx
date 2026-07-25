import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useTransition } from "../transition/TransitionContext";
import "./BackButton.css";

const REVEAL_EASE = "expo.inOut";
const REVEAL_DUR = 0.6;

const BackButton = () => {
  const { startAnimation } = useTransition();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const btnRef = useRef(null);
  const arrowRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverlayed, setIsOverlayed] = useState(false);

  useEffect(() => {
    const checkOverlay = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const container = document.querySelector(
        ".blog-article-container, .project-container, .experience-container"
      );
      if (!container) return;

      const btnRect = wrapper.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const safeBuffer = 20;

      if (btnRect.right + safeBuffer > containerRect.left) {
        setIsOverlayed(true);
      } else {
        setIsOverlayed(false);
      }
    };

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

    handleScrollAndResize();
    const timeoutId = setTimeout(checkOverlay, 100);

    const wrapper = wrapperRef.current;
    const btn = btnRef.current;
    const arrow = arrowRef.current;

    let cleanupMagnetic = () => {};

    if (wrapper && btn && arrow) {
      const moveEvent = (e) => {
        const wrapperRect = wrapper.getBoundingClientRect();
        const relX = e.clientX - (wrapperRect.left + wrapperRect.width / 2);
        const relY = e.clientY - (wrapperRect.top + wrapperRect.height / 2);

        const btnMaxDisplacement = 15;
        const arrowMaxDisplacement = 20;

        const btnDisplacementX = (relX / wrapperRect.width) * btnMaxDisplacement;
        const btnDisplacementY = (relY / wrapperRect.height) * btnMaxDisplacement;
        const arrowDisplacementX =
          (relX / wrapperRect.width) * arrowMaxDisplacement;
        const arrowDisplacementY =
          (relY / wrapperRect.height) * arrowMaxDisplacement;

        gsap.to(btn, {
          x: btnDisplacementX,
          y: btnDisplacementY,
          ease: "power3.out",
          duration: 0.35,
          overwrite: "auto",
        });

        gsap.to(arrow, {
          x: arrowDisplacementX,
          y: arrowDisplacementY,
          ease: "power3.out",
          duration: 0.35,
          overwrite: "auto",
        });
      };

      const leaveEvent = () => {
        gsap.to([btn, arrow], {
          x: 0,
          y: 0,
          ease: "power3.out",
          duration: 0.8,
          overwrite: "auto",
        });
        gsap.to(btn, {
          scale: 1,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      const enterEvent = () => {
        gsap.to(btn, {
          scale: 1.05,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      wrapper.addEventListener("mousemove", moveEvent);
      wrapper.addEventListener("mouseleave", leaveEvent);
      wrapper.addEventListener("mouseenter", enterEvent);

      cleanupMagnetic = () => {
        wrapper.removeEventListener("mousemove", moveEvent);
        wrapper.removeEventListener("mouseleave", leaveEvent);
        wrapper.removeEventListener("mouseenter", enterEvent);
      };
    }

    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
      cleanupMagnetic();
      clearTimeout(timeoutId);
    };
  }, []);

  // Reveal / hide animation driven by startAnimation + shouldHide
  const shouldHide = !startAnimation || isScrolled || isOverlayed;

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    gsap.to(btn, {
      x: shouldHide ? -100 : 0,
      opacity: shouldHide ? 0 : 1,
      duration: REVEAL_DUR,
      ease: REVEAL_EASE,
      pointerEvents: shouldHide ? "none" : "auto",
    });
  }, [shouldHide]);

  // Establish initial hidden state before first reveal tween
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    gsap.set(btn, { x: -100, opacity: 0, pointerEvents: "none" });
  }, []);

  return (
    <div className="back-btn-wrapper" ref={wrapperRef}>
      <div
        ref={btnRef}
        className="back-btn-circle"
        onClick={() => navigate(-1)}
      >
        <div className="back-arrow" ref={arrowRef}>
          <p>&#8592;</p>
        </div>
      </div>
    </div>
  );
};

export default BackButton;
