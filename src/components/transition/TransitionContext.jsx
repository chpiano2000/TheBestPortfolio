import { createContext, useContext } from "react";

export const TransitionContext = createContext({ startAnimation: false });

export const useTransition = () => useContext(TransitionContext);
