"use client"
import { AnimatePresence, motion } from "motion/react"

import Link from "next/link";
import SVGBurgerMenu from "../icons/SVGBurgerMenu";
import SVGPerson from "../icons/SVGPerson";
import SVGCart from "../icons/SVGCart";
import Image from "next/image";
import Logo from "@/public/GREENMIND.svg";
import { useAnimate, useInView } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ModalWindow from "../ui/ModalWindow";
import { useCart } from "../context/CartContext";
import BasketInfo from "../ui/BasketInfo";


function NavBar() {
	// const ref = useRef(null)
	// const isInView = useInView(ref); 
	const [isOpenBurger, setIsOpenBurger] = useState(false);


	const pathname = usePathname();
	const getActiveClass = (href: string) => {
		const isActive = href === "/" ? pathname === href : pathname.startsWith(href);
		return isActive ? "font-medium text-black" : "font-normal text-zinc-900";
	};
	useEffect(() => {
		setIsOpenBurger(false);
	}, [pathname]);

	const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
	const [isModalOpenBasket, setIsModalOpenBasket] = useState(false);
	const { cart } = useCart();
	const totalQuantity = useMemo(() => {
		return cart.reduce((accumulator, item) => {
			return accumulator + Number(item.quantity);
		}, 0)
	}, [cart]);

	return (
		<>

			<div className="relative pb-28 z-100">
				<div className="w-full fixed bg-white">
					<div className="mxw_1440  py-5 px-4 sm:py-8 sm:px-6 md:py-10 md:px-24 flex items-center justify-between">
						{/* LOGO */}
						<div className="shrink-0 w-[140px] z-100">
							<Link href="/">
								<Image priority src={Logo} alt="Greenmind" width={140} height={40} />
							</Link>
						</div>

						{/* MODAL / OVERLAY CONTAINER */}
						{/* <div className="menu_overlay fixed inset-0 bg-white z-40 flex-col items-center justify-center md:transform-none opacity-0 md:opacity-100 md:static md:bg-transparent md:flex md:flex-row md:justify-between md:w-full md:ms-0 ps-0 md:ps-[clamp(0.9375rem,-15.8211rem+34.9138vw,6rem)]"> */}
 
							<motion.div
								className="burger_container inset-0 bg-white z-40 flex-col items-center justify-center md:transform-none opacity-0 md:opacity-100 md:static md:bg-transparent flex md:flex-row md:justify-between md:w-full md:ps-[clamp(0.9375rem,-15.8211rem+34.9138vw,6rem)]"
								animate={{
									// 50% — это центр экрана (так как в миксине transform: translate(-50%))
									left: isOpenBurger ? "50%" : "150%",
									opacity: 1,
								}}
								initial={{ left: "150%" }}
								transition={{ duration: 0.5, ease: "easeOut" }}
							>

								<ul className="flex flex-col md:flex-row items-center gap-8 md:gap-10 text-2xl md:text-lg">
									<li>
										<Link className={getActiveClass("/")} href="/">
											Home
										</Link>
									</li>
									<li>
										<Link className={getActiveClass("/products")} href="/products">
											Products
										</Link>
									</li>
									<li>
										<Link className={getActiveClass("/contacts")} href="/contacts">
											Contacts
										</Link>
									</li>
								</ul>
							</motion.div> 

						{/* RIGHT ICONS & BURGER */}
						<div className="flex items-center gap-5 md:gap-10 z-50">
							<button className="cursor-pointer flex items-end relative" onClick={() => setIsModalOpenBasket(true)}>
								<SVGCart clas="w-[28px] h-[28px]  md:w-[24px] md:h-[24px]" />
								{totalQuantity !== 0 ? <b className="text-[10px] text-white bg-red-400 w-4 h-4 rounded-4xl text-center flex items-center justify-center p-1">{totalQuantity}</b> : ""}
							</button>
							<button className="cursor-pointer" onClick={() => setIsModalOpenLogin(true)}><SVGPerson clas="w-[28px] h-[28px]  md:w-[24px] md:h-[24px]" /></button>

							{/* Burger */}
							<button className="cursor-pointer md:hidden" onClick={() => setIsOpenBurger((prev) => !prev)}>
								<SVGBurgerMenu clas="w-[28px] h-[28px]  md:w-[24px] md:h-[24px]" />
							</button>

						</div>
					</div>
				</div>



				<ModalWindow isOpen={isModalOpenBasket} onClose={() => setIsModalOpenBasket(false)} SVGHeader={<SVGCart clas="w-[28px] h-[28px]  md:w-[24px] md:h-[24px]" />} header="Basket">
					<BasketInfo cart={cart} onClose={() => setIsModalOpenBasket(false)} />
				</ModalWindow>

				<ModalWindow isOpen={isModalOpenLogin} onClose={() => setIsModalOpenLogin(false)}>
					<h2 className="text-2xl font-bold mb-4">Привет!</h2>
					<p>Это контент, который пришел в children.</p>
					<input placeholder="Search..." className="w-full p-2 text-sm bg-white rounded border border-gray-400 focus:border-gray-600 outline-none" type="text" value="" />
					<button
						className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
						onClick={() => setIsModalOpenLogin(false)}
					>
						Понятно
					</button>
				</ModalWindow>
			</div>

		</>
	);
}

export default NavBar;