"use client";

import SVGArrowRight from "../icons/SVGArrowRight";
import Button from "../ui/Button";
import BSP_card from "../ui/BSP_card";

import picture1 from "@/public/images/item1.png";
import picture2 from "@/public/images/item2.png";
import picture3 from "@/public/images/item3.png";
import { useState } from "react";
import { TypeProducts, TypeBestSellingPlants, Typeglobals } from "@/components/types/global";

function Best_Selling_Plants({ HOST_STRIPE, data, products, globals }: 
  { HOST_STRIPE: string, data: TypeBestSellingPlants, products: TypeProducts[], globals: Typeglobals | null }) {
  let [MyData, SetMyData] = useState(data);
  const [Myproducts, SetMyProducts] = useState<TypeProducts[]>(products);

  return (<>
    <div className="mxw_1440 px96_15 py-24">
      <div className="flex flex-wrap justify-between w-full align-top">
        <div className="lg:w-1/4 md:w-1/2 w-full my-5 flex lg:items-start justify-center items-center">
          <div className="lg:max-w-[256] max-w-[300]">
            <h2 className="text-3xl font-bold mb-3">{MyData.header}</h2>
            <p className="color_blackgray text-lg mb-6">{MyData.subtitle}</p>
            <Button title="See more" >
              <SVGArrowRight />
            </Button>
          </div>
        </div>


        {MyData.UseCycle === true && MyData.cycle.map((card, index) => {
          if (card.img) return (
            <BSP_card key={index} 
            HOST_STRIPE={HOST_STRIPE}
            imgUrl={card.img.url} 
            alternativeText={card.img.alternativeText}
            price={card.price}
            currency={card.currency}
            header={card.header}
            number_price={card.number_price}
            width={card.img.width}
            height={card.img.height}
              plusClass="lg:w-1/4 md:w-1/2 w-full my-5"/>
          );
        })}
        {MyData.UseCycle === null || MyData.UseCycle === false && Myproducts.map((card, index) => {
          if (card.images && card.images) return (
            <BSP_card key={index} 
            link={`/products/${card.slug}`}
            HOST_STRIPE={HOST_STRIPE}
            imgUrl={card.images[0].url} 
            alternativeText={card.images[0].alternativeText}
            number_price={card.price}
            currency={globals?.currency}
            header={card.title}
            width={card.images[0].width}
            height={card.images[0].height}
              plusClass="lg:w-1/4 md:w-1/2 w-full my-5 gap-6" />
          );
        })}
      </div>
    </div>
  </>);
}

export default Best_Selling_Plants;