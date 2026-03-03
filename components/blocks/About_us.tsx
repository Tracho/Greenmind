"use client";

import { useState } from "react";
import Info_cart from "../ui/info_card";
import { TypeAboutUs } from "@/components/types/global";
import SVGbox from "../icons/SVGbox";
import SVGflowerpot from "../icons/SVGflowerpot";
import SVGcall from "../icons/SVGcall";
import H2Header from "../ui/h2Header";

function About_us({ HOST_STRIPE, data }: { HOST_STRIPE?: string, data?: TypeAboutUs }) {
  let [MyData, SetMyData] = useState<TypeAboutUs | undefined>(data);
  let ArrSvg:  React.ReactNode[] = [<SVGflowerpot />, <SVGbox />, <SVGcall />];

  return (<>
    {
    (MyData && MyData !== undefined) &&
      <div className="mxw_1440 px96_15 py-24">
        <H2Header header={MyData?.header} subtitle={MyData?.subtitle} />
        <div className="flex flex-wrap justify-between items-start">
          {
            (MyData?.cycle && MyData.cycle.length > 0) &&
            MyData.cycle.map((card, index) => {
              return (
                <Info_cart plusClass="sm:w-1/3 my-5 md:my-0 p-3.5 w-full" key={index} svg={ArrSvg[index]} header={card.header} subtitle={card.subtitle} />
              );
            })}
        </div>
      </div>
    }
  </>);
}

export default About_us;