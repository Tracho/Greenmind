"use client";
import H2Header from "../ui/h2Header";
import { useState } from "react";
import { TypeH2Header, TypeCardCate, TypeMainCategories } from "../types/global";
import InfoCardsCate from "../ui/info_card_cate";

import cateItem1 from "@/public/images/cateItem1.png";
import cateItem2 from "@/public/images/cateItem2.png";
import cateItem3 from "@/public/images/cateItem3.png";

function MainCategories({ HOST_STRIPE, data }: { HOST_STRIPE: string, data: TypeMainCategories }) {
  const [h2header, setH2header] = useState<TypeH2Header>({
    header: "Main Categories",
    subtitle: "Find what you are looking for"
  });

  const [infoCards, setInfoCards] = useState<TypeCardCate[]>([
    { header: "Natural Plants", subtitle: "", imgUrl: cateItem1.src, imgAlt: "", url: "", titleLink: "" },
    { header: "Plant Accessories", subtitle: "Horem ipsum dolor sit amet, consectetur adipiscing elit.", imgUrl: cateItem2.src, imgAlt: "", url: "", titleLink: "Explore" },
    { header: "Artificial Plants", subtitle: "", imgUrl: cateItem3.src, imgAlt: "", url: "", titleLink: "" },
  ]);

  const [myData, setMyData] = useState<TypeMainCategories>(data);

  return (<>
    <div className="mxw_1440 px96_15 pt-24">
      <H2Header header={myData.header} subtitle={myData.subtitle} />
    </div>
    <div className="w-full bg_gradient_width_aqu">
      <div className="mxw_1440 px96_15 pb-24">
        <div
          className="flex flex-wrap justify-between items-start">
          {
          (myData.cycle && myData.cycle.length > 0) &&
          myData.cycle.map((card, index) => {
            let styleClass: string = (index % 2 === 0) ? "" : "my-7 sm:my-0 sm:mt-24";
            let plusClass: string = `sm:w-1/3 p-3.5 w-full ${styleClass}`;
            return (
              <InfoCardsCate plusClass={plusClass} key={index}
                header={card?.header} subtitle={card?.subtitle}
                img={card?.img}  text_btn={card?.text_btn} HOST_STRIPE={HOST_STRIPE} />
            );
          })}
        </div>
      </div>
    </div>
  </>);
}

export default MainCategories;