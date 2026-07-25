import { useRef } from "react";
import { useTransition } from "../../components/transition/TransitionContext";
import MagneticButton from "../../components/magneticbutton/MagneticButton";
import Footer from "../../components/footer/Footer";
import { scrambleElement } from "../../components/menu/scramble";
import { useHeroLineReveal } from "../../utils/animate";
import "./home.css";

const Home = () => {
  const { startAnimation } = useTransition();

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);

  useHeroLineReveal(
    [
      { ref: line1Ref, delay: 0.1 },
      { ref: line2Ref, delay: 0.2 },
      { ref: line3Ref, delay: 0.3 },
      { ref: line4Ref, delay: 0.2 },
    ],
    startAnimation
  );

  const handleHoverScramble = (e) => {
    scrambleElement(e.currentTarget, { maxIterations: 8, charDelay: 30 });
  };

  const scrollToAbout = () => {
    const aboutSection = document.querySelector(".about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="Home">
      <div className="bg"></div>

      <section className="hero">
        <div className="headers">
          <div className="header header-1">
            <h1>
              <div ref={line1Ref} className="h1">
                Dax Vo
              </div>
              <div className="h1-revealer"></div>
            </h1>
            <h1>
              <div ref={line2Ref} className="h1 indent-visual">
                software
              </div>
              <div className="h1-revealer"></div>
            </h1>
            <h1>
              <div ref={line3Ref} className="h1 indent-dev">
                engineer.
              </div>
              <div className="h1-revealer"></div>
            </h1>
          </div>
          <div className="header header-2">
            <h1>
              <div ref={line4Ref} className="h1">
                portfolio
              </div>
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

      <section className="about-section">
        <div className="about-container">
          <div className="about-col">
            <p className="section-tag">(WHOAMI)</p>
            <p className="about-bio">
              I&apos;m a <strong>software engineer</strong> with a strong passion for <strong>containers and container orchestration</strong>. I build and maintain <strong>automated, high-performance environments</strong>—from coordinating robust <strong>Change Data Capture pipelines</strong> to deploying highly available microservices in <strong>Django and Go</strong>. I enjoy bridging the gap between intricate backend logic and robust platform operations, ensuring <strong>zero downtime</strong> and strict <strong>data integrity</strong> across enterprise systems. I thrive in collaborative environments where I can build the underlying systems that <strong>empower developers to move faster</strong>. <br /><br />
              <strong>Focus on writing great code, and I&rsquo;ll automate the rest.</strong>
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

      <Footer />
    </div>
  );
};

export default Home;
