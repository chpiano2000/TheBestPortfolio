import { useMemo } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/backbutton/BackButton";
import { motion } from "framer-motion";
import Transition from "../../components/transition/Transition";
import { useTransition } from "../../components/transition/TransitionContext";
import Footer from "../../components/footer/Footer";
import { parseMarkdownWithFrontmatter } from "../../utils/markdown";
import "./sample-project.css";

// Import all static project markdown files as raw text
const projectPosts = import.meta.glob("/src/content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Import all project images to resolve them properly in production build
const projectImages = import.meta.glob("/src/assets/images/projects/*.svg", {
  import: "default",
  eager: true,
});

const SampleProject = () => {
  const { startAnimation } = useTransition();
  const { slug } = useParams();
  
  const targetSlug = slug || "homelab";

  const rawMarkdown = useMemo(() => {
    const key = Object.keys(projectPosts).find((path) =>
      path.endsWith(`${targetSlug}.md`)
    );
    if (key) {
      return projectPosts[key];
    }
    const firstKey = Object.keys(projectPosts)[0];
    return firstKey ? projectPosts[firstKey] : "";
  }, [targetSlug]);

  const { metadata, content } = useMemo(() => {
    return parseMarkdownWithFrontmatter(rawMarkdown);
  }, [rawMarkdown]);

  const heroImage = useMemo(() => {
    if (!metadata.img) return "";
    return projectImages[metadata.img] || metadata.img;
  }, [metadata.img]);

  const galleryImages = useMemo(() => {
    if (!metadata.gallery) return [];
    return metadata.gallery.map((path) => projectImages[path] || path);
  }, [metadata.gallery]);

  // Capitalize headings safely
  const projectTitle = (metadata.title || targetSlug).toUpperCase();
  const projectCategory = (metadata.category || "").toUpperCase();

  return (
    <motion.div className="sample-project-page">
      <div className="bg"></div>

      <BackButton />

      <div className="project-container">
        <div className="project-header">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
          >
            {projectTitle} {projectCategory && `• ${projectCategory}`}
          </motion.h1>
          {metadata.tagline && <p className="project-tagline">{metadata.tagline.toUpperCase()}</p>}
        </div>

        <div className="project-info">
          <motion.div
            className="project-img"
            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
            animate={startAnimation ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } : { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
            transition={{ duration: 1.5, ease: [0.83, 0, 0.17, 1] }}
          >
            <motion.img
              src={heroImage}
              alt="Project Hero"
              initial={{ scale: 1.4 }}
              animate={startAnimation ? { scale: 1 } : { scale: 1.4 }}
              transition={{ duration: 1.5, ease: [0.83, 0, 0.17, 1] }}
            />
          </motion.div>

          <motion.div
            className="project-description"
            initial={{ x: -40, opacity: 0 }}
            animate={startAnimation ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.25 }}
          >
            {metadata.descTitle && (
              <p className="desc-title">
                <b>{metadata.descTitle.toUpperCase()}</b>
              </p>
            )}
            <p className="desc-body">{content}</p>
          </motion.div>
        </div>

        {galleryImages.length > 0 && (
          <div className="project-gallery">
            {galleryImages.map((src, index) => (
              <div key={index} className="gallery-item">
                <img src={src} alt={`Project Detail ${index + 1}`} />
              </div>
            ))}
          </div>
        )}

        <Footer />
      </div>
    </motion.div>
  );
};

export default Transition(SampleProject);
