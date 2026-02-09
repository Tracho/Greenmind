"use client"
import Link from "next/link";
import SVGBurgerMenu from "../icons/SVGBurgerMenu";
import SVGPerson from "../icons/SVGPerson";
import SVGCart from "../icons/SVGCart";
import Image from "next/image";
import Logo from "@/public/GREENMIND.svg";
import { useAnimate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

function NavBar() {
	// const ref = useRef(null)
	// const isInView = useInView(ref);
	const [scope, animate] = useAnimate()
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	useEffect(() => {
		animate(
			".monu_container",
			{
				// Если закрыто (false), ширина 0. Если открыто (true), 100%.
				width: isOpenMenu ? "100%" : "0%",
				opacity: isOpenMenu ? 1 : 0,
				pointerEvents: isOpenMenu ? "auto" : "none"
			},
			{
				duration: 0.3,
				ease: "circOut" // Более "живая" анимация для меню
			}
		);
	}, [isOpenMenu, animate]);

	return (
		<>
			{/* <div className="bg-yellow-600"> */}
			<div ref={scope}>
				<div className="mxw_1440 py-5 px-4 sm:py-8 sm:px-6 md:py-10 md:px-24 flex items-center justify-between">
					<div className="shrink-0 w-[140px]">
						<Image priority src={Logo} className="object-contain" alt="Greenmind" width={140} height={40} />
					</div>
					<div className="menu flex items-center justify-end md:justify-between w-full ms-2.5 md:ms-0 ps-0 md:ps-[clamp(0.9375rem,-15.8211rem+34.9138vw,6rem)]">
						<div className="monu_container md:flex">
							<ul className="flex items-center justify-center gap-2 py-2 md:mt-0 md:gap-10 text-lg">
								<li>
									<Link className="nav-link hover_center_line" datatype="active" aria-current="page" href="/">Home</Link>
								</li>
								<li>
									<Link className="nav-link hover_center_line" href="/products">Products</Link>
								</li>
								<li>
									<Link className="nav-link hover_center_line" href="#">Contacts</Link>
								</li>
							</ul>
						</div>

						<div className="md:mr-10 flex justify-end">
							<ul className="flex items-center justify-center gap-5 md:gap-10">
								<li>
									<button className="flex cursor-pointer transition-transform duration-100 hover:scale-110"><SVGCart /></button>
								</li>
								<li>
									<button className="flex cursor-pointer transition-transform duration-100 hover:scale-110"><SVGPerson /></button>
								</li>

								<li className="md:hidden">
									<button onClick={() => setIsOpenMenu(!isOpenMenu)} className="flex cursor-pointer transition-transform duration-100 hover:scale-110"><SVGBurgerMenu /></button>
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