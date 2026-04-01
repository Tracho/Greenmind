"use client"
import { queryBrandProducts } from "@/components/lib/gql/queryBrandProducts";
import { query } from "@/components/lib/gql/products";

import NavBar from "@/components/layout/navbar";
import Product_Filters_Range_Input from "./Product_Filters_Range_Input";
import Category from "./category";
import Sorting_Bar from "./Sorting_Bar";
import ProductPagination from "./ProductPagination";
import Catalog from "./catalog";
import { TypeProductsResponse, Colors, TypeProducts, Typeglobals, TypeFiltresQueryParams, GlobalData, TypeProdictsVariables, Brands } from "@/components/types/global";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, usePathname } from "next/navigation";
import { TypeVariablesOBJ } from "@/components/types/Variables"
import ModalWindow from "@/components/ui/ModalWindow";
import Filters_container from "./filters_container";
import SVGFilters from "@/components/icons/SVGFilters";

type PageProductsProps = {
  data: TypeProductsResponse
}

const HOST_STRIPE = process.env.NEXT_PUBLIC_HOST_STRAPI as string;
const GQL = process.env.NEXT_PUBLIC_HOST_GQL as string;

type Props = {
  jsonResponse: TypeProductsResponse,
  ObjVariables: TypeVariablesOBJ,
};

function PageProducts({ jsonResponse, ObjVariables }: Props) {

  const [globalData, setGlobalData] = useState<GlobalData>(
    {
      dataProducts: jsonResponse.products_connection?.nodes ?? [],
      pageInfo: jsonResponse.products_connection?.pageInfo,
      currency: jsonResponse.globals?.[0].currency || "$",
      maxPrice: jsonResponse.maxPriceProduct?.nodes[0]?.price || 0,
      dataColors: jsonResponse.colors ?? [],
      dataBrands: jsonResponse.brands ?? [],
      dataMaterials: jsonResponse.materials ?? [],
      dataStyles: jsonResponse.styles ?? [],
      dataspecialfeatures: jsonResponse.specialfeatures ?? [],
      databasket: [],
    }
  );

  const [selectedFilters, setSelectedFilters] =
    useState<TypeProdictsVariables>({
      sort: ObjVariables.sort || [],
      filters: {
        // likes: { gte: ObjVariables.filters.likes?.gte || "", lte: ObjVariables.filters.likes?.lte || "" },
        price: { gte: ObjVariables.filters?.price?.gte || "", lte: ObjVariables.filters?.price?.lte || "" },
        // sold: { gte: ObjVariables.filters.sold?.gte || "", lte: ObjVariables.filters.sold?.lte || "" },
        brand: { name: { in: ObjVariables.filters?.brand?.name.in || [] } },
        colors: { name: { in: ObjVariables.filters?.colors?.name.in || [] } },
        materials: { name: { in: ObjVariables.filters?.materials?.name.in || [] } },
        styles: { name: { in: ObjVariables.filters?.styles?.name.in || [] } },
        specialfeatures: { name: { in: ObjVariables.filters?.specialfeatures?.name.in || [] } },
      },
      pagination: {
        pageSize: ObjVariables.pagination?.pageSize || 3,
        page: ObjVariables.pagination?.page || 1
      },
      imagesPagination2: { limit: ObjVariables.imagesPagination2?.limit || 1 }

    });



  // Query Post with Filters
  const checkPost = useRef<boolean>(false); // затычка
  const { data, isLoading, isError } = useQuery({
    queryKey: ["globalData", selectedFilters],
    enabled: checkPost.current, // ← запрос только если есть выбранные
    queryFn: async () => {
      const { vars, arrUrl } = buildVariables(selectedFilters);
      const res = await fetch(GQL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query,
          variables: vars,
        }),
      });

      return { red: await res.json(), queryUrl: arrUrl };
    },
  });

  // Получаю дату, меняю url, меняю состояние
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (data?.red?.data?.products_connection) {
      const { queryUrl: arrUrl } = data;
      const newUrl = `${pathname}?${arrUrl.join("&")}`;
      // router.replace(newUrl);
      // Пример: заменяем текущий URL на /updated-page
      window.history.pushState({ page: "new" }, "New Page", newUrl);
      // window.history.replaceState({ page: "updated" }, "Updated Page",);

      const this_products_connection = data.red.data.products_connection;
      setGlobalData(prev => ({
        ...prev,
        dataProducts: this_products_connection.nodes as TypeProducts[],
        pageInfo: this_products_connection.pageInfo as { pageSize: number; pageCount: number; total: number; page: number }
      }));
    }
    // console.log("globalData", globalData);
    console.log(data);
  }, [data, setGlobalData]);

  useEffect(() => {
    checkPost.current = true;
  }, []);


  const [isFiltersOpen, setFiltersOpen] = useState(false);
  console.log(isFiltersOpen)
  return (<>
    <div className="mxw_1440 px96_15 pb-24 mx-auto pt-6">

      <div className="flex flex-nowrap gap-5 relative z-10">

        <Filters_container
          selectedFilters={selectedFilters} globalData={globalData} setSelectedFilters={setSelectedFilters}
          toggleModal={() => setFiltersOpen((prev) => !prev)} isFiltersOpen={isFiltersOpen}
        />

        <div className="flex w-full flex-col">
          <div className="flex items-start">
            <Sorting_Bar
              querySort={selectedFilters.sort}
              onChange={(ARGsort: string) => {
                setSelectedFilters(prev => {
                  // 1. Получаем имя ключа (например, "price") и значение ("asc" или "default")
                  const [incomingKey, incomingValue] = ARGsort.split(":");

                  // 2. Убираем из старого массива все, что связано с этим ключом
                  const filteredSort = (prev.sort ?? []).filter(item => {
                    const [existingKey] = item.split(":");
                    return existingKey !== incomingKey;
                  });

                  // 3. Если значение не "default", добавляем новый параметр в массив
                  const newSort = incomingValue === "default"
                    ? filteredSort
                    : [...filteredSort, ARGsort];

                  return {
                    ...prev,
                    sort: newSort
                  };
                });
              }}
            >
              <button className="text-black px-2 cursor-pointer outline-white bg-white outline-2 rounded  hover:bg-amber-50 AnimAll0_2 flex md:hidden" onClick={() => setFiltersOpen((prev) => !prev)}>
                <SVGFilters clas="w-8 h-8" />
              </button>
            </Sorting_Bar>

          </div>

          {globalData.dataProducts.length !== 0 ?
            <Catalog LoadingCatalog={isLoading} dataProducts={globalData.dataProducts} datacurrency={globalData.currency ?? "$"} HOST_STRIPE={HOST_STRIPE} />
            : "error"}

          <ProductPagination
            thisPage={globalData?.pageInfo?.page}
            pageSize={globalData?.pageInfo?.pageSize}
            pageCount={globalData?.pageInfo?.pageCount}
            onChange={(ARG) =>
              setSelectedFilters(prev => ({
                ...prev,
                pagination: {
                  ...prev.pagination,
                  page: ARG
                }
              }))
            }
          />
        </div>
      </div>
    </div>
  </>);
}

