// components/CEOMessage/MotionWrapper.tsx
"use client";

import { motion } from "framer-motion";

export default function MotionWrapper({
  children,
  from,
}: {
  children: React.ReactNode;
  from?: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}
