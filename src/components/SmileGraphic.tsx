"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SmileGraphicProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  showEyes?: boolean;
  animate?: boolean;
  className?: string;
  variant?: "smile" | "flat" | "wide";
}

const VARIANTS = {
  smile: "M 10 50 Q 50 90 90 50",
  flat: "M 10 50 Q 50 60 90 50",
  wide: "M 0 40 Q 50 100 100 40",
};

export function SmileGraphic({
  size = 120,
  color = "currentColor",
  strokeWidth = 3,
  showEyes = false,
  animate = true,
  className,
  variant = "smile",
}: SmileGraphicProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !prefersReducedMotion;
  const pathData = VARIANTS[variant];

  return (
    <motion.svg
      width={size}
      height={size * (showEyes ? 0.75 : 0.5)}
      viewBox={`0 0 100 ${showEyes ? 100 : 80}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("overflow-visible", className)}
      initial={shouldAnimate ? "hidden" : "visible"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {showEyes && (
        <>
          <motion.circle
            cx="25"
            cy="20"
            r={strokeWidth * 1.5}
            fill={color}
            variants={{
              hidden: { scale: 0, opacity: 0 },
              visible: { 
                scale: 1, 
                opacity: 1,
                transition: { delay: 0.6, duration: 0.4, ease: "backOut" }
              }
            }}
          />
          <motion.circle
            cx="75"
            cy="20"
            r={strokeWidth * 1.5}
            fill={color}
            variants={{
              hidden: { scale: 0, opacity: 0 },
              visible: { 
                scale: 1, 
                opacity: 1,
                transition: { delay: 0.7, duration: 0.4, ease: "backOut" }
              }
            }}
          />
        </>
      )}
      <motion.path
        d={pathData}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              duration: 1.2,
              ease: "easeInOut",
            },
          },
        }}
      />
    </motion.svg>
  );
}
