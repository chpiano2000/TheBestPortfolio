import { useMemo, useEffect, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import BackButton from "../../components/backbutton/BackButton";
import { useTransition } from "../../components/transition/TransitionContext";
import Footer from "../../components/footer/Footer";
import { parseMarkdownWithFrontmatter } from "../../utils/markdown";
import "./sample-experience.css";

const experiencePosts = import.meta.glob("/src/content/experience/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const SampleExperience = () => {
  const { startAnimation } = useTransition();
  const { slug } = useParams();

  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const contentRef = useRef(null);

  const targetSlug = slug || "sotatek";

  const rawMarkdown = useMemo(() => {
    const key = Object.keys(experiencePosts).find((path) =>
      path.endsWith(`${targetSlug}.md`)
    );
    if (key) return experiencePosts[key];
    const firstKey = Object.keys(experiencePosts)[0];
    return firstKey ? experiencePosts[firstKey] : "";
  }, [targetSlug]);

  const { metadata, content } = useMemo(() => {
    return parseMarkdownWithFrontmatter(rawMarkdown);
  }, [rawMarkdown]);

  const company = (metadata.company || targetSlug).toUpperCase();
  const role = (metadata.role || "").toUpperCase();
  const period = (metadata.period || "").toUpperCase();
  const location = (metadata.location || "").toUpperCase();
  const technologies = (metadata.technologies || "").toUpperCase();
  const descTitle = (metadata.descTitle || "KEY ACHIEVEMENTS").toUpperCase();
  const tagline = (metadata.tagline || "").toUpperCase();

  useLayoutEffect(() => {
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
    }
    if (metaRef.current) {
      gsap.set(metaRef.current, { x: -40, opacity: 0 });
    }
    if (contentRef.current) {
      gsap.set(contentRef.current, { x: 40, opacity: 0 });
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
    if (metaRef.current) {
      gsap.to(metaRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease,
        delay: 0.1,
      });
    }
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease,
        delay: 0.2,
      });
    }
  }, [startAnimation]);

  return (
    <div className="sample-experience-page">
      <div className="bg"></div>

      <BackButton />

      <div className="experience-container">
        <div className="experience-header">
          <h1 ref={titleRef}>{company}</h1>
          {tagline && <p className="experience-tagline">{tagline}</p>}
        </div>

        <div className="experience-info-grid">
          <div className="experience-meta-panel" ref={metaRef}>
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
          </div>

          <div className="experience-content" ref={contentRef}>
            <p className="desc-title">
              <b>{descTitle}</b>
            </p>
            <p className="desc-body">{content}</p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default SampleExperience;
