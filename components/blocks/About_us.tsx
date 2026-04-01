import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Info_cart from "../ui/info_card";
import { TypeAboutUs } from "@/components/types/global";
import SVGbox from "../icons/SVGbox";
import SVGflowerpot from "../icons/SVGflowerpot";
import SVGcall from "../icons/SVGcall";
import H2Header from "../ui/h2Header";
import { HomePageElement } from "../types/homePage";

function About_us({ data }: { data: HomePageElement }) {
  let ArrSvg: React.ReactNode[] = [<SVGflowerpot />, <SVGbox />, <SVGcall />];
  return (<>
    {
      <div className="mxw_1440 px96_15 py-24">
        <H2Header header={data.header} subtitle={data.subtitle} />
        <div className="flex flex-wrap justify-between items-start">
          {
            (data.cycle && data.cycle.length > 0) &&
            data.cycle.map((card, index) => {
              return (
                <Info_cart classContainer="sm:w-1/3 my-5 md:my-0 p-3.5 w-full"
                  key={index}
                  svg={ArrSvg[index]}
                  header={card.header}
                  subtitle={card.subtitle} />
              );
            })}
        </div>
      </div>
    }
  </>);
}

export default About_us;