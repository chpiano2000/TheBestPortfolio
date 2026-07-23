import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Transition from "../../components/transition/Transition";
import { marked } from "marked";
import Footer from "../../components/footer/Footer";
import BackButton from "../../components/backbutton/BackButton";
import { parseMarkdownWithFrontmatter } from "../../utils/markdown";
import "./sample-blog.css";

// Import all static markdown files from /src/content/blog as raw text strings
const markdownPosts = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const SampleBlog = () => {
  const { slug } = useParams();

  // Find matching markdown file or default to minimalist-interaction-systems
  const targetSlug = slug || "minimalist-interaction-systems";

  const rawMarkdown = useMemo(() => {
    const key = Object.keys(markdownPosts).find((path) =>
      path.endsWith(`${targetSlug}.md`)
    );
    if (key) {
      return markdownPosts[key];
    }
    // Fallback if key not found
    const firstKey = Object.keys(markdownPosts)[0];
    return firstKey ? markdownPosts[firstKey] : "# Post Not Found";
  }, [targetSlug]);

  const { metadata, content } = useMemo(() => {
    return parseMarkdownWithFrontmatter(rawMarkdown);
  }, [rawMarkdown]);

  const htmlContent = useMemo(() => {
    return marked.parse(content);
  }, [content]);

  return (
    <motion.div className="sample-blog-page">
      <div className="bg"></div>

      <BackButton />

      <article className="blog-article-container">
        <header className="blog-article-header">
          <h1 className="blog-article-title">
            {metadata.id || metadata.title || targetSlug.replace(/-/g, " ").toUpperCase()}
          </h1>

          {(metadata.date || metadata.readTime || metadata.author) && (
            <div className="blog-article-meta">
              {metadata.date && <span>{metadata.date}</span>}
              {metadata.date && metadata.readTime && <span className="separator">•</span>}
              {metadata.readTime && <span>{metadata.readTime}</span>}
              {(metadata.date || metadata.readTime) && metadata.author && (
                <span className="separator">•</span>
              )}
              {metadata.author && <span>BY {metadata.author}</span>}
            </div>
          )}

          {metadata.tags && metadata.tags.length > 0 && (
            <div className="blog-article-tags">
              {metadata.tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Rendered HTML from static markdown file */}
        <div
          className="markdown-rendered-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <Footer />
      </article>
    </motion.div>
  );
};

export default Transition(SampleBlog);
