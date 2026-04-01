"use client";
import { motion } from "framer-motion";

interface AnimbotProps {
  children?: React.ReactNode;
  y?: number;
  duration?: number;
  delay?: number;
  className?:string;
}

function Anim_puls({ children, y = 0, duration = 0.7, delay = 0, className=""}: AnimbotProps) {
  return (
    <motion.div
      className={className}
      initial={{y: y, scale: 0.3}}
      whileInView={{y: 0, scale: [0.3, 1.25, 0.9, 1] }}
      viewport={{ once: true, margin: "-100px" }} // Все настройки в одном месте
      transition={{ duration: duration, ease: "easeOut", delay: delay, times: [0, 0.4, 0.7, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default Anim_puls;
