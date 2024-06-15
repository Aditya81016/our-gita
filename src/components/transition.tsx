import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function Transition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      exit={{
        y: window.innerWidth > window.innerHeight ? -window.innerHeight : 0,
        x: window.innerWidth < window.innerHeight ? -window.innerWidth : 0,
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
