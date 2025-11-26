"use client"
import { motion } from "framer-motion";

import { useEffect, useRef, useState } from "react";
import { TypeSlidsInfo } from "@/components/types/global";
import SVGQuotes from "../icons/SVGQuotes";
import UserCom1 from "@/public/images/UserCom1.png";
import UserCom2 from "@/public/images/UserCom2.png";
import UserCom3 from "@/public/images/UserCom3.png";
import SVGStar from "../icons/SVGStar";
import Image from "next/image";
import { span } from "motion/react-client";

function MainClientMessageSlider() {
	let [slidsInfo, SetSlidersInfo] = useState<TypeSlidsInfo>([
		{ img: UserCom1.src, imgAlt: "User John Doe", userName: "John Doe", social: "Youtuber", rating: 4.5, message: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo molestiae veritatis dolor delectus, incidunt quo assumenda voluptatem maxime, soluta ad omnis fugiat ut eum facere et atque illum, deserunt distinctio?" },
		{ img: UserCom2.src, imgAlt: "User Masha Olivianna", userName: "Masha Olivianna", social: "Youtuber", rating: 4.8, message: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo molestiae veritatis dolor delectus, incidunt quo assumenda voluptatem maxime, soluta ad omnis fugiat ut eum facere et atque illum, deserunt distinctio?" },
		{ img: UserCom3.src, imgAlt: "User Test Tester", userName: "Test Tester", social: "Youtuber", rating: 3.6, message: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo molestiae veritatis dolor delectus, incidunt quo assumenda voluptatem maxime, soluta ad omnis fugiat ut eum facere et atque illum, deserunt distinctio?" }
	]);

	let [timer, SetTimer] = useState<number>(3000);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);


	let [numSlid, SetNumSlid] = useState<number>(0);
	let [x, SetX] = useState<number>(0);
	let [stopSlider, SetStopSlider] = useState<boolean>(false);

	let RefBoxSliderX = useRef<HTMLDivElement | null>(null);
	let RefMaxW = useRef<HTMLDivElement | null>(null);
	let [paddingLastSlid, SetPaddingLastSlid] = useState<number>(0);

	function HeadlandMouseEnter() {
		SetStopSlider(true);
	}
	function HeadlandMouseLeave() {
		SetStopSlider(false);
	}

	useEffect(() => {
		if (!RefMaxW.current || !RefBoxSliderX.current) return;

		if (!stopSlider) {
			const maxW = RefMaxW.current.scrollWidth;
			const widthBox = Math.round(maxW / (slidsInfo.length));
 
			SetPaddingLastSlid(Math.round(maxW / (slidsInfo.length)));
			// запускаем интервал
			intervalRef.current = setInterval(() => {
				SetX(prevX => {
					const next = prevX + widthBox;
					const finalX = next > (maxW - (widthBox)) ? 0 : next;
					// const finalX = next >= (maxW) ? 0 : next;
					RefBoxSliderX.current?.scrollTo({
						left: finalX,
						behavior: "smooth",
					});
					return finalX;
				});

				SetNumSlid((PrevNum) => {
					let next = PrevNum + 1;
					let final = next >= slidsInfo.length ? 0 : next;
					return final;
				});
				
			}, timer);
		}
		// очищаем интервал при выходе или при stopSlider === true
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};

	}, [stopSlider]);

	function HeadlandClickNavigation(e: React.MouseEvent<HTMLSpanElement, MouseEvent>, i: number) {
		if (RefMaxW.current) {
			const maxW = RefMaxW.current.scrollWidth;
			const widthBox = Math.round((maxW * i) / (slidsInfo.length +1));
			SetX(prevX => {
				const next = widthBox; 
				const finalX = next >= (maxW) ? 0 : next;
				RefBoxSliderX.current?.scrollTo({
					left: finalX,
					behavior: "smooth",
				});
				return finalX;
			}); 

			SetNumSlid(i);
		}
	}

	return (<>
		<div className="mxw_1440 px96_15 pt-24 mb-12 flex justify-between items-start">
			<div className="max-w-[457]">
				<h2 className="text-3xl font-bold">What customers say about GREEMIND?</h2>
			</div>
			<div className="flex" onMouseEnter={HeadlandMouseEnter} onMouseLeave={HeadlandMouseLeave}>
				{slidsInfo.map((elem, i) => {
					const isActive = numSlid === i;
					// let Wtrue = isActive ? 48 : 12;
					return (
						<motion.span
							onClick={(e) => HeadlandClickNavigation(e, i)}
							key={i}
							className={`flex w-3 bg_aquamarine py-1.5 rounded-lg mx-1.5 cursor-pointer`}
							initial={{ width: isActive ? 12 : 48, }}
							animate={{ width: isActive ? 48 : 12 }}
							transition={{
								duration: 0.5,
								ease: "easeInOut"
							}} />
					)
				})}
			</div>
		</div>
		<div className="mxw_fullhd ps96_15">
			<div onMouseEnter={HeadlandMouseEnter} onMouseLeave={HeadlandMouseLeave} ref={RefBoxSliderX}
				className="w-full overflow-x-auto hide-scrollbar">
				<div ref={RefMaxW} className="flex flex-nowrap gap-4">
					{slidsInfo.map((e, i) => {
						return (
							<span key={i} style={{ paddingRight: i === slidsInfo.length - 1 ? paddingLastSlid : 0 }}>
								<div className="shrink-0 w-[55vw] bg_aquamarine rounded-xl">
									<p className="p-12 pb-0 text-lg text_color_dark">{e.message}</p>

									<div className="ps-3 pe-12 flex items-start">
										<div className="relative w-full max-w-[150] min-w-[150] h-[205] max-h-[205]">
											<Image className="absolute transform top-0 start-0 -translate-y-0 -translate-x-0 z-20 w-full  h-full"
												src={e.img} alt={e.imgAlt} width={150} height={205} />

											<span className="absolute transform top-14 start-8 -translate-y-0
           -translate-x-0 z-10">
												<SVGQuotes />
											</span>
										</div>
										<div className="w-full pt-12 flex justify-between items-start">
											<div>
												<p className="text-lg"><b>{e.userName}</b></p>
												<p className="color_blackgray text-xs">{e.social}</p>
											</div>
											<div className="flex justify-between items-center">
												<SVGStar />
												<b className="text-lg ms-3">{e.rating}</b>
											</div>
										</div>
									</div>
								</div>
							</span>
						)
					})}
				</div>
			</div>
		</div>

		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
	</>);
}


export default MainClientMessageSlider;