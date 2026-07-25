import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useTransition } from "../../components/transition/TransitionContext";
import MagneticButton from "../../components/magneticbutton/MagneticButton";
import Footer from "../../components/footer/Footer";
import PortraitImg from "../../assets/images/home/portrait.svg";
import { useHeroLineReveal } from "../../utils/animate";
import "./about.css";

const About = () => {
  const { startAnimation } = useTransition();

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const portraitRef = useRef(null);

  useHeroLineReveal(
    [
      { ref: line1Ref, delay: 0 },
      { ref: line2Ref, delay: 0.1 },
    ],
    startAnimation
  );

  useEffect(() => {
    if (portraitRef.current) {
      gsap.set(portraitRef.current, { scale: 1.1, opacity: 0 });
    }
  }, []);

  useEffect(() => {
    if (!startAnimation) return;
    if (!portraitRef.current) return;
    gsap.to(portraitRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.4,
      ease: "expo.inOut",
      delay: 0.3,
    });
  }, [startAnimation]);

  return (
    <div className="about-page">
      <div className="bg"></div>

      <section className="about-hero">
        <div className="about-header">
          <h1>
            <div ref={line1Ref} className="h1">ABOUT</div>
          </h1>
          <h1>
            <div ref={line2Ref} className="h1">VO</div>
          </h1>
        </div>

        <div className="about-grid">
          <div className="about-img-col">
            <div ref={portraitRef} className="portrait-frame">
              <img src={PortraitImg} alt="Dax Vo Portrait" />
            </div>
          </div>
          <div className="about-text-col">
            <p className="lead-para">
              SOFTWARE ENGINEER FOCUSING ON KUBERNETES CONTAINER ORCHESTRATION, CHANGE DATA CAPTURE PIPELINES, AND HIGH-PERFORMANCE BACKEND MICROSERVICES.
            </p>
            <p className="body-para">
              BUILDING AUTOMATED, SECURE, AND RESILIENT INFRASTRUCTURE SYSTEMS AND SERVICES USING GO, PYTHON, DJANGO, AND CLOUD-NATIVE TECHNOLOGIES.
            </p>
            <div className="about-meta">
              <div className="meta-item">
                <span className="meta-title">(SPECIALIZATIONS)</span>
                <p>CONTAINER ORCHESTRATION / CHANGE DATA CAPTURE / BACKEND SERVICES / CI/CD AUTOMATION</p>
              </div>
              <div className="meta-item">
                <span className="meta-title">(LOCATION)</span>
                <p>MELBOURNE, AUSTRALIA — AVAILABLE GLOBALLY</p>
              </div>
            </div>
            <MagneticButton label="GET IN TOUCH" to="mailto:datvc.work@gmail.com" />
          </div>
        </div>
      </section>

      <section className="experience-section">
        <h2>EXPERIENCE & RECOGNITION</h2>
        <div className="exp-table">
          <Link to="/experience#sotatek" className="exp-row">
            <span className="exp-year">2024 — 2025</span>
            <span className="exp-role">SOFTWARE ENGINEER</span>
            <span className="exp-company">SOTATEK</span>
          </Link>
          <Link to="/experience#bizfly-cloud" className="exp-row">
            <span className="exp-year">2022 — 2024</span>
            <span className="exp-role">SOFTWARE ENGINEER</span>
            <span className="exp-company">BIZFLY CLOUD</span>
          </Link>
          <Link to="/experience#yitec" className="exp-row">
            <span className="exp-year">2021 — 2022</span>
            <span className="exp-role">SOFTWARE ENGINEER</span>
            <span className="exp-company">YITEC</span>
          </Link>
        </div>
      </section>

      <section className="experience-section" style={{ marginTop: "4rem" }}>
        <h2>EDUCATION</h2>
        <div className="exp-table">
          <div className="exp-row">
            <span className="exp-year">2012 — 2013</span>
            <span className="exp-role">MASTER OF INFORMATION TECHNOLOGY</span>
            <span className="exp-company">MONASH UNIVERSITY</span>
          </div>
          <div className="exp-row">
            <span className="exp-year">2008 — 2012</span>
            <span className="exp-role">BACHELOR OF ICT</span>
            <span className="exp-company">UNIVERSITY OF SCIENCE AND TECHNOLOGY OF HANOI</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
