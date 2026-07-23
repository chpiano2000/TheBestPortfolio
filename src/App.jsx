import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Menu from "./components/menu/Menu";

import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Projects from "./pages/projects/Projects";
import Experience from "./pages/experience/Experience";
import Blog from "./pages/blog/Blog";
import Contact from "./pages/contact/Contact";
import SampleProject from "./pages/sampleproject/SampleProject";
import SampleBlog from "./pages/sampleblog/SampleBlog";
import SampleExperience from "./pages/sampleexperience/SampleExperience";

import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <Menu />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<SampleProject />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/experience/:slug" element={<SampleExperience />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<SampleBlog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sample-project" element={<SampleProject />} />
          <Route path="/sample-blog" element={<SampleBlog />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
