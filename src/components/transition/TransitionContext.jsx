import { createContext, useContext } from "react";

export const TransitionContext = createContext({
  startAnimation: false,
  displayLocation: null,
});

export const useTransition = () => useContext(TransitionContext);
