"use client"
import { motion, useInView, useAnimate } from "framer-motion";
// import { useAnimate } from "motion/react-mini";
import { useEffect, useRef } from "react";

type Props = {
  w?:string,
  h?:string,
  strokeW?:string,
}
function SVGLoading({w="64px",h="64px", strokeW="32"}:Props) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [scope, animate] = useAnimate();
  console.log(isInView)
  useEffect(() => {
    if (isInView === true) {
      // Настройки для всех точек
      const options = {
        duration: 1.5, // 1с движение + 0.5с пауза
        repeat: Infinity,
        ease: "easeInOut" as const, // Явно указываем тип для ease
      };

      // Анимируем c3
      animate(".c3",
        { y: [0, 10, 0, 0, 0], scale: [1, 1.2, 1, 1, 1] },
        { ...options, delay: 0 }
      );

      // Анимируем c1
      animate(".c1",
        { y: [0, 10, 0, 0, 0], scale: [1, 1.2, 1, 1, 1] },
        { ...options, delay: 0.2 }
      );

      // Анимируем c2
      animate(".c2",
        { y: [0, 10, 0, 0, 0], scale: [1, 1.2, 1, 1, 1] },
        { ...options, delay: 0.4 }
      );
    }
  }, [isInView, animate]);


  return (<>
    <span ref={ref}>
      <svg width={w} height={h} ref={scope} xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
        <circle className="c1" cx="256" cy="256" r="32" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeW} />
        <circle className="c2" cx="416" cy="256" r="32" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeW} />
        <circle className="c3" cx="96" cy="256" r="32" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeW} />
      </svg>
    </span>
  </>);
}

export default SVGLoading;
