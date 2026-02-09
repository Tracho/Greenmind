
import NavBar from "@/components/layout/navbar";
import { query } from "@/components/lib/gql/products";
import { queryMaxPrice } from "@/components/lib/gql/productsMaxPrice";
import BSP_card from "@/components/ui/BSP_card";
import Link from "next/link";
import {TypeProductsResponse, TypeProducts, Typeglobals, TypeFiltresQueryParams, TypeFiltresQuerySubParams, TypeProdictsVariables, Brands } from "@/components/types/global";
import Catalog from "@/components/blocks/products/catalog";
import Category from "@/components/blocks/products/category"
import Sorting_Bar from "@/components/blocks/products/Sorting_Bar";
import ProductCount from "@/components/blocks/products/ProductPagination";
import ParseUrlQuery from "@/components/blocks/products/ParseUrlQuery";
import Product_Filters_Range_Input from "@/components/blocks/products/Product_Filters_Range_Input";
import PageProducts from "@/components/blocks/products/PageProducts";
import { TypeVariablesOBJ } from "@/components/types/Variables"

const GQL = process.env.NEXT_PUBLIC_HOST_GQL as string;

async function Product({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  
  let queryParams = await searchParams;


  const ObjVariables: TypeVariablesOBJ = ParseUrlQuery(queryParams);
   
  const res = await fetch(GQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: ObjVariables,
    }),
  });
   
  const jsonRes = await res.json();
  // const jsonResponse:any = jsonRes.data;
  const jsonResponse:TypeProductsResponse = jsonRes.data;
  // console.log("ObjVariables",ObjVariables)
  console.log("jsonResponse", jsonResponse);
  // console.log("queryParams",queryParams) 


  // const dataBrands: Brands = jsonResponse.data.brands;
  // const dataColors: TypeProducts[] = jsonResponse.data.colors;
  // const dataProducts: TypeProducts[] = jsonResponse.data.products;
  // const globals: Typeglobals = jsonResponse.data.globals?.[0] || null;
  // console.log(dataBrands);
  // console.log(dataColors);

  return (<>
    <NavBar />

    <PageProducts jsonResponse={jsonResponse} ObjVariables={ObjVariables} />
  </>);
}

export default Product;