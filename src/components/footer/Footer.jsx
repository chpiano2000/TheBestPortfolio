import "./footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Fallback for custom scrolling environments/mobile browsers
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    document.body.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="divider"></div>
      <div className="footer-content">
        <div
          className="footer-col footer-col-arrows"
          onClick={scrollToTop}
          title="Scroll to top"
        >
          <div className="arrow">
            <p>&#8593;</p>
          </div>
          <div className="arrow">
            <p>&#8593;</p>
          </div>
        </div>
        <div className="footer-col">
          <p>
            DAX VO
          </p>
        </div>
        <div className="footer-col">
          <p>
            SOFTWARE ENGINEER
          </p>
        </div>
        <div className="footer-col">
          <p>
            BASED IN MELBOURNE <br /> AVAILABLE WORLDWIDE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
