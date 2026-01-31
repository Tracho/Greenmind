import Link from "next/link";
import SVGBurgerMenu from "../icons/SVGBurgerMenu";
import SVGPerson from "../icons/SVGPerson";
import SVGCart from "../icons/SVGCart";
import Image from "next/image";
import Logo from "@/public/GREENMIND.svg";

function NavBar() {
	return (
		<>
			{/* <div className="bg-yellow-600"> */}
			<div>
				<div className="mxw_1440 py-5 px-4 sm:py-8 sm:px-6 md:py-10 md:px-24 flex items-center justify-between">
					<div className="text-sm sm:text-base md:text-lg font-bold">
						<Image priority  src={Logo} className="object-contain" alt="Greenmind" width={150} height={50} />
					</div>
					<div className="flex items-center justify-end md:justify-between w-full ps-0 md:ps-24">
						<div className="hidden md:flex">
							<ul className="flex items-center justify-center gap-10 text-lg">
								<li>
									<Link className="nav-link active" aria-current="page" href="/">Home</Link>
								</li>
								<li>
									<Link className="nav-link" href="/products">Products</Link>
								</li>
								<li>
									<Link className="nav-link" href="#">Contacts</Link>
								</li>
							</ul>
						</div>

						<div className="ps-2.5 flex  justify-end">
							<ul className="flex items-center justify-center gap-10">
								<li>
									<button className="cursor-pointer transition-transform duration-100 hover:scale-110"><SVGCart /></button>
								</li>
								<li>
									<button className="cursor-pointer transition-transform duration-100 hover:scale-110"><SVGPerson /></button>
								</li>
								<li>
									<button className="cursor-pointer transition-transform duration-100 hover:scale-110"><SVGBurgerMenu /></button>
								</li>
							</ul>
						</div>
					</div>

				</div>
			</div>
		</>
	);
}

export default NavBar;