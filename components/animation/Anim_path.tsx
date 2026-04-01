"use client"

import { motion } from "framer-motion";
type Props = {
  d: string,
  fill?: string,
  strokeDasharray: string,
  strokeDashoffset: string,
  stroke: string,
  strokeWidth: string,
  y?: number;
  duration?: number;
  delay?: number;

}
function Anim_path({
  d,
  fill = "",
  strokeDasharray = "",
  strokeDashoffset = "",
  stroke = "",
  strokeWidth = "",
  y = 0, duration = 1, delay = 0, }: Props) {
  return (<>
    <motion.path
      d={d}
      fill={fill}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={strokeDashoffset}
      stroke={stroke}
      strokeWidth={strokeWidth}

      // initial={{ pathLength: 0, strokeDasharray: 0, fill: "#1E1E1E00" }} 
      // animate={{ pathLength: 1, strokeDasharray: 243, fill: "#1E1E1E", strokeWidth: "0" }}
      // transition={{
      //   duration: 2,      // длительность анимации
      //   ease: "easeInOut", // плавность
      // }}

      initial={{ fill: `${fill}00`, pathLength: 0, strokeDasharray: 0, y: y, }}
      whileInView={{ fill: fill, pathLength: 1, strokeDasharray: 243, y: 0 , strokeWidth: "0"}}
      viewport={{ once: true, margin: "-100px" }} // Все настройки в одном месте
      transition={{ duration: duration, ease: "easeOut", delay: delay }}
    />
  </>);
}

export default Anim_path;