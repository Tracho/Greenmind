import Image from "next/image";
import { TypeCardCate } from "@/components/types/global";
import Button from "./Button";
import SVGArrowRight from "../icons/SVGArrowRight";

type TypeCardCateProps = TypeCardCate & {
  plusClass?: string;
};

function InfoCardsCate({ imgUrl, imgAlt = "", url = "", title, header, plusClass = "", titleLink }: TypeCardCateProps) {
  return (<>

    <div className={`flex flex-col justify-center items-center ${plusClass}`}>
      <div className="flex flex-col items-center">
        {imgUrl && <Image className="rounded-2xl" src={imgUrl} alt={imgAlt} width={300} height={360} />}
        <div className="flex flex-col justify-end text-lg text-center mt-3">
          <p className="font-bold my-3">{header}</p>
          {title && <p className="color_blackgray">{title}</p>}
        </div>
        {titleLink &&
          <div className="flex items-center justify-center">
            <Button classStyle="mt-6 bg-white" newP="px-6 py-3.5">
              {titleLink ? titleLink : "Shop Now"}
              <SVGArrowRight />
            </Button>
          </div>}
      </div>
    </div>
  </>);
}

export default InfoCardsCate;