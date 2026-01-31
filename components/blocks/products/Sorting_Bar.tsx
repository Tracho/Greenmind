"use client";

import { useMemo } from "react"; 

type Props = {
  querySort: string[] | null,
  onChange: (sort: string) => void
};

function Sorting_Bar({ querySort, onChange }: Props) {
  const selectedOption: Record<string, Record<string, string>> = {
    likes: {
      default: 'likes:default',
      desc: `likes:desc`,
      asc: `likes:asc`,
    },
    sold: {
      default: 'sold:default',
      desc: `sold:desc`,
      asc: `sold:asc`,
    },
    price: {
      default: 'price:default',
      desc: `price:desc`,
      asc: `price:asc`,
    }
  }


  // Извлекаем текущее значение для каждого селекта из массива ["key:order", ...]
  const currentValues = useMemo(() => {
    const result = {
      likes: selectedOption.likes.default,
      sold: selectedOption.sold.default,
      price: selectedOption.price.default,
    };
 
    if (querySort && Array.isArray(querySort)) {
      querySort.forEach(sortString => {
        const [key, order] = sortString.split(":");
        // Если ключ совпадает с нашими категориями, сохраняем строку целиком
        if (key in result) {
          result[key as keyof typeof result] = sortString;
        }
      });
    }
    return result;
  }, [querySort]);
 
  const HeadlandChangeLikes = (value: string) => {
    onChange(value);
  };

  return (<>
    <div className="bg_aquamarine p-4 rounded-2xl mb-5">
      <div className="flex flex-wrap items-center gap-4">

        {/* Sort by Likes */}
        <div className="flex flex-wrap items-center gap-4">
          <label className="mb-1 font-semibold">Sort by Likes</label>
          <select id="Sort_by_Likes" className="p-2 rounded-xl border bg-white text-black"
            onChange={(e) => HeadlandChangeLikes(e.target.value)}
            value={currentValues.likes}
          >
            <option value={selectedOption.likes.default}>Default</option>
            <option value={selectedOption.likes.desc}>More Likes</option>
            <option value={selectedOption.likes.asc}>Less Likes</option>
          </select>
        </div>

        {/* Sort by Sales */}
        <div className="flex flex-wrap items-center gap-4">
          <label className="mb-1 font-semibold">Sort by Sales</label>
          <select id="Sort_by_Sales" className="p-2 rounded-xl border bg-white text-black"
            onChange={(e) => HeadlandChangeLikes(e.target.value)}
          value={currentValues.sold}
          >
            <option value={selectedOption.sold.default}>Default</option>
            <option value={selectedOption.sold.desc}>More Sales</option>
            <option value={selectedOption.sold.asc}>Less Sales</option>
          </select>
        </div>
        {/* Sort by Sales */}
        <div className="flex flex-wrap items-center gap-4">
          <label className="mb-1 font-semibold">Sort by Price</label>
          <select id="Sort_by_Price" className="p-2 rounded-xl border bg-white text-black"
            onChange={(e) => HeadlandChangeLikes(e.target.value)}
          value={currentValues.price}
          >
            <option value={selectedOption.price.default}>Default</option>
            <option value={selectedOption.price.desc}>More Price</option>
            <option value={selectedOption.price.asc}>Less Price</option>
          </select>
        </div>

      </div>
    </div>
  </>);
}

export default Sorting_Bar;