import { TypeH2Header } from "../types/global";

function H2Header({header,title}:TypeH2Header) {
  return (<>
    <div className="flex justify-center items-center flex-col mb-12">
      <h2 className="text-3xl font-bold mb-3 mb-3">About us</h2>
      <p className="color_blackgray text-lg">Order now and appreciate the beauty of nature</p>
    </div>
  </>);
}

export default H2Header;