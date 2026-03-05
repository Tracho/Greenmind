"use client";
import { motion, useAnimate } from "framer-motion";
import SVGArrowDown from "@/components/icons/SVGArrowDown";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  querySort: string[] | null,
  onChange: (sort: string) => void,
  onClick?: (sort: string) => void,
  children?: React.ReactNode,
};

type TypeSelectedOptionMini = {
  title: string,
  title_default: string,
  title_desc: string,
  title_asc: string,
  default: string,
  desc: string,
  asc: string
}

type TypeSelectedOption = {
  likes: TypeSelectedOptionMini
  sold: TypeSelectedOptionMini
  price: TypeSelectedOptionMini
  discountboolean: TypeSelectedOptionMini
}

type SelectedKeys = keyof TypeSelectedOption;
type SelectedOptionMiniKeys = keyof TypeSelectedOptionMini;

function Sorting_Bar({ querySort, onChange, children }: Props) {
  const selectedOption: TypeSelectedOption = {
    likes: { title: 'Sort by Likes', title_default: 'Sort by Likes', title_desc: 'More Likes', title_asc: 'Less Likes', default: 'likes:default', desc: `likes:desc`, asc: `likes:asc` },
    sold: { title: 'Sort by Sales', title_default: 'Sort by Sales', title_desc: 'More Sales', title_asc: 'Less Sales', default: 'sold:default', desc: `sold:desc`, asc: `sold:asc` },
    price: { title: 'Sort by Price', title_default: 'Sort by Price', title_desc: 'More Price', title_asc: 'Less Price', default: 'price:default', desc: `price:desc`, asc: `price:asc` },
    discountboolean: { title: 'Sort by Discount', title_default: 'Sort by Discount', title_desc: 'With Discount', title_asc: 'Without Discount', default: 'discountboolean:default', desc: `discountboolean:desc`, asc: `discountboolean:asc` }
  }

  const currentValues = useMemo(() => {
    const result: Record<SelectedKeys, string> = {
      likes: selectedOption.likes.default,
      sold: selectedOption.sold.default,
      price: selectedOption.price.default,
      discountboolean: selectedOption.discountboolean.default,
    };
    if (querySort && Array.isArray(querySort)) {
      querySort.forEach(sortString => {
        const [key] = sortString.split(":");
        if (key in result) result[key as SelectedKeys] = sortString;
      });
    }
    return result;
  }, [querySort]);

  // 1. Храним имя активного ключа вместо true/false
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scope, animate] = useAnimate();

  const toggleMenu = (key: string) => {
    setActiveMenu(activeMenu === key ? null : key);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Функция обработки клика
    const handleClickOutside = (event: MouseEvent) => {
      // Если клик был ВНЕ контейнера, закрываем меню
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    // Вешаем слушатель
    window.addEventListener("mousedown", handleClickOutside);
    // Убираем слушатель при размонтировании
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const keys = Object.keys(selectedOption);
    keys.forEach((key) => {
      const isOpen = activeMenu === key;
      animate(
        `ul[data-key="${key}"]`,
        {
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -10,
          pointerEvents: isOpen ? "auto" : "none"
        },
        { duration: 0.2 },
      );

      animate(
        `div[data-key="${key}"] .arrow-icon`,
        { rotate: isOpen ? 180 : 0 },
        { duration: 0.2 }
      );
    });
  }, [activeMenu, animate]);

  return (
    <div className="bg_aquamarine p-4 rounded-2xl mb-5 flex items-start" ref={containerRef}>
      <div className="flex flex-wrap items-center gap-4" ref={scope}>
        {(Object.keys(selectedOption) as Array<SelectedKeys>).map((key) => {
          let thisElem = selectedOption[key];
          let currentTitle = `title_${currentValues[key].split(":")[1]}` as SelectedOptionMiniKeys;
          return (
            <div data-key={key} key={key} className="relative min-w-[140px]">
              {/* Кастомный селект */}
              <div
                onClick={() => toggleMenu(key)}
                className="flex justify-between gap-2 bg-white py-1 px-1.5 cursor-pointer rounded border border-gray-400 focus:border-gray-600 outline-none"
              >
                <span className="text-sm">{thisElem[currentTitle]}</span>
                <span className="arrow-icon flex items-center justify-center">
                  <SVGArrowDown w="16px" h="16px" />
                </span>
              </div>

              {/* Список с уникальным data-атрибутом для анимации */}
              <ul
                data-key={key}
                className="flex flex-col gap-1 mt-1 py-1 bg-white absolute w-full z-30 shadow-lg rounded border border-gray-400 focus:border-gray-600 outline-none"
                style={{ opacity: 0, pointerEvents: "none" }}
              >
                {[
                  { val: thisElem.default, label: thisElem.title_default },
                  { val: thisElem.desc, label: thisElem.title_desc },
                  { val: thisElem.asc, label: thisElem.title_asc }
                ].map((opt) => (
                  <li key={opt.val}>
                    <button
                      className={`cursor-pointer w-full text-start text-sm py-1 px-1.5 hover:bg-gray-100 ${currentValues[key] === opt.val ? 'text-aquamarine pointer-events-none bg-gray-100' : ''}`}
                      onClick={() => {
                        onChange(opt.val);
                        setActiveMenu(null);
                      }}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}

      </div>
      {children}
    </div>
  );
}

export default Sorting_Bar;
