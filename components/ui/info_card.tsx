import Anim_bot_to_top from "../animation/Anim_bot_to_top";
import Anim_puls from "../animation/Anim_puls";
import { TypeInfoCard } from "../types/global";
type InfoCartProps = TypeInfoCard & {
  classContainer?: string;
};

function Info_cart({ svg, header, subtitle, classContainer = "" }: InfoCartProps) {
  return (<>
    <div className={`flex flex-col justify-center items-center ${classContainer}`}>
      <div className="relative mb-6 w-16 h-16 flex justify-center items-center p-5">
        <Anim_puls className="absolute inset-0 bg_aquamarine rounded-full z-[-1]" />
        {svg}
      </div>

      <Anim_bot_to_top className="flex flex-col justify-center items-center">
        <p className="text-lg font-bold mb-3">{header}</p>
        {subtitle && <span className="text-lg text-center color_blackgray max-w-[330px]"><i>{subtitle}</i></span>}
      </Anim_bot_to_top>
    </div>
  </>);
}

export default Info_cart;