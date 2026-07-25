import { useMemo, useEffect, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import BackButton from "../../components/backbutton/BackButton";
import { useTransition } from "../../components/transition/TransitionContext";
import Footer from "../../components/footer/Footer";
import { parseMarkdownWithFrontmatter } from "../../utils/markdown";
import "./sample-project.css";

const projectPosts = import.meta.glob("/src/content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const projectImages = import.meta.glob("/src/assets/images/projects/*.svg", {
  import: "default",
  eager: true,
});

const CLIP_HIDDEN = "polygon(0 0, 0 0, 0 100%, 0% 100%)";
const CLIP_SHOWN = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

const SampleProject = () => {
  const { startAnimation } = useTransition();
  const { slug } = useParams();

  const titleRef = useRef(null);
  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);
  const descRef = useRef(null);

  const targetSlug = slug || "homelab";

  const rawMarkdown = useMemo(() => {
    const key = Object.keys(projectPosts).find((path) =>
      path.endsWith(`${targetSlug}.md`)
    );
    if (key) return projectPosts[key];
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

  const projectTitle = (metadata.title || targetSlug).toUpperCase();
  const projectCategory = (metadata.category || "").toUpperCase();

  useLayoutEffect(() => {
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
    }
    if (imgWrapRef.current) {
      gsap.set(imgWrapRef.current, { clipPath: CLIP_HIDDEN });
    }
    if (imgRef.current) {
      gsap.set(imgRef.current, { scale: 1.4 });
    }
    if (descRef.current) {
      gsap.set(descRef.current, { x: -40, opacity: 0 });
    }
  }, []);

  useEffect(() => {
    if (!startAnimation) return;
    const ease = "expo.inOut";

    if (titleRef.current) {
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease,
      });
    }
    if (imgWrapRef.current) {
      gsap.to(imgWrapRef.current, {
        clipPath: CLIP_SHOWN,
        duration: 1.5,
        ease,
      });
    }
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1,
        duration: 1.5,
        ease,
      });
    }
    if (descRef.current) {
      gsap.to(descRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease,
        delay: 0.25,
      });
    }
  }, [startAnimation]);

  return (
    <div className="sample-project-page">
      <div className="bg"></div>

      <BackButton />

      <div className="project-container">
        <div className="project-header">
          <h1 ref={titleRef}>
            {projectTitle} {projectCategory && `• ${projectCategory}`}
          </h1>
          {metadata.tagline && <p className="project-tagline">{metadata.tagline.toUpperCase()}</p>}
        </div>

        <div className="project-info">
          <div className="project-img" ref={imgWrapRef}>
            <img ref={imgRef} src={heroImage} alt="Project Hero" />
          </div>

          <div className="project-description" ref={descRef}>
            {metadata.descTitle && (
              <p className="desc-title">
                <b>{metadata.descTitle.toUpperCase()}</b>
              </p>
            )}
            <p className="desc-body">{content}</p>
          </div>
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
    </div>
  );
};

export default SampleProject;
