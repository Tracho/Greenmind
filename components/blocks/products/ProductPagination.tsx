"use client"

import { useQuery } from "@tanstack/react-query";


const HOST_STRIPE = process.env.NEXT_PUBLIC_HOST_STRAPI as string;
const GQL = process.env.NEXT_PUBLIC_HOST_GQL as string;

type Props = {
  thisPage?: number,
  pageSize?: number,
  pageCount?: number,
  onChange: (ARG: number) => void;
};
function ProductPagination({ thisPage = 1, pageCount = 1, onChange }: Props) {
  if (pageCount <= 1) return null;

  const pages = new Set<number>();

  // первая и последняя
  pages.add(1);
  pages.add(pageCount);

  // текущая и соседи
  pages.add(thisPage);
  pages.add(thisPage - 1);
  pages.add(thisPage + 1);

  // фильтруем выход за диапазон
  const visiblePages = Array.from(pages)
    .filter(p => p >= 1 && p <= pageCount)
    .sort((a, b) => a - b);

  return (
    <div className="flex items-center justify-center gap-2">
      {visiblePages.map((page, index) => {
        const prev = visiblePages[index - 1];
        const showDots = prev && page - prev > 1;

        return (
          <span key={page} className="flex items-center gap-2">
            {showDots && <span className="px-1">…</span>}

            <span
              className={`bg_aquamarine_hover flex items-center justify-center
                cursor-pointer rounded-2xl w-[32px] h-[32px] text-sm`}
              {...(thisPage === page ? { "data-active": "true" } : {})}

              onClick={() => onChange(page)}
            >
              {page}
            </span>
          </span>
        );
      })}
    </div>
  );
}


export default ProductPagination;