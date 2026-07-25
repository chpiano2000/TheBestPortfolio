import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useTransition } from "../../components/transition/TransitionContext";
import Footer from "../../components/footer/Footer";
import { parseMarkdownWithFrontmatter } from "../../utils/markdown";
import { useHeroLineReveal } from "../../utils/animate";
import "./projects.css";

const projectPosts = import.meta.glob("/src/content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const projectImages = import.meta.glob("/src/assets/images/projects/*.svg", {
  import: "default",
  eager: true,
});

const Projects = () => {
  const { startAnimation } = useTransition();

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useHeroLineReveal(
    [
      { ref: line1Ref, delay: 0 },
      { ref: line2Ref, delay: 0.1 },
    ],
    startAnimation
  );

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
    <div className="projects-page">
      <div className="bg"></div>

      <section className="projects-hero">
        <div className="projects-header">
          <h1>
            <div ref={line1Ref} className="h1">SELECTED</div>
          </h1>
          <h1>
            <div ref={line2Ref} className="h1">PROJECTS</div>
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
    </div>
  );
};

export default Projects;
