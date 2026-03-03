import Image from "next/image";
import picture1 from "@/public/images/item1.png";

import { TypeBestSellingPlantsItem, TypeImageData } from "@/components/types/global";
import Link from "next/link";

import Likes from "@/public/like_gray.svg";
import Bag from "@/public/bag_gray.svg";

type BSPCardProps = TypeBestSellingPlantsItem & TypeImageData & {
  imgUrl?: string | undefined;
  imgjson?: string | undefined;
  plusClass?: string;
  HOST_STRIPE?: string;
  imgClass?: string;
  subContainClass?: string;
  // url: string;
};

function Card({
  link = "#",
  imgUrl,
  alternativeText,
  price,
  discount = null,
  discountboolean = null,
  oldPrice = null,
  number_price,
  currency,
  header,
  width = 300,
  height = 360,
  likes,
  sold,
  inStock,
  plusClass = "",
  imgClass = "rounded-2xl w-full h-[360]",
  subContainClass = 'max-w-[300]',
}: BSPCardProps) {



  return (<>

    <div className="w-full bg-white catalog_card">
      <Link href={link} className="block w-full">
        <div className="w-full h-[225px] sm:h-[225px] flex justify-center items-center relative rounded-2xl z-10 overflow-hidden">
          <Image
            className="object-cover w-full h-full z-0"
            src={imgUrl || picture1}
            alt={alternativeText || "Image"}
            width={width}
            height={height}
          />
        </div>
        <p className="text-base mt-3">{header}</p>
      </Link>

      <div className="flex flex-col justify-between catalog_card_info rounded-2xl text-lg"> 
        <div className="flex flex-wrap justify-between mt-1.5 items-end color_blackgray">
          {
            discountboolean && discount ?
              <div className="flex flex-col flex-wrap">
                <div className="flex flex-nowrap gap-1.5 items-center">
                  <p className="line-through text-sm color_graygray">
                    <span>{currency}{oldPrice}</span>
                  </p>
                  <p className="text-orange-600 text-sm font-semibold">-{discount}%</p>
                </div>
                {/* <p><span>{currency}</span>{number_price}</p> */}
              </div>
              : ""  
          }
          <div className="flex w-full justify-between items-center">
            {price ?
              <p>{price}</p>
              :
              <p><span>{currency}</span>{number_price}</p>
            }
            {likes && <p>
              <Image src={Likes} alt="Likes" width={18} height={18} className="inline-block mr-1 mb-1" />
              {likes}
            </p>}
            {sold && <p>
              <Image src={Bag} alt="Sold" width={18} height={18} className="inline-block mr-1 mb-1" />
              {sold}
            </p>}
            {/* <p>
                {inStock ? `In Stock: ${inStock}` : "Out of Stock"}
              </p> */}
          </div>
        </div>

      </div>
    </div>
    {/* Повторить для остальных элементов */}



  </>);
}

export default Card;