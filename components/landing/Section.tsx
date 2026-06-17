"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** Shared entrance: matches the prototype ew-rise (fade up, .6s ease). */
export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/**
 * Section entrance wrapper. Fades its content up the first time it scrolls
 * into view. Use for whole sections so the page reveals as you scroll.
 */
export function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay } },
      }}
    >
      {children}
    </motion.div>
  );
}
