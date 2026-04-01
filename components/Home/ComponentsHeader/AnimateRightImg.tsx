import Image, { ImageProps } from "next/image"; // Импортируем типы Next.js
import { motion } from "framer-motion";

import SVGArrowBottomHeader from "@/components/icons/SVGArrowBottomHeader";
import SVGArrowTopHeader from "../../icons/SVGArrowTopHeader";
import Rectangle3 from "../../icons/Rectangle3";
 
 

interface AnimateRightImgProps extends ImageProps {
  // Тут можно добавить свои пропсы, если понадобятся
}
function AnimateRightImg( props:AnimateRightImgProps ) {
  return (
    <div className="relative flex w-full max-w-[650px]">

      <span className="hidden md:flex absolute transform bottom-25 -start-0 -translate-y-0
           -translate-x-0 z-10 pointer-events-none rotate-[0deg]">
        <SVGArrowBottomHeader />
      </span>
      <span className="absolute transform -top-10 -end-0 md:-end-10 -translate-y-0
           -translate-x-0 z-10 pointer-events-none rotate-[-18deg] max-w-[80px] md:max-w-none">
        <SVGArrowTopHeader />
      </span>
      <span className="absolute transform bottom-0 end-0 -translate-y-0 -translate-x-2 z-10 pointer-events-none">
        <Rectangle3 />
      </span>

      <div className="flex items-end justify-end w-full overflow-hidden">
        <motion.span
          className="relative z-20"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            delay: 1.2,
            duration: 0.5,
            ease: 'easeOut', // плавность

          }}
        > 
           <Image 
            priority 
            className="relative bottom-0 end-0 z-10 -translate-y-0 -translate-x-2" 
            {...props} 
          /> 
        </motion.span>
      </div>
    </div>
  );
}

export default AnimateRightImg;