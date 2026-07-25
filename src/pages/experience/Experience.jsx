import { useMemo, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransition } from "../../components/transition/TransitionContext";
import Footer from "../../components/footer/Footer";
import { parseMarkdownWithFrontmatter } from "../../utils/markdown";
import { useHeroLineReveal } from "../../utils/animate";
import "./experience.css";

gsap.registerPlugin(ScrollTrigger);

const experiencePosts = import.meta.glob("/src/content/experience/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const Experience = () => {
  const { startAnimation } = useTransition();
  const location = useLocation();

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const listRef = useRef(null);

  useHeroLineReveal(
    [
      { ref: line1Ref, delay: 0 },
      { ref: line2Ref, delay: 0.1 },
    ],
    startAnimation
  );

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

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Scroll-triggered stagger reveal for resume blocks
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const blocks = list.querySelectorAll(".experience-resume-block");
    if (!blocks.length) return;

    gsap.set(blocks, { opacity: 0, y: 50 });

    const triggers = Array.from(blocks).map((block, idx) =>
      gsap.to(block, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: idx * 0.1,
        scrollTrigger: {
          trigger: block,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      })
    );

    return () => {
      triggers.forEach((t) => {
        if (t.scrollTrigger) t.scrollTrigger.kill();
        t.kill();
      });
    };
  }, [experiencesList]);

  return (
    <div className="experience-list-page">
      <div className="bg"></div>

      <section className="experience-list-hero">
        <div className="experience-list-header">
          <h1>
            <div ref={line1Ref} className="h1">WORK</div>
          </h1>
          <h1>
            <div ref={line2Ref} className="h1">EXPERIENCE</div>
          </h1>
        </div>

        <div className="experience-resume-list" ref={listRef}>
          {experiencesList.map((item) => (
            <div
              key={item.id}
              id={item.slug}
              className="experience-resume-block"
            >
              <div className="experience-resume-row">
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
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Experience;
