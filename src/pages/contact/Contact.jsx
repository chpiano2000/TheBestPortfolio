import { motion } from "framer-motion";
import Transition from "../../components/transition/Transition";
import { useTransition } from "../../components/transition/TransitionContext";
import MagneticButton from "../../components/magneticbutton/MagneticButton";
import Footer from "../../components/footer/Footer";
import "./contact.css";

const Contact = () => {
  const { startAnimation } = useTransition();
  return (
    <motion.div className="contact-page">
      <div className="bg"></div>

      <section className="contact-hero">
        <div className="contact-header">
          <h1>
            <motion.div
              className="h1"
              initial={{ top: "7rem" }}
              animate={startAnimation ? { top: 0 } : { top: "7rem" }}
              transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
            >
              LET&apos;S
            </motion.div>
          </h1>
          <h1>
            <motion.div
              className="h1"
              initial={{ top: "7rem" }}
              animate={startAnimation ? { top: 0 } : { top: "7rem" }}
              transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.1 }}
            >
              CONNECT
            </motion.div>
          </h1>
        </div>

        <div className="contact-grid">
          <div className="contact-main">
            <p className="contact-intro">
              ALWAYS INTERESTED IN INFRASTRUCTURE ROLES, PLATFORM ENGINEERING OPPORTUNITIES, AND BACKEND SYSTEM COLLABORATIONS.
            </p>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>(YOUR NAME)</label>
                <input type="text" placeholder="WHAT IS YOUR NAME?" />
              </div>
              <div className="form-group">
                <label>(YOUR EMAIL)</label>
                <input type="email" placeholder="WHERE CAN WE REPLY?" />
              </div>
              <div className="form-group">
                <label>(YOUR MESSAGE)</label>
                <textarea rows="4" placeholder="TELL US ABOUT YOUR PROJECT..."></textarea>
              </div>
              <div className="form-submit">
                <MagneticButton label="SEND MESSAGE" to="#" />
              </div>
            </form>
          </div>

          <div className="contact-sidebar">
            <div className="sidebar-block">
              <span className="block-label">(DIRECT MAIL)</span>
              <a href="mailto:datvc.work@gmail.com" className="email-link">DATVC.WORK@GMAIL.COM</a>
            </div>
            <div className="sidebar-block">
              <span className="block-label">(STUDIO LOCATION)</span>
              <p>MELBOURNE, VIC, AUSTRALIA</p>
            </div>
            <div className="sidebar-block">
              <span className="block-label">(SOCIAL CHANNELS)</span>
              <div className="social-links">
                <a href="https://linkedin.com/in/vo-chi-dat" target="_blank" rel="noreferrer">LINKEDIN &#8599;</a>
                <a href="https://github.com/chpiano2000" target="_blank" rel="noreferrer">GITHUB &#8599;</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default Transition(Contact);
