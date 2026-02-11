"use client"
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

function NavBar() {
	// const ref = useRef(null)
	// const isInView = useInView(ref);
	const [scope, animate] = useAnimate()
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [windowMD, setWindowMD] = useState(window.innerWidth);

	useEffect(() => {
		setWindowMD(window.innerWidth);
		const handleResize = () => setWindowMD(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const isMobile = windowMD <= 768;

		if (isMobile) {
			animate(
				".menu_overlay",
				{
					opacity: isOpenMenu ? 1 : 0,
					x: isOpenMenu ? 0 : "100%", // Выезжает справа
					display: isOpenMenu ? "flex" : "none", // Чтобы не ловить клики в скрытом состоянии
				},
				{ duration: 0.3, ease: "circOut" }
			);
		} else {
			animate(".menu_overlay", { opacity: 1, x: 0, display: "flex" }, { duration: 0 });
		}
	}, [isOpenMenu, animate, windowMD]);


	const closeMenu = () => {
		if (windowMD <= 768) setIsOpenMenu(false);
	};

	const pathname = usePathname();
	const getActiveClass = (href: string) => {
		const isActive = href === "/" ? pathname === href : pathname.startsWith(href);
		return isActive ? "font-medium text-black" : "font-normal text-zinc-900";
	};

	const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
	const [isModalOpenBasket, setIsModalOpenBasket] = useState(false);
	const { cart, removeFromCart } = useCart();
	return (
		<>

			<div ref={scope} className="relative pb-28">
				<div className="w-full fixed bg-white  z-50">
					<div className="mxw_1440  py-5 px-4 sm:py-8 sm:px-6 md:py-10 md:px-24 flex items-center justify-between">
						{/* LOGO */}
						<div className="shrink-0 w-[140px] z-50">
							<Link onClick={closeMenu} href="/">
								<Image priority src={Logo} alt="Greenmind" width={140} height={40} />
							</Link>
						</div>

						{/* MODAL / OVERLAY CONTAINER */}
						<div className="menu_overlay fixed inset-0 bg-white z-40 flex-col items-center justify-center md:transform-none opacity-0 md:opacity-100 md:static md:bg-transparent md:flex md:flex-row md:justify-between md:w-full md:ms-0 ps-0 md:ps-[clamp(0.9375rem,-15.8211rem+34.9138vw,6rem)]">
							<ul className="flex flex-col md:flex-row items-center gap-8 md:gap-10 text-2xl md:text-lg">
								<li>
									<Link onClick={closeMenu} className={getActiveClass("/")} href="/">
										Home
									</Link>
								</li>
								<li>
									<Link onClick={closeMenu} className={getActiveClass("/products")} href="/products">
										Products
									</Link>
								</li>
								<li>
									<Link onClick={closeMenu} className={getActiveClass("/contacts")} href="/contacts">
										Contacts
									</Link>
								</li>
							</ul>
						</div>

						{/* RIGHT ICONS & BURGER */}
						<div className="flex items-center gap-5 md:gap-10 z-50">
							<button className="cursor-pointer" onClick={() => setIsModalOpenBasket(true)}><SVGCart clas="w-[28px] h-[28px]  md:w-[24px] md:h-[24px]" /></button>
							<button className="cursor-pointer" onClick={() => setIsModalOpenLogin(true)}><SVGPerson clas="w-[28px] h-[28px]  md:w-[24px] md:h-[24px]" /></button>
							<button className="cursor-pointer md:hidden" onClick={() => setIsOpenMenu(!isOpenMenu)}>
								<SVGBurgerMenu clas="w-[28px] h-[28px]  md:w-[24px] md:h-[24px]" />
							</button>
						</div>
					</div>
				</div>



				<ModalWindow isOpen={isModalOpenBasket} onClose={() => setIsModalOpenBasket(false)}>


					{cart.map((item) => (
						<div key={item.id} className="flex items-center gap-2.5 justify-between p-2 border-b">
							<div>
								<Image src={item.image} alt={item.title} width={50} height={50} className="object-cover rounded" />
							</div>
							<span className="w-full">{item.title} (x{item.quantity})</span>
							<button onClick={() => removeFromCart(item.id)}>❌</button>
						</div>
					))}

					<button
						className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
						onClick={() => setIsModalOpenLogin(false)}
					>
						Понятно
					</button>
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