"use client";
import { motion } from "framer-motion";

function Rectangle3(props: React.SVGProps<SVGAElement>) {
  return (<>
    <motion.svg
      width="450"
      height="400"
      viewBox="0 0 450 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={"w-full h-full"}

      initial={{ opacity: 0, scale: 0 }} 
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        delay: 0.7,
        duration: 0.4,
        scale: { delay: 0.7, type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <motion.path
        // начальная форма
        initial={{
          d: "M0 200C0 89.5431 89.5431 0 200 0H250C360.457 0 450 89.5431 450 200V200C450 310.457 360.457 400 250 400H200C89.543 400 0 310.457 0 200V200Z",
        }}
        whileInView={{ d: "M0 200C0 89.5431 89.5431 0 200 0H250C360.457 0 450 89.5431 450 200V200C450 410.457 460.457 1000 350 400H200C89.543 400 0 310.457 0 200V200Z", }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          delay: 1.7, // задержка перед началом анимации
          duration: 1, // длительность
          repeat: 0, // бесконечная анимация
          repeatType: "mirror", // туда-обратно
          ease: "easeInOut", // плавность
        }}
        fill="#fff"
      />

    </motion.svg>
  </>);
}

export default Rectangle3;

