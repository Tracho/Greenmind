"use client"
import { useEffect, useRef, useState } from "react";
import { TypeSlidsInfo } from "@/components/types/global";

function MainClientMessageSlider() {
	let [slidsInfo, SetSlidersInfo] = useState<TypeSlidsInfo>([
		{ img: "", imgAlt: "", userName: "Test Tester", social: "Youtuber", rating: null, message: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo molestiae veritatis dolor delectus, incidunt quo assumenda voluptatem maxime, soluta ad omnis fugiat ut eum facere et atque illum, deserunt distinctio?" },
		{ img: "", imgAlt: "", userName: "TestIgor Tracho", social: "Youtuber", rating: null, message: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo molestiae veritatis dolor delectus, incidunt quo assumenda voluptatem maxime, soluta ad omnis fugiat ut eum facere et atque illum, deserunt distinctio?" },
		{ img: "", imgAlt: "", userName: "TestMasha Olivianna", social: "Youtuber", rating: null, message: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo molestiae veritatis dolor delectus, incidunt quo assumenda voluptatem maxime, soluta ad omnis fugiat ut eum facere et atque illum, deserunt distinctio?" }
	]);

	let [timer, SetTimer] = useState<number>(3000);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);


	let [x, SetX] = useState<number>(0);
	let [stopSlider, SetStopSlider] = useState<boolean>(false);

	let RefBoxSliderX = useRef<HTMLDivElement | null>(null);
	let RefMaxW = useRef<HTMLDivElement | null>(null);

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
			const widthBox = Math.floor(maxW / slidsInfo.length);

			// запускаем интервал
			intervalRef.current = setInterval(() => {
				SetX(prevX => {
					const next = prevX + widthBox;
					const finalX = next >= maxW ? 0 : next;

					RefBoxSliderX.current?.scrollTo({
						left: finalX,
						behavior: "smooth",
					});

					return finalX;
				});
			}, timer);
		}

		// очищаем интервал при выходе или при stopSlider === true
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};

	}, [stopSlider]);



	return (<>
		<div className="mxw_1440 px96_15 pt-24 flex justify-between items-start">
			<div className="max-w-[457]">
				<h2 className="text-3xl font-bold">What customers say about GREEMIND?</h2>
			</div>
			<div className="flex">
				{slidsInfo.map((e, i) => (
					<span
						key={i}
						className="flex w-3 bg_aquamarine py-1 rounded-lg mx-1.5 cursor-pointer"
					>  
					</span>
				))}
			</div>
		</div>
		<div onMouseEnter={HeadlandMouseEnter} onMouseLeave={HeadlandMouseLeave} ref={RefBoxSliderX} className="w-full overflow-x-auto">
			<div ref={RefMaxW} className="flex flex-nowrap gap-4">
				{slidsInfo.map((e, i) => (
					<div
						key={i}
						className="shrink-0 w-[55vw] bg-amber-200 p-4 rounded-xl"
					>
						{e.userName}
						<p>{e.message}</p>
					</div>
				))}
			</div>
		</div>

		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
	</>);
}

export default MainClientMessageSlider;