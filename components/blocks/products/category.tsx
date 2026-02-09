'use client'

import { Brands, TypeProducts } from "@/components/types/global";
import UseProductsQueryParams from "@/components/ux/UseProductsQueryParams";
import { useQuery } from "@tanstack/react-query";
import { use, useEffect, useMemo, useState } from "react";
import { queryBrandProducts } from "@/components/lib/gql/queryBrandProducts";


const HOST_STRIPE = process.env.NEXT_PUBLIC_HOST_STRAPI as string;
const GQL = process.env.NEXT_PUBLIC_HOST_GQL as string;

type Props = {
  selectedCate: string[];
  dataCate: { name: string }[];
  onChange: (arg: string[]) => void;
  header?: string;
};

function Category({ selectedCate, dataCate, onChange, header }: Props) {
  // Статичный список категорий для теста
  const [search, setSearch] = useState("");
  // Логика поиска
  const filtered = useMemo(() => {
    return dataCate.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [dataCate, search]);


  // Логика чекбоксов
  const toggle = (arg: string) => {
    onChange(
      selectedCate.includes(arg)
        ? selectedCate.filter(b => b !== arg)
        : [...selectedCate, arg]
    );
  };

  // console.log(dataCate)
  return (
    <div className="w-full my-4 border border-gray-300 rounded bg-white">
      {header &&
        <div>
          <h3 className="p-3 border-b text-base">{header}</h3>
        </div>
      }
      {/* Поле поиска */}
      {dataCate.length >= 8 &&
        <div className="p-3 border-b">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 text-sm bg-white rounded border border-gray-400 focus:border-gray-600 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      }

      {/* Блок со списком: высота 500px, ширина 100%, вертикальный скролл */}
      <div className="max-h-[250px] w-full overflow-y-auto p-2">
        {filtered.length > 0 ? (
          filtered.map((cat, index) => (
            <label
              key={cat.name + index}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer rounded transition-colors"
            >

              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-green-600"
                checked={selectedCate.includes(cat.name)}
                onChange={() => toggle(cat.name)}
              />
              <span className="text-sm select-none text-gray-700">{cat.name}</span>

            </label>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-10 text-sm">Ничего не найдено</p>
        )}
      </div>
    </div>
  );
}

export default Category;
