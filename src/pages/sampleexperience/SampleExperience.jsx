import { useMemo } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/backbutton/BackButton";
import { motion } from "framer-motion";
import Transition from "../../components/transition/Transition";
import { useTransition } from "../../components/transition/TransitionContext";
import Footer from "../../components/footer/Footer";
import { parseMarkdownWithFrontmatter } from "../../utils/markdown";
import "./sample-experience.css";

// Import all static experience markdown files as raw text
const experiencePosts = import.meta.glob("/src/content/experience/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const SampleExperience = () => {
  const { startAnimation } = useTransition();
  const { slug } = useParams();
  
  const targetSlug = slug || "sotatek";

  const rawMarkdown = useMemo(() => {
    const key = Object.keys(experiencePosts).find((path) =>
      path.endsWith(`${targetSlug}.md`)
    );
    if (key) {
      return experiencePosts[key];
    }
    const firstKey = Object.keys(experiencePosts)[0];
    return firstKey ? experiencePosts[firstKey] : "";
  }, [targetSlug]);

  const { metadata, content } = useMemo(() => {
    return parseMarkdownWithFrontmatter(rawMarkdown);
  }, [rawMarkdown]);

  // Safe capitalizations
  const company = (metadata.company || targetSlug).toUpperCase();
  const role = (metadata.role || "").toUpperCase();
  const period = (metadata.period || "").toUpperCase();
  const location = (metadata.location || "").toUpperCase();
  const technologies = (metadata.technologies || "").toUpperCase();
  const descTitle = (metadata.descTitle || "KEY ACHIEVEMENTS").toUpperCase();
  const tagline = (metadata.tagline || "").toUpperCase();

  return (
    <motion.div className="sample-experience-page">
      <div className="bg"></div>

      <BackButton />

      <div className="experience-container">
        <div className="experience-header">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
          >
            {company}
          </motion.h1>
          {tagline && <p className="experience-tagline">{tagline}</p>}
        </div>

        <div className="experience-info-grid">
          <motion.div
            className="experience-meta-panel"
            initial={{ x: -40, opacity: 0 }}
            animate={startAnimation ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.1 }}
          >
            <div className="meta-row">
              <span className="meta-label">(ROLE)</span>
              <span className="meta-value">{role}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">(PERIOD)</span>
              <span className="meta-value">{period}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">(LOCATION)</span>
              <span className="meta-value">{location}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">(STACK)</span>
              <span className="meta-value">{technologies}</span>
            </div>
          </motion.div>

          <motion.div
            className="experience-content"
            initial={{ x: 40, opacity: 0 }}
            animate={startAnimation ? { x: 0, opacity: 1 } : { x: 40, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.2 }}
          >
            <p className="desc-title">
              <b>{descTitle}</b>
            </p>
            <p className="desc-body">{content}</p>
          </motion.div>
        </div>

        <Footer />
      </div>
    </motion.div>
  );
};

export default Transition(SampleExperience);
