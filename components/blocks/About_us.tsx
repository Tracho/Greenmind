"use client";

import { useState } from "react";
import Info_cart from "../ui/info_card";
import { TypeInfoCard, TypeH2Header } from "@/components/types/global";
import SVGbox from "../icons/SVGbox";
import SVGflowerpot from "../icons/SVGflowerpot";
import SVGcall from "../icons/SVGcall";
import H2Header from "../ui/h2Header";

function About_us() {
  const [infoCards, setInfoCards] = useState<TypeInfoCard[]>([
    { svg: <SVGflowerpot />, header: "Our Mission", title: "To provide high-quality plants that enhance the beauty of your space and improve your well-being." },
    { svg: <SVGbox />, header: "Our Vision", title: "To be the leading online plant store, known for our exceptional customer service and diverse plant selection." },
    { svg: <SVGcall />, header: "Our Values", title: "Customer Satisfaction, Quality, Sustainability, and Passion for Plants." },
  ]);
  const [h2header, setH2header] = useState<TypeH2Header>({ header: "About us", title: "Order now and appreciate the beauty of nature" });

  return (<>
    <div className="mxw_1440 px96_15 py-24">
      <H2Header header={h2header.header} title={h2header.title} />
      <div className="flex flex-wrap justify-between items-start">
        {infoCards.map((card, index) => {
          return (
            <Info_cart plusClass="sm:w-1/3 p-3.5 w-full" key={index} svg={card.svg} header={card.header} title={card.title} />
          );
        })}
      </div>
    </div>
  </>);
}

export default About_us;