import { TypeInfoCard } from "../types/global";
type InfoCartProps = TypeInfoCard & {
  plusClass?: string;
};

function Info_cart({ svg, header, subtitle, plusClass = "" }: InfoCartProps) {
  return (<>
    {(header || subtitle) &&
      <div className={`flex flex-col justify-center items-center ${plusClass}`}>
        <div className="mb-6 bg_aquamarine rounded-full p-5 w-16 h-16 flex justify-center items-center">
          {svg}
        </div>
        {header && <p className="text-lg font-bold mb-3">{header}</p>}
        {subtitle && <span className="text-lg text-center color_blackgray max-w-[330px]"><i>{subtitle}</i></span>}
      </div>
    }
  </>);
}

export default Info_cart;