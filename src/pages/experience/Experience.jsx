import { useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Transition from "../../components/transition/Transition";
import { useTransition } from "../../components/transition/TransitionContext";
import Footer from "../../components/footer/Footer";
import { parseMarkdownWithFrontmatter } from "../../utils/markdown";
import "./experience.css";

// Import all static experience markdown files as raw text
const experiencePosts = import.meta.glob("/src/content/experience/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const Experience = () => {
  const { startAnimation } = useTransition();
  const location = useLocation();

  const experiencesList = useMemo(() => {
    return Object.entries(experiencePosts)
      .map(([path, rawContent], index) => {
        const slug = path.split("/").pop().replace(".md", "");
        const { metadata, content } = parseMarkdownWithFrontmatter(rawContent);
        return {
          id: index + 1,
          slug,
          company: (metadata.company || slug).toUpperCase(),
          role: (metadata.role || "").toUpperCase(),
          period: (metadata.period || "").toUpperCase(),
          location: (metadata.location || "").toUpperCase(),
          tagline: (metadata.tagline || "").toUpperCase(),
          descTitle: (metadata.descTitle || "KEY PROJECTS & RESPONSIBILITIES").toUpperCase(),
          technologies: (metadata.technologies || "").toUpperCase(),
          content: content || "",
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

  // Smooth scroll to hash anchor on mount/route change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly to ensure elements are rendered and transition animations finish
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <motion.div className="experience-list-page">
      <div className="bg"></div>

      <section className="experience-list-hero">
        <div className="experience-list-header">
          <h1>
            <motion.div
              className="h1"
              initial={{ top: "7rem" }}
              animate={startAnimation ? { top: 0 } : { top: "7rem" }}
              transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
            >
              WORK
            </motion.div>
          </h1>
          <h1>
            <motion.div
              className="h1"
              initial={{ top: "7rem" }}
              animate={startAnimation ? { top: 0 } : { top: "7rem" }}
              transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.1 }}
            >
              EXPERIENCE
            </motion.div>
          </h1>
        </div>

        <div className="experience-resume-list">
          {experiencesList.map((item, idx) => (
            <motion.div
              key={item.id}
              id={item.slug}
              className="experience-resume-block"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: idx * 0.1 }}
            >
              <div className="experience-resume-row">
                {/* Left Column: Company & Meta */}
                <div className="experience-resume-meta-col">
                  <h2 className="company-name">{item.company}</h2>
                  
                  <div className="experience-meta-details">
                    <div className="meta-detail-row">
                      <span className="meta-detail-label">(ROLE)</span>
                      <span className="meta-detail-val">{item.role}</span>
                    </div>
                    <div className="meta-detail-row">
                      <span className="meta-detail-label">(PERIOD)</span>
                      <span className="meta-detail-val">{item.period}</span>
                    </div>
                    <div className="meta-detail-row">
                      <span className="meta-detail-label">(LOCATION)</span>
                      <span className="meta-detail-val">{item.location}</span>
                    </div>
                    {item.technologies && (
                      <div className="meta-detail-row">
                        <span className="meta-detail-label">(STACK)</span>
                        <span className="meta-detail-val stack-val">{item.technologies}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Responsibilities & Content */}
                <div className="experience-resume-content-col">
                  {item.tagline && (
                    <h3 className="company-tagline">{item.tagline}</h3>
                  )}
                  
                  <div className="responsibilities-section">
                    <span className="responsibilities-title">({item.descTitle})</span>
                    <p className="responsibilities-body">{item.content}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default Transition(Experience);