export default PageProducts;



function buildVariables(filters: TypeProdictsVariables) {
  let arrUrl: string[] = [];
  const vars: any = {};

  if (filters.sort?.length) {
    vars.sort = filters.sort;
    arrUrl.push(`sort=${filters.sort.join(",")}`);
  }

  if (filters.pagination) {
    vars.pagination = filters.pagination;
    arrUrl.push(`page=${filters.pagination.page}`);
  }


  if (filters.filters) {
    const cleanFilters: any = {};

    for (const key in filters.filters) {
      const value = filters.filters[key as keyof TypeFiltresQueryParams];

      if (!value) continue;

      // brand.name.in
      if ("name" in value && value.name?.in?.length) {
        cleanFilters[key] = { name: { in: value.name.in } };
        arrUrl.push(`filters_${key}_name_in=${value.name.in.join(",")}`);
        continue;
      }

      // gte / lte
      if ("gte" in value || "lte" in value) {
        const cleanRange: any = {};
        if (value.gte !== "" && value.gte != null) {
          cleanRange.gte = Number(value.gte)
          arrUrl.push(`filters_${key}_gte=${value.gte}`);
        };
        if (value.lte !== "" && value.lte != null) {
          cleanRange.lte = Number(value.lte);
          arrUrl.push(`filters_${key}_lte=${value.lte}`);
        }

        if (Object.keys(cleanRange).length) {
          cleanFilters[key] = cleanRange;
        }
      }
    }
    // console.log(Object.keys(cleanFilters).length)
    if (Object.keys(cleanFilters).length) {
      vars.filters = cleanFilters;
    }
  }


  return { vars, arrUrl };
}
