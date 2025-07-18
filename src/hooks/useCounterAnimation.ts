// hooks/useCounterAnimation.ts

import { useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

// Counter Animation Hook
export const useCounterAnimation = (target: number, duration: number = 2) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    duration: duration * 1000,
    bounce: 0
  });
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = Math.round(latest).toString();
      }
    });

    return unsubscribe;
  }, [springValue]);

  return nodeRef;
};