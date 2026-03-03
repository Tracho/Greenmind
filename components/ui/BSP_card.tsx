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

function BSP_card({
  link = "#",
  imgUrl,
  imgjson,
  alternativeText,
  price,
  discount = null,
  discountboolean = null,
  oldPrice = null,
  HOST_STRIPE,
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

    <div className={`catalog_card flex flex-col justify-start items-center ${plusClass}`}>
      <div className={`${subContainClass}`}>
        <Link href={link}>
          <div className="max-w-[300] max-h-[360] flex justify-center items-center">
            <Image className={imgClass} src={(imgUrl ? imgUrl : picture1)} alt={alternativeText || "Image"} width={width} height={height} />
          </div>
          <div className="flex flex-col justify-between catalog_card_info bg-white rounded-2xl text-lg py-3">
            <p className="text-base">{header}</p>

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
                // price ?
                //   <p>{price}</p>
                //   :
                //   <p><span>{currency}</span>{number_price}</p>

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
        </Link>
      </div>
    </div>
  </>);
}

export default BSP_card;