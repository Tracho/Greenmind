"use client";
import Image from "next/image";
import { TypeMainCategoriesCycle } from "@/components/types/global";
import Button from "./Button";
import SVGArrowRight from "../icons/SVGArrowRight";

type TypeCardCateProps = TypeMainCategoriesCycle & {
  plusClass?: string;
  HOST_STRIPE: string;
};

function InfoCardsCate({ img, subtitle, header, plusClass = "", text_btn, HOST_STRIPE }: TypeCardCateProps) {
  return (<>
    {header &&
      <div className={`flex flex-col justify-center items-center ${plusClass}`}>
        <div className="flex flex-col items-center">
          {img?.url && <Image className="rounded-2xl" src={HOST_STRIPE +img.url} alt={img.alternativeText || ""} width={300} height={360} layout="load" />}
          <div className="flex flex-col justify-end text-lg text-center mt-3">
            {header && <p className="font-bold my-3">{header}</p>}
            {subtitle && <p className="color_blackgray">{subtitle}</p>}
          </div>
          {text_btn &&
            <div className="flex items-center justify-center">
              <Button classStyle="mt-6 bg-white" newP="px-6 py-3.5">
                {text_btn ? text_btn : "Shop Now"}
                <SVGArrowRight />
              </Button>
            </div>}
        </div>
      </div>
    }
  </>);
}

export default InfoCardsCate;