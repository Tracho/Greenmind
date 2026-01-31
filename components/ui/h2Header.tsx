import { TypeH2Header } from "../types/global";

function H2Header({ header, subtitle }: TypeH2Header) {
  return (<>
    { (header || subtitle) &&
      <div className="flex justify-center items-center flex-col mb-12">
        {header && <h2 className="text-3xl font-bold mb-3 mb-3">{header}</h2>}
        {subtitle && <p className="color_blackgray text-center text-lg">{subtitle}</p>}
      </div>
    }
  </>);
}

export default H2Header;