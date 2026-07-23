import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Transition from "../../components/transition/Transition";
import { useTransition } from "../../components/transition/TransitionContext";
import MagneticButton from "../../components/magneticbutton/MagneticButton";
import Footer from "../../components/footer/Footer";
import PortraitImg from "../../assets/images/home/portrait.svg";
import "./about.css";

const About = () => {
  const { startAnimation } = useTransition();

  return (
    <motion.div className="about-page">
      <div className="bg"></div>

      <section className="about-hero">
        <div className="about-header">
          <h1>
            <motion.div
              className="h1"
              initial={{ top: "7rem" }}
              animate={startAnimation ? { top: 0 } : { top: "7rem" }}
              transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
            >
              ABOUT
            </motion.div>
          </h1>
          <h1>
            <motion.div
              className="h1"
              initial={{ top: "7rem" }}
              animate={startAnimation ? { top: 0 } : { top: "7rem" }}
              transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.1 }}
            >
              VO
            </motion.div>
          </h1>
        </div>

        <div className="about-grid">
          <div className="about-img-col">
            <motion.div
              className="portrait-frame"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={startAnimation ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.83, 0, 0.17, 1], delay: 0.3 }}
            >
              <img src={PortraitImg} alt="Dax Vo Portrait" />
            </motion.div>
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

      {/* Education */}
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
    </motion.div>
  );
};

export default Transition(About);
