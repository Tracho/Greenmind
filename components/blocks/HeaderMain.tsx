"use client";
import { motion } from "framer-motion";

import Image from "next/image";
import { useState } from "react";
import SVGSearch from "../icons/SVGSearch";
import Button from "../ui/Button";
import HeaderImg from "@/public/images/HeaderImg.png";
import Rectangle3 from "../icons/Rectangle3";
import SVGArrowTopHeader from "../icons/SVGArrowTopHeader";
import SVGArrowBottomHeader from "../icons/SVGArrowBottomHeader";


function HeaderMain() {
  let [inp, setInp] = useState("");

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
      <div className="bg_aquamarine p-12 pb-0 rounded-3xl flex flex-wrap items-stretch justify-between relative  lg:overflow-hidden">
        <div className="lg:max-w-md pb-32 z-50">
          <h1 className="text-6xl font-extrabold">Buy your dream plants</h1>
          <div className="flex mt-6">
            <div className="flex flex-col font-medium pe-12 border-r-2 border-e-neutral-600">
              <span className="text-4xl">50+</span>
              <span className="text-lg">Plant Species</span>
            </div>
            <div className="flex flex-col font-medium ps-12">
              <span className="text-4xl">100+</span>
              <span className="text-lg">Customers</span>
            </div>
          </div>

          <div className="mt-12">
            <form onSubmit={handleSubmit} className="relative">
              <input className="bg-white relative rounded-xl py-5 ps-5 pe-12  w-full"
                value={inp} onChange={(e) => setInp(e.target.value)}
                id="search" name="search" alt="What are you looking for?"
                placeholder="What are you looking for?" type="text" />
              <Button classStyle="absolute end-2 top-2 bg_aquamarine" newP="p-3.5">
                <SVGSearch />
              </Button>
            </form>
          </div>
        </div>

        <div className="relative flex w-full max-w-[650] lg:min-w-[470px]">
          {/* Декоративный прямоугольник — привязываем к нижнему левому углу */}
          <span className="absolute transform bottom-25 -start-0 -translate-y-0
           -translate-x-0 z-10 pointer-events-none rotate-[0deg]">
            <SVGArrowBottomHeader />
          </span>
          <span className="absolute transform -top-10 -end-10 -translate-y-0
           -translate-x-0 z-10 pointer-events-none rotate-[-18deg]">
            <SVGArrowTopHeader />
          </span>
          <span className="absolute transform bottom-0 end-0 -translate-y-0 -translate-x-2 z-10 pointer-events-none">
            <Rectangle3 />
          </span>
          <motion.span
            className="flex justify-end w-full relative z-20"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.2,
              duration: 0.5,
              ease: 'easeOut', // плавность

            }}
          >
            <Image
              src={HeaderImg}
              alt="Main header image"
              width={411}
              height={513}
              priority
              className="relative bottom-0 end-0 z-10 -translate-y-0 -translate-x-2"
            />
          </motion.span>
        </div>

      </div>
    </div>
  </>);
}

export default HeaderMain;