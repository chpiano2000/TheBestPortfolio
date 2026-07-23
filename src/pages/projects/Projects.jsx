import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Transition from "../../components/transition/Transition";
import { useTransition } from "../../components/transition/TransitionContext";
import Footer from "../../components/footer/Footer";
import { parseMarkdownWithFrontmatter } from "../../utils/markdown";
import "./projects.css";

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

const Projects = () => {
  const { startAnimation } = useTransition();
  const projectsList = useMemo(() => {
    return Object.entries(projectPosts).map(([path, rawContent], index) => {
      const slug = path.split("/").pop().replace(".md", "");
      const { metadata } = parseMarkdownWithFrontmatter(rawContent);
      return {
        id: index + 1,
        slug,
        title: metadata.title || slug.toUpperCase(),
        category: metadata.category || "",
        year: metadata.year || "",
        img: projectImages[metadata.img] || metadata.img,
      };
    });
  }, []);

  return (
    <motion.div className="projects-page">
      <div className="bg"></div>

      <section className="projects-hero">
        <div className="projects-header">
          <h1>
            <motion.div
              className="h1"
              initial={{ top: "7rem" }}
              animate={startAnimation ? { top: 0 } : { top: "7rem" }}
              transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
            >
              SELECTED
            </motion.div>
          </h1>
          <h1>
            <motion.div
              className="h1"
              initial={{ top: "7rem" }}
              animate={startAnimation ? { top: 0 } : { top: "7rem" }}
              transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.1 }}
            >
              PROJECTS
            </motion.div>
          </h1>
        </div>

        <div className="projects-list">
          {projectsList.map((item) => (
            <div key={item.id} className="projects-item">
              <Link to={`/projects/${item.slug}`}>
                <div className="projects-link">
                  <div className="projects-link-left">
                    <div className="projects-link-img">
                      <img src={item.img} alt={item.title} />
                    </div>
                    <div className="projects-title">
                      <h2>{item.title}</h2>
                    </div>
                  </div>
                  <div className="projects-info">
                    <p className="projects-cat">{item.category}</p>
                    <p className="projects-yr">{item.year}</p>
                  </div>
                  <div className="projects-arrow">
                    <span>&#8599;</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default Transition(Projects);
