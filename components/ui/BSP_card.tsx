import Image from "next/image";
import picture1 from "@/public/images/item1.png";

import { TypeBestSellingPlantsItem, TypeImageData } from "@/components/types/global";

type BSPCardProps = TypeBestSellingPlantsItem & TypeImageData & {
  imgUrl?: string | undefined;
  plusClass?: string;
  HOST_STRIPE?: string
};

function BSP_card({ imgUrl, alternativeText, price, HOST_STRIPE, number_price, currency, header, width = 300, height = 360, plusClass = "" }: BSPCardProps) {
  return (<>

    <div className={`flex flex-col justify-center items-center ${plusClass}`}>
      <div>
        <Image className="rounded-2xl" src={(imgUrl ? HOST_STRIPE + imgUrl : picture1)} alt={alternativeText || "Image"} width={width} height={height} />
        <div className="flex flex-col justify-end text-lg mt-3">
          <p>{header}</p>
          {price ?
            <p className="color_blackgray">{price}</p>
            :
            <p className="color_blackgray">{currency}{number_price}</p>
          }
        </div>
      </div>
    </div>
  </>);
}

export default BSP_card;