"use client";

import SVGArrowRight from "../icons/SVGArrowRight";
import Button from "../ui/Button";
import BSP_card from "../ui/BSP_card";

import picture1 from "@/public/images/item1.png";
import picture2 from "@/public/images/item2.png";
import picture3 from "@/public/images/item3.png";
import { useState } from "react";
import { TypeCard } from "@/components/types/global";

function Best_Selling_Plants() {
  const [cards, SetCatds] = useState<TypeCard[]>([
    { imgUrl: picture1.src, imgAlt: "Plant 1", price: 25, currency: "$", header: "Aloe Vera" },
    { imgUrl: picture2.src, imgAlt: "Plant 2", price: 30, currency: "$", header: "Snake Plant" },
    { imgUrl: picture3.src, imgAlt: "Plant 3", price: 45, currency: "$", header: "Peace Lily" },
  ]);

  return (<>
    <div className="mxw_1440 px96_15 py-24">
      <div className="flex flex-wrap justify-between w-full align-top">
        <div className="lg:w-1/4 md:w-1/2 w-full my-5 flex lg:items-start justify-center items-center">
          <div className="lg:max-w-[256] max-w-[300]">
            <h2 className="text-3xl font-bold mb-3">Best Selling Plants</h2>
            <p className="color_blackgray text-lg mb-6">Easiest way to healthy life by buying your favorite plants </p>
            <Button title="See more" >
              <SVGArrowRight />
            </Button>
          </div>
        </div>


        {cards.map((card, index) => {
          return (
            <BSP_card key={index} imgUrl={card.imgUrl} imgAlt={card.imgAlt}
              price={card.price} currency={card.currency} header={card.header}
              plusClass="lg:w-1/4 md:w-1/2 w-full my-5" />
          );
        })}
      </div>
    </div>
  </>);
}

export default Best_Selling_Plants;