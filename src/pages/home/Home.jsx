// import { useMemo } from "react";
// import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Transition from "../../components/transition/Transition";
import { useTransition } from "../../components/transition/TransitionContext";
import MagneticButton from "../../components/magneticbutton/MagneticButton";
import Footer from "../../components/footer/Footer";
import { scrambleElement } from "../../components/menu/scramble";
// import { parseMarkdownWithFrontmatter } from "../../utils/markdown";
import "./home.css";

// Import all static experience markdown files as raw text
/*
const experiencePosts = import.meta.glob("/src/content/experience/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
*/

const Home = () => {
  const { startAnimation } = useTransition();

  const handleHoverScramble = (e) => {
    scrambleElement(e.currentTarget, { maxIterations: 8, charDelay: 30 });
  };

  const scrollToAbout = () => {
    const aboutSection = document.querySelector(".about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  /*
  const experiences = useMemo(() => {
    return Object.entries(experiencePosts)
      .map(([path, rawContent], index) => {
        const slug = path.split("/").pop().replace(".md", "");
        const { metadata } = parseMarkdownWithFrontmatter(rawContent);
        return {
          id: index + 1,
          slug,
          company: metadata.company || slug.toUpperCase(),
          role: metadata.role || "",
          period: metadata.period || "",
        };
      })
      .sort((a, b) => {
        const getEndYear = (period) => {
          const parts = period.split("—").map((p) => p.trim());
          if (parts.length > 1) {
            const end = parts[1];
            if (end.toLowerCase() === "present") return 9999;
            const parsed = parseInt(end, 10);
            return isNaN(parsed) ? 0 : parsed;
          }
          const parsed = parseInt(parts[0], 10);
          return isNaN(parsed) ? 0 : parsed;
        };
        return getEndYear(b.period) - getEndYear(a.period);
      });
  }, []);
  */

  return (
    <motion.div className="Home">
      <div className="bg"></div>

      <section className="hero">
        <div className="headers">
          <div className="header header-1">
            <h1>
              <motion.div
                initial={{ top: "7rem" }}
                animate={startAnimation ? { top: 0 } : { top: "7rem" }}
                transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.1 }}
                className="h1"
              >
                Dax Vo
              </motion.div>
              <div className="h1-revealer"></div>
            </h1>
            <h1>
              <motion.div
                className="h1 indent-visual"
                initial={{ top: "7rem" }}
                animate={startAnimation ? { top: 0 } : { top: "7rem" }}
                transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.2 }}
              >
                software
              </motion.div>
              <div className="h1-revealer"></div>
            </h1>
            <h1>
              <motion.div
                className="h1 indent-dev"
                initial={{ top: "7rem" }}
                animate={startAnimation ? { top: 0 } : { top: "7rem" }}
                transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.3 }}
              >
                engineer.
              </motion.div>
              <div className="h1-revealer"></div>
            </h1>
          </div>
          <div className="header header-2">
            <h1>
              <motion.div
                className="h1"
                initial={{ top: "7rem" }}
                animate={startAnimation ? { top: 0 } : { top: "7rem" }}
                transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.2 }}
              >
                portfolio
              </motion.div>
              <div className="h1-revealer"></div>
            </h1>
          </div>
        </div>

        <div className="hero-sub">
          <div className="hero-sub-left">
            <MagneticButton label="EXPERIENCES" to="/experience" />
          </div>
          <div className="hero-sub-right">
            <div className="hero-status-content">
              <div className="status-col status-col-indicator">
                <div className="hero-scroll-indicator" onClick={scrollToAbout} title="Scroll down">
                  <div className="scroll-arrow">
                    <span>&#8595;</span>
                  </div>
                  <div className="scroll-arrow">
                    <span>&#8595;</span>
                  </div>
                </div>
              </div>
              <div className="status-col">
                <p>PREV SOFTWARE ENGINEER AT <br /> <a href="https://sotatek.com.au" className="company-link" onMouseEnter={handleHoverScramble}>SOTATEK</a></p>
              </div>
              <div className="status-col">
                <p>PREV SOFTWARE ENGINEER AT <br /> <a href="https://bizflycloud.vn/en/" className="company-link" onMouseEnter={handleHoverScramble}>BIZFLY CLOUD</a></p>
              </div>
              <div className="status-col">
                <p>PREV SOFTWARE ENGINEER AT <br /> <a href="https://yitec.net" className="company-link" onMouseEnter={handleHoverScramble}>YITEC</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Navigation Drawer List
      <div className="projects-nav">
        <div className="projects-nav-container">
          {experiences.map((exp) => (
            <div key={exp.id} className="project-item">
              <Link to={`/experience/${exp.slug}`}>
                <div className="project-link">
                  <div className="project-l">
                    <div className="project-name">
                      <h2>{exp.company}</h2>
                    </div>
                  </div>
                  <div className="project-date">
                    <p>{exp.role}</p>
                    <p>{exp.period}</p>
                  </div>
                  <div className="project-dir">
                    <p>&#8599;</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      */}

      {/* About Brief Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-col">
            <p className="section-tag">(WHOAMI)</p>
            <p className="about-bio">
              I&apos;m a <strong>software engineer</strong> with a strong passion for <strong>containers and container orchestration</strong>. I build and maintain <strong>automated, high-performance environments</strong>—from coordinating robust <strong>Change Data Capture pipelines</strong> to deploying highly available microservices in <strong>Django and Go</strong>. I enjoy bridging the gap between intricate backend logic and robust platform operations, ensuring <strong>zero downtime</strong> and strict <strong>data integrity</strong> across enterprise systems. I thrive in collaborative environments where I can build the underlying systems that <strong>empower developers to move faster</strong>. <br /><br />
              <strong>Focus on writing great code, and I’ll automate the rest.</strong>
            </p>
          </div>
          <div className="about-col">
            <div className="socials">
              <a href="mailto:datvc.work@gmail.com" onMouseEnter={handleHoverScramble}>EMAIL &#8599;</a>
              <a href="https://linkedin.com/in/vo-chi-dat" target="_blank" rel="noreferrer" onMouseEnter={handleHoverScramble}>LINKEDIN &#8599;</a>
              <a href="https://github.com/chpiano2000" target="_blank" rel="noreferrer" onMouseEnter={handleHoverScramble}>GITHUB &#8599;</a>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Footer Component */}
      <Footer />
    </motion.div>
  );
};

export default Transition(Home);
