"use client";
import { TypeImageData } from "@/components/types/global";
import Image from "next/image";
import { useState } from "react";

type Props = {
	images: TypeImageData[];
	HOST_STRIPE: string;
};
export function SliderComponent({ images, HOST_STRIPE }: Props) {
	const [index, setIndex] = useState(0);

	const prev = () => (index <= 0 ? setIndex(images.length - 1) : setIndex(index - 1));
	const next = () => (index >= images.length - 1 ? setIndex(0) : setIndex(index + 1));

	return (
		<div className="relative">

			<div className="w-full h-[500px] flex justify-center items-start rounded-xl overflow-hidden bg-white">
				<Image
					className="object-contain w-full h-full rounded-xl"
					src={HOST_STRIPE + images[index]?.url}
					alt={images[index]?.alternativeText || ""}
					width={500}
					height={500}
				/>
			</div>

			{/** Arrows */}
			<button
				onClick={prev}
				className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full"
			>
				‹
			</button>

			<button
				onClick={next}
				className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full"
			>
				›
			</button>

			{/** Dots */}
			<div className="flex flex-wrap justify-center mt-3 gap-2">
				{images.map((e, i) => {
					const imgUrl = `${HOST_STRIPE}/uploads/thumbnail_${e.hash}${e.ext}`;
					return (<span
						key={i}
						onClick={() => setIndex(i)}
						onMouseEnter={() => setIndex(i)}
						className={`rounded-2xl cursor-pointer ${i === index ? "border-2 border-blue-500" : "border-2 border-transparent"
							}`}
					>
						<Image
							className="object-cover w-[75px] h-[75px] rounded-2xl"
							src={imgUrl} alt={e.alternativeText || ""} width={75} height={75}
							loading="lazy" />
					</span>)
				})}
			</div>
		</div>
	);
}
