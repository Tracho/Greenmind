"use client"
import React, { useState } from "react";
import { TypeFiltresQueryParams, TypeProdictsVariables } from "@/components/types/global";
import { useRouter, useSearchParams } from "next/navigation";
import UseProductsQueryParams from "@/components/ux/UseProductsQueryParams";
import { number } from "motion";

type Props = {
  filters: TypeFiltresQueryParams,
  maxPrice: number
  onChange?: (gte: number, lte: number) => void
}

function Product_Filters_Range_Input({ filters, maxPrice, onChange }: Props) {
  const minGap = 5; // Минимальный разрыв между ползунками
  const MAXNumber = Math.round(maxPrice + 1) || 1000;
  
  const GTE = filters.price?.gte === "" || filters.price?.gte === undefined ? 0 : Math.round(Number(filters.price?.gte));
  const LTE = filters.price?.lte === "" || filters.price?.lte === undefined ?  MAXNumber : Math.round(Number(filters.price?.lte));
  

  const [range, setRange] = useState({
    min: Math.round(Number(GTE) <= 0 ? 0 : Number(GTE)),
    max: Math.round(Number(LTE) >= MAXNumber ? MAXNumber : Number(LTE)),
  });



  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), range.max - minGap);
    setRange({ ...range, min: value });
  };


  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), range.min + minGap);
    setRange({ ...range, max: value });
  };

  const handleMinBlur = () => {
    onChange && onChange(range.min, range.max);
  }
  return (

    <div className="w-full md:max-w-md mx-auto my-6">
      <label className="block mb-4 text-sm font-medium text-gray-900">
        <div className="flex items-center  flex-nowrap">
          <span className="text-lg mr-2">Price:</span>
          <div className="flex items-center">

            <input className="w-full py-1 px-2 bg-white rounded border border-gray-400 focus:border-gray-600 outline-none transition-colors"
              type="number" value={range.min}
              onChange={(e) => setRange({ ...range, min: (Number(e.target.value) >= 0 ? Number(e.target.value) : 0) })}
              onBlur={handleMinBlur}
            />

            <span className="w-1/3 mx-1 text-center">-</span>

            <input className="w-full py-1 px-2 bg-white rounded border border-gray-400 focus:border-gray-600 outline-none transition-colors"
              type="number" value={range.max}
              onChange={(e) => setRange({ ...range, max: (Number(e.target.value) <= MAXNumber ? Number(e.target.value) : MAXNumber) })}
              onBlur={handleMinBlur}
            />

          </div>
        </div>
      </label>

      <div className="relative h-2 w-full bg-gray-200 rounded-full">
        {/* Цветная полоска между ползунками */}
        <div
          className="absolute h-full bg-green-500 rounded-full"
          style={{
            // Вычисляем процент для левого края: (текущее / всего) * 100
            left: `${(range.min / MAXNumber) * 100}%`,
            // Вычисляем отступ справа: 100% минус (процент максимального значения)
            right: `${100 - (range.max / MAXNumber) * 100}%`
          }}

        />

        <input
          type="range"
          min={0}
          max={MAXNumber}
          value={range.min}
          onChange={handleMinChange}
          onMouseUp={handleMinBlur}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-20 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600"
        />

        <input
          type="range"
          min={0}
          max={MAXNumber}
          value={range.max}
          onChange={handleMaxChange}
          onMouseUp={handleMinBlur}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-30 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600"
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-4">
        <span>0</span>
        <span>{MAXNumber}</span>
      </div>
    </div>
  );
}

export default Product_Filters_Range_Input;
