"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function ScrollSmooth({
  children,
}: {
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Framer Motion hooks
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 45,
    mass: 0.3,
  });

  // Prevent accessing window before it's available
  const y = useTransform(smoothProgress, (v) => {
    return -v * (contentHeight - window.innerHeight);
  });

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Scroll space */}
      <div style={{ height: contentHeight }} />

      {/* Scroll content */}
      <motion.div
        ref={contentRef}
        className="scrollBody fixed top-0 left-0 w-full"
        style={{ y }}
      >
        {children}
      </motion.div>
    </>
  );
}
