import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { TransitionContext } from "./TransitionContext";
import "./transition.css";

const NUM_BLOCKS = 4;
const BLOCK_DUR = 0.7;
const BLOCK_STAGGER = 0.1;
const WORD_DUR = 0.65;
const WORD_STAGGER = 0.05;
const BLOCK_EASE = "expo.inOut";
const WORD_EASE = "expo.out";

const TransitionProvider = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [startAnimation, setStartAnimation] = useState(false);

  const blocksRef = useRef([]);
  const wordsRef = useRef([]);
  const didFirstLoadRef = useRef(false);
  const activeTlRef = useRef(null);

  const resetOverlayInitial = () => {
    gsap.set(blocksRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });
    gsap.set(wordsRef.current, { y: "100%" });
  };

  const playCover = (tl) => {
    tl.set(blocksRef.current, { transformOrigin: "left center" });
    tl.to(blocksRef.current, {
      scaleX: 1,
      duration: BLOCK_DUR,
      ease: BLOCK_EASE,
      stagger: BLOCK_STAGGER,
    });
    tl.to(
      wordsRef.current,
      {
        y: "0%",
        duration: WORD_DUR,
        ease: WORD_EASE,
        stagger: WORD_STAGGER,
      },
      "-=0.4"
    );
  };

  const playUncover = (tl) => {
    tl.set(blocksRef.current, { transformOrigin: "right center" });
    tl.to(blocksRef.current, {
      scaleX: 0,
      duration: BLOCK_DUR,
      ease: BLOCK_EASE,
      stagger: BLOCK_STAGGER,
    });
    tl.to(
      wordsRef.current,
      {
        y: "100%",
        duration: WORD_DUR,
        ease: WORD_EASE,
        stagger: WORD_STAGGER,
      },
      "<"
    );
  };

  useEffect(() => {
    if (didFirstLoadRef.current) return;
    didFirstLoadRef.current = true;

    resetOverlayInitial();

    const tl = gsap.timeline({
      onComplete: () => {
        activeTlRef.current = null;
      },
    });
    activeTlRef.current = tl;

    playCover(tl);
    tl.call(() => setStartAnimation(true));
    playUncover(tl);
  }, []);

  useEffect(() => {
    if (!didFirstLoadRef.current) return;
    if (location.pathname === displayLocation.pathname) return;

    setStartAnimation(false);

    if (activeTlRef.current) {
      activeTlRef.current.kill();
    }

    resetOverlayInitial();

    const tl = gsap.timeline({
      onComplete: () => {
        activeTlRef.current = null;
      },
    });
    activeTlRef.current = tl;

    playCover(tl);
    tl.call(() => {
      setDisplayLocation(location);
      window.scrollTo(0, 0);
      setStartAnimation(true);
    });
    playUncover(tl);
  }, [location, displayLocation]);

  return (
    <TransitionContext.Provider value={{ startAnimation, displayLocation }}>
      {children}

      <div className="transition-grid" aria-hidden="true">
        {Array.from({ length: NUM_BLOCKS }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (blocksRef.current[i] = el)}
            className="transition-block"
          />
        ))}
      </div>

      <div className="transition-text-overlay" aria-hidden="true">
        <div className="transition-text">
          <h1>
            <span className="word-wrapper">
              <span
                ref={(el) => (wordsRef.current[0] = el)}
                className="word"
              >
                DAX
              </span>
            </span>
            {" "}
            <span className="word-wrapper">
              <span
                ref={(el) => (wordsRef.current[1] = el)}
                className="word"
              >
                VO
              </span>
            </span>
          </h1>
        </div>
      </div>
    </TransitionContext.Provider>
  );
};

export default TransitionProvider;
