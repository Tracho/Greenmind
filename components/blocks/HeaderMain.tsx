"use client";
import { motion } from "framer-motion";

import { TypeHeaderBlock } from "@/components/types/global";
import Image from "next/image";
import { useState } from "react";
import SVGSearch from "../icons/SVGSearch";
import Button from "../ui/Button";
import HeaderImg from "@/public/images/HeaderImg.png";
import Rectangle3 from "../icons/Rectangle3";
import SVGArrowTopHeader from "../icons/SVGArrowTopHeader";
import SVGArrowBottomHeader from "../icons/SVGArrowBottomHeader";


function HeaderMain({ data, HOST_STRIPE }: { data: TypeHeaderBlock, HOST_STRIPE: string }) {
  let [myData, setMyDsta] = useState<TypeHeaderBlock>(data);
  let [inp, setInp] = useState("");

  // console.log(myData)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inp.trim() !== "") {
      setInp("");
    } else {
      return;
    }
    console.log("Searching for:", inp);
  }

  return (<>
    <div className="mxw_1440 px96_15">
      <div className="bg_aquamarine pb-0 p-6 md:p-12 md:pb-0  rounded-3xl flex flex-wrap items-stretch justify-between relative  lg:overflow-hidden">
        
        <div className="w-full md:max-w-md pb-32 z-50">
        {/* <div className="w-1/2 max-w-[450px] min-w-[450px] pb-32 z-50"> */}
          <h1 className="fs60_42 font-extrabold">{myData.header}</h1>
          <div className="flex justify-between max-w-[320px] mt-6">
            <div className="flex w-1/2 border-r-2 border-e-neutral-600">
              <div className="flex flex-col font-medium flex-1 min-w-0">
                <span className="text-4xl">{myData.subtitle_l_number}</span>
                <span className="text-lg">{myData.subtitle_l_text}</span>
              </div>
            </div>

            <div className="flex w-1/2 justify-end">
              <div className="flex flex-col font-medium flex-1 min-w-0 text-right">
                <span className="text-4xl">{myData.subtitle_r_number}</span>
                <span className="text-lg">{myData.subtitle_r_text}</span>
              </div>
            </div>
          </div>


          <div className="mt-12">
            <form onSubmit={handleSubmit} className="relative">
              <input className="bg-white relative rounded-xl py-5 ps-5 pe-12  w-full"
                value={inp} onChange={(e) => setInp(e.target.value)}
                id="search" name="search" alt={myData.input_placeholder}
                placeholder={myData.input_placeholder} type="text" />
              <Button classStyle="absolute end-2 top-2 bg_aquamarine" newP="p-3.5">
                <SVGSearch />
              </Button>
            </form>
          </div>
        </div>

        <div className="relative flex w-full max-w-[650px] lg:min-w-[470px]">
        {/* <div className="relative flex  lg:min-w-[470px]"> */}
          {/* Декоративный прямоугольник — привязываем к нижнему левому углу */}
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
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.2,
                duration: 0.5,
                ease: 'easeOut', // плавность

              }}
            >
              {myData.image &&
                <Image
                  src={HOST_STRIPE + myData.image.url}
                  alt={myData.image?.alternativeText || "image"}
                  width={myData.image?.width}
                  height={myData.image?.height}
                  priority
                  className="relative bottom-0 end-0 z-10 -translate-y-0 -translate-x-2"
                />
              }

            </motion.span></div>
        </div>

      </div>
    </div>
  </>);
}

export default HeaderMain;