"use client"
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  runNumberL: string;
  runNumberR: string;
  subtitleL: string;
  subtitleR: string;
}
function RunNumbers({ runNumberL, runNumberR, subtitleL, subtitleR }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [runNumber, setRunNumber] = useState({
    runLeft: 0,
    // Извлекаем только цифры и преобразуем в массив, если это необходимо
    leftNumber: Number(runNumberL.replace(/\D/g, "")),
    runRight: 0,
    rightNumber: Number(runNumberR.replace(/\D/g, "")),
  });


  useEffect(() => {
    if (!isInView) return;

    if (isInView) {
      const stepLeft = Math.round(runNumber.leftNumber / 10);
      const stepRight = Math.round(runNumber.rightNumber / 10);
      const runInterval = setInterval(() => {
        setRunNumber((prev) => {
          if (prev.runLeft >= prev.leftNumber && prev.runRight >= prev.rightNumber) {
            clearInterval(runInterval);
            return prev;
          }

          return {
            ...prev,
            runLeft: Math.min(prev.runLeft + stepLeft, prev.leftNumber),
            runRight: Math.min(prev.runRight + stepRight, prev.rightNumber),
          };
        });
      }, 100);

      return () => clearInterval(runInterval);
    }
  }, [isInView]); // Только isInView в зависимостях

  // console.log("RunNumbers")
  return (<>
     <div className="flex justify-between max-w-[320px] mt-6" ref={ref}>
      <div className="flex w-1/2 border-r-2 border-e-neutral-600">
        <div className="flex flex-col font-medium flex-1 min-w-0">
          <span className="text-4xl">{runNumber.runLeft}+</span>
          <span className="text-lg">{subtitleL}</span>
        </div>
      </div>

      <div className="flex w-1/2 justify-end">
        <div className="flex flex-col font-medium flex-1 min-w-0 text-right">
          <span className="text-4xl">{runNumber.runRight}+</span>
          <span className="text-lg">{subtitleR}</span>
        </div>
      </div>
    </div> 
  </>);
}

export default RunNumbers;