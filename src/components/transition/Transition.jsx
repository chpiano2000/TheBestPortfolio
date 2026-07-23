import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TransitionContext } from "./TransitionContext";
import "./transition.css";

let isFirstLoad = true;

const Transition = (OgComponent) => {
  return function TransitionWrapped(props) {
    const [isFirst] = useState(isFirstLoad);
    const [startAnimation, setStartAnimation] = useState(!isFirst);
    const [stage, setStage] = useState(isFirst ? "cover" : "none");

    useEffect(() => {
      if (!isFirst) return;
      isFirstLoad = false;

      const timer1 = setTimeout(() => {
        setStage("uncover");
        setStartAnimation(true);
      }, 1000);

      const timer2 = setTimeout(() => {
        setStage("complete");
      }, 2000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }, [isFirst]);

    return (
      <TransitionContext.Provider value={{ startAnimation }}>
        <OgComponent {...props} />
        
        {isFirst ? (
          <>
            {stage === "cover" && (
              <>
                {/* Exit Grid (slide-in / covers the screen) */}
                <div className="transition-grid">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="transition-block exit-block"
                      style={{ originX: 0 }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 0.7,
                        ease: [0.9, 0, 0.1, 1],
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>

                {/* Exit Text (reveals DAX VO) */}
                <div className="transition-text-overlay">
                  <div className="transition-text">
                    <h1>
                      <span className="word-wrapper">
                        <motion.span
                          className="word exit-word"
                          initial={{ y: "100%" }}
                          animate={{ y: "0%" }}
                          transition={{
                            duration: 0.65,
                            ease: [0.25, 1, 0.5, 1],
                            delay: 0.35,
                          }}
                        >
                          DAX
                        </motion.span>
                      </span>
                      {" "}
                      <span className="word-wrapper">
                        <motion.span
                          className="word exit-word"
                          initial={{ y: "100%" }}
                          animate={{ y: "0%" }}
                          transition={{
                            duration: 0.65,
                            ease: [0.25, 1, 0.5, 1],
                            delay: 0.35,
                          }}
                        >
                          VO
                        </motion.span>
                      </span>
                    </h1>
                  </div>
                </div>
              </>
            )}

            {stage === "uncover" && (
              <>
                {/* Enter Grid (slide-out / uncovers the screen) */}
                <div className="transition-grid">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="transition-block enter-block"
                      style={{ originX: 1 }}
                      initial={{ scaleX: 1 }}
                      animate={{ scaleX: 0 }}
                      transition={{
                        duration: 0.7,
                        ease: [0.9, 0, 0.1, 1],
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>

                {/* Enter Text (hides DAX VO) */}
                <div className="transition-text-overlay">
                  <div className="transition-text">
                    <h1>
                      <span className="word-wrapper">
                        <motion.span
                          className="word enter-word"
                          initial={{ y: "0%" }}
                          animate={{ y: "100%" }}
                          transition={{
                            duration: 0.65,
                            ease: [0.25, 1, 0.5, 1],
                            delay: 0.05,
                          }}
                        >
                          DAX
                        </motion.span>
                      </span>
                      {" "}
                      <span className="word-wrapper">
                        <motion.span
                          className="word enter-word"
                          initial={{ y: "0%" }}
                          animate={{ y: "100%" }}
                          transition={{
                            duration: 0.65,
                            ease: [0.25, 1, 0.5, 1],
                            delay: 0.1,
                          }}
                        >
                          VO
                        </motion.span>
                      </span>
                    </h1>
                  </div>
                </div>
              </>
            )}

            {/* Exit Grid and Exit Text for leaving this page when we navigate away */}
            <div className="transition-grid">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="transition-block exit-block"
                  style={{ originX: 0 }}
                  initial={{ scaleX: 0 }}
                  exit={{ scaleX: 1 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.9, 0, 0.1, 1],
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>

            <div className="transition-text-overlay">
              <div className="transition-text">
                <h1>
                  <span className="word-wrapper">
                    <motion.span
                      className="word exit-word"
                      initial={{ y: "100%" }}
                      exit={{ y: "0%" }}
                      transition={{
                        duration: 0.65,
                        ease: [0.25, 1, 0.5, 1],
                        delay: 0.35,
                      }}
                    >
                      DAX
                    </motion.span>
                  </span>
                  {" "}
                  <span className="word-wrapper">
                    <motion.span
                      className="word exit-word"
                      initial={{ y: "100%" }}
                      exit={{ y: "0%" }}
                      transition={{
                        duration: 0.65,
                        ease: [0.25, 1, 0.5, 1],
                        delay: 0.35,
                      }}
                    >
                      VO
                    </motion.span>
                  </span>
                </h1>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Normal Route Transitions */}
            {/* Exit Grid (slide-in / covers the screen when leaving) */}
            <div className="transition-grid">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="transition-block exit-block"
                  style={{ originX: 0 }}
                  initial={{ scaleX: 0 }}
                  exit={{ scaleX: 1 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.9, 0, 0.1, 1],
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>

            {/* Exit Text (reveals text when leaving) */}
            <div className="transition-text-overlay">
              <div className="transition-text">
                <h1>
                  <span className="word-wrapper">
                    <motion.span
                      className="word exit-word"
                      initial={{ y: "100%" }}
                      exit={{ y: "0%" }}
                      transition={{
                        duration: 0.65,
                        ease: [0.25, 1, 0.5, 1],
                        delay: 0.35,
                      }}
                    >
                      DAX
                    </motion.span>
                  </span>
                  {" "}
                  <span className="word-wrapper">
                    <motion.span
                      className="word exit-word"
                      initial={{ y: "100%" }}
                      exit={{ y: "0%" }}
                      transition={{
                        duration: 0.65,
                        ease: [0.25, 1, 0.5, 1],
                        delay: 0.35,
                      }}
                    >
                      VO
                    </motion.span>
                  </span>
                </h1>
              </div>
            </div>

            {/* Enter Grid (slide-out / uncovers the screen when entering) */}
            <div className="transition-grid">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="transition-block enter-block"
                  style={{ originX: 1 }}
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.9, 0, 0.1, 1],
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>

            {/* Enter Text */}
            <div className="transition-text-overlay">
              <div className="transition-text">
                <h1>
                  <span className="word-wrapper">
                    <motion.span
                      className="word enter-word"
                      initial={{ y: "0%" }}
                      animate={{ y: "100%" }}
                      transition={{
                        duration: 0.65,
                        ease: [0.25, 1, 0.5, 1],
                        delay: 0.05,
                      }}
                    >
                      DAX
                    </motion.span>
                  </span>
                  {" "}
                  <span className="word-wrapper">
                    <motion.span
                      className="word enter-word"
                      initial={{ y: "0%" }}
                      animate={{ y: "100%" }}
                      transition={{
                        duration: 0.65,
                        ease: [0.25, 1, 0.5, 1],
                        delay: 0.1,
                      }}
                    >
                      VO
                    </motion.span>
                  </span>
                </h1>
              </div>
            </div>
          </>
        )}
      </TransitionContext.Provider>
    );
  };
};

export default Transition;
