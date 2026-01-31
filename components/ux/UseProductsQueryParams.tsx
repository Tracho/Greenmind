"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function UseProductsQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // Функция для обновления параметра в URL без перезагрузки
  const setFilter = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if(value === "delete" || value === "" || value === "default"){
      params.delete(name);
    }else{
      params.set(name, value);
    } 
    // Обновляем URL
    router.push(`${pathname}?${params.toString()}`);
  };

  return ({ setFilter });
}

export default UseProductsQueryParams;