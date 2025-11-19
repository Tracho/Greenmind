"use client";
import H2Header from "../ui/h2Header";
import { useState } from "react";
import { TypeH2Header, TypeCardCate } from "../types/global";
import InfoCardsCate from "../ui/info_card_cate";

import cateItem1 from "@/public/images/cateItem1.png";
import cateItem2 from "@/public/images/cateItem2.png";
import cateItem3 from "@/public/images/cateItem3.png";

function MainCategories() {
  const [h2header, setH2header] = useState<TypeH2Header>({
    header: "Main Categories",
    title: "Find what you are looking for"
  });

  const [infoCards, setInfoCards] = useState<TypeCardCate[]>([
    { header: "Natural Plants", title: "", imgUrl: cateItem1.src, imgAlt: "", url: "", titleLink: "" },
    { header: "Plant Accessories", title: "Horem ipsum dolor sit amet, consectetur adipiscing elit.", imgUrl: cateItem2.src, imgAlt: "", url: "", titleLink: "Explore" },
    { header: "Artificial Plants", title: "", imgUrl: cateItem3.src, imgAlt: "", url: "", titleLink: "" },
  ]);

  return (<>
    <div className="mxw_1440 px96_15 pt-24">
      <H2Header header={h2header.header} title={h2header.title} />
    </div>
    <div className="w-full bg_gradient_width_aqu">
      <div className="mxw_1440 px96_15 pb-24">
        <div
          className="flex flex-wrap justify-between items-start">
          {infoCards.map((card, index) => {
            let styleClass: string = (index % 2 === 0) ? "items-start" : "items-end mt-24";
            let plusClass: string = `sm:w-1/3 p-3.5 w-full ${styleClass}`;
            return (
              <InfoCardsCate plusClass={plusClass} key={index}
                url={card.url} header={card.header} title={card.title}
                imgUrl={card.imgUrl} imgAlt={card.imgAlt} titleLink={card.titleLink} />
            );
          })}
        </div>
      </div>
    </div>
  </>);
}

export default MainCategories;