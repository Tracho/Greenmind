"use client";

import SVGArrowRight from "../icons/SVGArrowRight";
import Button from "../ui/Button";
import BSP_card from "../ui/BSP_card";

import picture1 from "@/public/images/item1.png";
import picture2 from "@/public/images/item2.png";
import picture3 from "@/public/images/item3.png";
import { useState } from "react";
import { TypeProducts, Typeglobals } from "@/components/types/global";
import Card from "../ui/Card";
import Anim_bot_to_top from "../animation/Anim_bot_to_top";
import { HomePageElement, Product } from "../types/homePage";

type Proprs = {
  HOST_STRIPE: string,
  data: HomePageElement,
  products: Product[],
  globals: Typeglobals | null
}
function Best_Selling_Plants({ HOST_STRIPE, data, products, globals }: Proprs) {
  // let [MyData, SetMyData] = useState(data);
  // const [Myproducts, SetMyProducts] = useState<TypeProducts[]>(products);
  console.log(products)
  return (<>
    <div className="mxw_1440 px96_15 py-24">
      {/* <div className="flex flex-wrap justify-between w-full align-top"> */}
      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 w-full gap-10 sm:gap-10 relative">

        {/* <div className="xl:w-1/4 sm:w-1/2 w-full my-5 flex lg:items-start lg:justify-start justify-center items-center">  */}
        <Anim_bot_to_top className="flex justify-center items-center sm:items-start">
          <div className="xl:max-w-[256px] max-w-[300px]">
            <h2 className="text-3xl font-bold mb-3">{data.header}</h2>
            <p className="color_blackgray text-lg mb-6">{data.subtitle}</p>
            <Button subtitle="See more" >
              <SVGArrowRight />
            </Button>
          </div>
        </Anim_bot_to_top>

        {/* </div> */}


        {/* {data.UseCycle === true && data.cycle.map((card, index) => {
          if (card.img) return ( 
            <Card
              key={index}
              documentId={card.documentId}
              HOST_STRIPE={HOST_STRIPE}
              imgUrl={(card.img.hash !== undefined ? `${HOST_STRIPE}/uploads/small_${card.img.hash}${card.img.ext}` : `${HOST_STRIPE}${card.img.url}`)}
              alternativeText={card.img.alternativeText}
              price={card.price}
              currency={card.currency}
              header={card.header}
              number_price={card.number_price}
              width={card.img.width}
              height={card.img.height}  
              />
          );
        })} */}
        {data.UseCycle === null || data.UseCycle === false && products.map((card, index) => {
          if (card.images && card.images) return (
            <Anim_bot_to_top className="flex justify-center items-center" key={index}>
              <Card
                key={index}
                documentId={card.documentId}
                link={`/products/${card.slug}`}
                HOST_STRIPE={HOST_STRIPE}
                imgUrl={(card.images[0].hash !== undefined ? `${HOST_STRIPE}/uploads/small_${card.images[0].hash}${card.images[0].ext}` : `${HOST_STRIPE}${card.images[0].url}`)}
                imgUrlBasket={(card.images[0].url !== undefined ? `${HOST_STRIPE}/uploads/thumbnail_${card.images[0].hash}${card.images[0].ext}` : '')}
                alternativeText={card.images[0]?.alternativeText}
                number_price={card.price}
                discount={card.discount}
                discountboolean={card.discountboolean}
                oldPrice={card.oldPrice}
                likes={card.likes}
                inStock={card?.inStock}
                sold={card.sold}
                currency={globals?.currency || "$"}
                header={card.title}
                width={card.images[0]?.width}
                height={card.images[0]?.height}
              />
            </Anim_bot_to_top>
          );
        })}
      </div>
    </div>
  </>);
}

export default Best_Selling_Plants;