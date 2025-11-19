import Image from "next/image";
import { TypeCard } from "@/components/types/global";

type BSPCardProps = TypeCard & {
  plusClass?: string;
};

function BSP_card({ imgUrl, imgAlt = "", price, currency, header, plusClass = "" }: BSPCardProps) {
  return (<>

    <div className={`flex flex-col justify-center items-center ${plusClass}`}>
      <div>
        <Image className="rounded-2xl" src={imgUrl} alt={imgAlt} width={300} height={360} />
        <div className="flex flex-col justify-end text-lg mt-3">
          <p>{header}</p>
          <p className="color_blackgray">{currency}{price}</p>
        </div>
      </div>
    </div>
  </>);
}

export default BSP_card;