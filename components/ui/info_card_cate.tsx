"use client";
import Image from "next/image";
import { TypeMainCategoriesCycle } from "@/components/types/global";
import Button from "./Button";
import SVGArrowRight from "../icons/SVGArrowRight";
import Anim_bot_to_top from "../animation/Anim_bot_to_top";

type TypeCardCateProps = TypeMainCategoriesCycle & {
  plusClass?: string;
  HOST_STRIPE: string;
};

function InfoCardsCate({ img, subtitle, header, plusClass = "", text_btn, HOST_STRIPE }: TypeCardCateProps) {
  return (<>
    {header &&
    
      <Anim_bot_to_top className={`flex flex-col justify-center items-center ${plusClass}`}>
        <div className="flex flex-col items-center">
          {img?.url && <Image className="rounded-2xl" src={HOST_STRIPE +img.url} alt={img.alternativeText || ""} width={300} height={360} layout="load" />}
          <Anim_bot_to_top className="flex flex-col justify-end text-lg text-center mt-3">
            {header && <p className="font-bold my-3">{header}</p>}
            {subtitle && <p className="color_blackgray">{subtitle}</p>}
          </Anim_bot_to_top>
          {text_btn &&
            <Anim_bot_to_top className="flex items-center justify-center">
              <Button classStyle="mt-6 bg-white" newP="px-6 py-3.5">
                {text_btn ? text_btn : "Shop Now"}
                <SVGArrowRight />
              </Button>
            </Anim_bot_to_top>}
        </div>
      </Anim_bot_to_top>
    }
  </>);
}

export default InfoCardsCate;