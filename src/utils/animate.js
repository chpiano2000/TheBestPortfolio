import { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";

export const HERO_EASE = "expo.inOut";
export const HERO_DUR = 1.2;

/**
 * Reveals hero headline lines by animating `top` from 7rem to 0.
 * `lines` is an array of { ref, delay } objects.
 * The initial state is set on mount and the reveal fires when `startAnimation` flips true.
 */
export function useHeroLineReveal(lines, startAnimation) {
  useLayoutEffect(() => {
    lines.forEach(({ ref }) => {
      const el = ref?.current;
      if (el) gsap.set(el, { top: "7rem" });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!startAnimation) return;
    lines.forEach(({ ref, delay = 0 }) => {
      const el = ref?.current;
      if (!el) return;
      gsap.to(el, {
        top: 0,
        duration: HERO_DUR,
        ease: HERO_EASE,
        delay,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAnimation]);
}
