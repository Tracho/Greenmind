"use client";
 
import { HomePageElement } from "../types/homePage";
 
import Form from "../ux/Form";
import Anim_left_to_right from "../animation/Anim_left_to_right";
import RunNumbers from "./ComponentsHeader/RunNumbers";
import AnimateRightImg from "./ComponentsHeader/AnimateRightImg";


function HeaderMain({ data, HOST_STRIPE }: { data: HomePageElement, HOST_STRIPE: string }) {
 
  return (<>
    <div className="mxw_1440 px96_15">
      <div className="bg_aquamarine pb-0 p-6 md:p-12 md:pb-0 rounded-3xl flex flex-wrap items-stretch justify-between relative  sm:overflow-hidden">

        <div className="w-full md:max-w-md pb-32 z-20">
          <Anim_left_to_right left={-20}>
            <h1 className="fs60_42 font-extrabold">{data.header}</h1>
          </Anim_left_to_right>

          <RunNumbers runNumberL={data.subtitle_l_number} runNumberR={data.subtitle_r_number} subtitleL={data.subtitle_l_text} subtitleR={data.subtitle_r_text} />
 
          <div className="mt-12">
            <Form alt={data.input_placeholder} placeholder={data.input_placeholder} />
          </div>
        </div>

        <div className="absolute rightHeaderMainSvg pb-0 p-6 md:p-12 md:pb-0"> 
          <AnimateRightImg  src={HOST_STRIPE + data.image.url}
              alt={data.image?.alternativeText || "image"}
              width={data.image?.width}
              height={data.image?.height} />
        </div>

      </div>
    </div>
  </>);
}

export default HeaderMain;