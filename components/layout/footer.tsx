import Link from "next/link";
import Logo from "@/public/GREENMIND.svg";
import Image from "next/image";
import SVGf from "../icons/SVGf";
import SVGi from "../icons/SVGi";
import SVGt from "../icons/SVGt";
function Footer() {
  return (<>
    <div className="w-full flex justify-center items-center bg_aquamarine py-12">
      <div className="mxw_1440 flex flex-col px96_15">
        <div className="flex flex-wrap gap-12 justify-between items-start">
          <div className="flex flex-col gap-6 max-w-full sm:max-w-[200px]">
            <div className="flex items-center">
              <Link href="/">
                <Image className="w-[175px] h-auto sm:w-[110px] sm:h-[30px]" src={Logo} alt="Greenmind"  loading="lazy" />
              </Link>
            </div>

            <div>
              <p className="color_blackgray text-lg">We help you find your dream plant</p>
            </div>

            <div className="flex flex-wrap justify-between items-start gap-6"> 
              <Link className="iconSoc" href="#"><SVGf /></Link> 
              <Link className="iconSoc" href="#"><SVGi /></Link> 
              <Link className="iconSoc" href="#"><SVGt /></Link> 
            </div>
          </div>

          <div className="flex justify-between items-start flex-wrap max-w-[460px] w-full [@media(max-width:370px)]:flex-col  [@media(max-width:375px)]:gap-6 sm:gap-12">
            <div className="text-lg">
              <b className="block mb-6">Information</b>
              <ul className="color_blackgray flex flex-col gap-4">
                <li><Link className="underline decoration-transparent hover:text-black hover:decoration-current transition-all duration-300" href="/#">About</Link></li>
                <li><Link className="underline decoration-transparent hover:text-black hover:decoration-current transition-all duration-300" href="/#">Product</Link></li>
                <li><Link className="underline decoration-transparent hover:text-black hover:decoration-current transition-all duration-300" href="/#">Blog</Link></li>
              </ul>
            </div>
            <div>
              <b className="block mb-6">Company</b>
              <ul className="color_blackgray flex flex-col gap-4">
                <li><Link className="underline decoration-transparent hover:text-black hover:decoration-current transition-all duration-300" href="/#">Community</Link></li>
                <li><Link className="underline decoration-transparent hover:text-black hover:decoration-current transition-all duration-300" href="/#">Career</Link></li>
                <li><Link className="underline decoration-transparent hover:text-black hover:decoration-current transition-all duration-300" href="/#">Our story</Link></li>
              </ul>
            </div>
            <div>
              <b className="block mb-6">Contact</b>
              <ul className="color_blackgray flex flex-col gap-4">
                <li><Link className="underline decoration-transparent hover:text-black hover:decoration-current transition-all duration-300" href="/#">Getting Started</Link></li>
                <li><Link className="underline decoration-transparent hover:text-black hover:decoration-current transition-all duration-300" href="/#">Pricing</Link></li>
                <li><Link className="underline decoration-transparent hover:text-black hover:decoration-current transition-all duration-300" href="/#">Resources</Link></li>
              </ul>
            </div>
          </div>

        </div>
        <div className="mt-24">
          <p className="color_blackgray text-lg">2023 all Right Reserved Term of use GREENMIND</p>
        </div>
      </div>
    </div>
  </>);
}

export default Footer;