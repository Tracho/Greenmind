
import NavBar from "@/components/layout/navbar";
import { query } from "@/components/lib/gql/products";
import { queryMaxPrice } from "@/components/lib/gql/productsMaxPrice";
import BSP_card from "@/components/ui/BSP_card";
import Link from "next/link";
import { TypeProductsResponse, TypeProducts, Typeglobals, TypeFiltresQueryParams, TypeFiltresQuerySubParams, TypeProdictsVariables, Brands } from "@/components/types/global";
import Catalog from "@/components/blocks/products/catalog";
import Category from "@/components/blocks/products/category"
import Sorting_Bar from "@/components/blocks/products/Sorting_Bar";
import ProductCount from "@/components/blocks/products/ProductPagination";
import ParseUrlQuery from "@/components/blocks/products/ParseUrlQuery";
import Product_Filters_Range_Input from "@/components/blocks/products/Product_Filters_Range_Input";
import PageProducts from "@/components/blocks/products/PageProducts";
import { TypeVariablesOBJ } from "@/components/types/Variables"
import Footer from "@/components/layout/footer";
import LoadingError from "@/components/ui/LoadingError";
import { Rensponce } from "@/components/types/productsPage";
import { API_CONFIG } from "@/components/config";

 
 
async function Product(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  try {
    const queryParams = await props.searchParams;
    const ObjVariables = ParseUrlQuery(queryParams as Record<string, string>);
    const res = await fetch(API_CONFIG.GQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: ObjVariables,
      }),
    });
    if (!res.ok) {
      const message = await res.text();
      return <LoadingError>{message || `Error: ${res.status}`}</LoadingError>;
    }
    const jsonRes = await res.json();
    const jsonResponse: TypeProductsResponse = jsonRes.data;
    // const jsonResponse: Rensponce = jsonRes.data;
    console.log("jsonResponse", jsonResponse);
    // console.log(JSON.stringify(jsonResponse))

    return (<>
      <NavBar /> 
      <PageProducts jsonResponse={jsonResponse} ObjVariables={ObjVariables} /> 
      <Footer />
    </>);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return <LoadingError>{message}</LoadingError>
  }
}

export default Product;