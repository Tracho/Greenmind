"use client";
import { motion, HTMLMotionProps } from "framer-motion";

interface AnimbotProps {
  // Используем специальные пропсы для motion.div
  boxProps?: HTMLMotionProps<"div">; 
  children: React.ReactNode;
  left?: number;
  duration?: number;
  delay?: number;
}

function Anim_left_to_right({ 
  boxProps, 
  children, 
  left = 20, 
  duration = 0.7, 
  delay = 0 
}: AnimbotProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: left }} // Рекомендую x вместо left для производительности
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: duration, ease: "easeOut", delay: delay }}
      {...boxProps} // Теперь типы совпадают идеально
    >
      {children}
    </motion.div>
  );
}

export default Anim_left_to_right;
