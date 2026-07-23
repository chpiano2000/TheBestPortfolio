import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MagneticButton.css";
import gsap from "gsap";

const MagneticButton = ({ label = "EXPLORE PROJECTS", to = "/projects" }) => {
  const btnRef = useRef(null);
  const textRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const btn = btnRef.current;
    const text = textRef.current;

    if (!wrapper || !btn || !text) return;

    const moveEvent = (e) => {
      const wrapperRect = wrapper.getBoundingClientRect();

      const relX = e.clientX - (wrapperRect.left + wrapperRect.width / 2);
      const relY = e.clientY - (wrapperRect.top + wrapperRect.height / 2);

      const btnMaxDisplacement = 35;
      const textMaxDisplacement = 45;

      const btnDisplacementX = (relX / wrapperRect.width) * btnMaxDisplacement;
      const btnDisplacementY = (relY / wrapperRect.height) * btnMaxDisplacement;
      const textDisplacementX = (relX / wrapperRect.width) * textMaxDisplacement;
      const textDisplacementY = (relY / wrapperRect.height) * textMaxDisplacement;

      gsap.to(btn, {
        x: btnDisplacementX,
        y: btnDisplacementY,
        ease: "power3.out",
        duration: 0.35,
      });

      gsap.to(text, {
        x: textDisplacementX,
        y: textDisplacementY,
        ease: "power3.out",
        duration: 0.35,
      });
    };

    const leaveEvent = () => {
      gsap.to([btn, text], {
        x: 0,
        y: 0,
        ease: "power3.out",
        duration: 0.8,
      });
    };

    wrapper.addEventListener("mousemove", moveEvent);
    wrapper.addEventListener("mouseleave", leaveEvent);

    return () => {
      wrapper.removeEventListener("mousemove", moveEvent);
      wrapper.removeEventListener("mouseleave", leaveEvent);
    };
  }, []);

  const isExternal = to.startsWith("mailto:") || to.startsWith("http://") || to.startsWith("https://");

  const buttonContent = (
    <div className="m-btn" ref={btnRef}>
      <div className="arrow-right">
        <span>&#8599;</span>
      </div>
      <div className="m-btn-copy">
        <p ref={textRef}>{label}</p>
      </div>
    </div>
  );

  return (
    <div className="m-btn-wrapper" ref={wrapperRef}>
      {isExternal ? (
        <a href={to} target={to.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
          {buttonContent}
        </a>
      ) : (
        <Link to={to}>
          {buttonContent}
        </Link>
      )}
    </div>
  );
};

export default MagneticButton;
