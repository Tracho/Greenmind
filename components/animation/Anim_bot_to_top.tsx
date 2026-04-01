"use client";
import { motion } from "framer-motion";

interface AnimbotProps {
  children: React.ReactNode;
  y?: number;
  duration?: number;
  delay?: number;
  className?:string;
}

function Anim_bot_to_top({ children, y = 20, duration = 0.7, delay = 0, className=""}: AnimbotProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} // Все настройки в одном месте
      transition={{ duration: duration, ease: "easeOut", delay: delay }}
    >
      {children}
    </motion.div>
  );
}

export default Anim_bot_to_top;
