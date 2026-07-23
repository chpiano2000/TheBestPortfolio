import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Transition from "../../components/transition/Transition";
import { useTransition } from "../../components/transition/TransitionContext";
import Footer from "../../components/footer/Footer";
import "./blog.css";

import { parseMarkdownWithFrontmatter, parseDate } from "../../utils/markdown";

// Import all static markdown files from /src/content/blog as raw text strings
const markdownPosts = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Import all blog images to resolve them properly in production build
const blogImages = import.meta.glob("/src/assets/images/blog/*.svg", {
  import: "default",
  eager: true,
});

const posts = Object.entries(markdownPosts)
  .map(([path, rawContent], index) => {
    const slug = path.split("/").pop().replace(".md", "");
    const { metadata } = parseMarkdownWithFrontmatter(rawContent);
    return {
      id: index + 1,
      slug,
      title: metadata.id || metadata.title || slug.replace(/-/g, " ").toUpperCase(),
      date: metadata.date || "",
      readTime: metadata.readTime || "",
      snippet: metadata.snippet || "",
      tags: metadata.tags || [],
      img: blogImages[metadata.img] || metadata.img,
    };
  })
  .sort((a, b) => parseDate(b.date) - parseDate(a.date));

const Blog = () => {
  const { startAnimation } = useTransition();
  return (
    <motion.div className="blog-page">
      <div className="bg"></div>

      <section className="blog-hero">
        <div className="blog-header">
          <h1>
            <motion.div
              className="h1"
              initial={{ top: "7rem" }}
              animate={startAnimation ? { top: 0 } : { top: "7rem" }}
              transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
            >
              JOURNAL
            </motion.div>
          </h1>
          <h1>
            <motion.div
              className="h1"
              initial={{ top: "7rem" }}
              animate={startAnimation ? { top: 0 } : { top: "7rem" }}
              transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.1 }}
            >
              & THOUGHTS
            </motion.div>
          </h1>
        </div>

        {/* Text-focused Journal List without images */}
        <div className="blog-posts-list">
          {posts.map((post) => (
            <article key={post.id} className="blog-item">
              <Link to={`/blog/${post.slug}`}>
                <div className="blog-item-inner">
                  {(post.date || post.readTime) && (
                    <div className="blog-meta">
                      {post.date && <span>{post.date}</span>}
                      {post.date && post.readTime && <span>/</span>}
                      {post.readTime && <span>{post.readTime}</span>}
                    </div>
                  )}
                  <div className="blog-title-wrap">
                    <div className="blog-title-flex">
                      {post.img && (
                        <div className="blog-item-img">
                          <img src={post.img} alt={post.title} />
                        </div>
                      )}
                      <h2>{post.title}</h2>
                    </div>
                    {post.snippet && <p>{post.snippet}</p>}
                  </div>
                  <div className="blog-action">
                    <span className="read-btn">READ ARTICLE</span>
                    <span className="arrow">&#8599;</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default Transition(Blog);
