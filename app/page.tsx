
"use server";
import { TypeHomePageResponse, TypeBlocks, TypeProducts, Typeglobals } from "@/components/types/global";

import About_us from "@/components/blocks/About_us";
import Best_Selling_Plants from "@/components/blocks/Best_Selling_Plants";
import HeaderMain from "@/components/blocks/HeaderMain";
import MainCategories from "@/components/blocks/MainCategories";
import MainClientMessageSlider from "@/components/blocks/MainClientMessageSlider";
import SVGArrowRight from "@/components/icons/SVGArrowRight";
import NavBar from "@/components/layout/navbar";
import Button from "@/components/ui/Button";
import { query, query1 } from "@/components/lib/gql/home"

// ?populate=*

const HOST_STRIPE = process.env.NEXT_PUBLIC_HOST_STRAPI as string;
const GQL = process.env.NEXT_PUBLIC_HOST_GQL as string;

// type TypeDataProducts = {
//   products: TypeProducts[];
// };

export default async function Home() {

  const res = await fetch(GQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        pagination: {
          limit: 1
        },
        productsPagination2: {
          limit: 3
        },
        sort: ["sold:desc"],
      }
    }),
  });
  const { data }: { data: TypeHomePageResponse } = await res.json();
  console.log(data)
  // let blocks: TypeBlocks[] = data.HomePage.HomePage;
  let blocks: TypeBlocks[] = data.homePage.HomePage;
  let products: TypeProducts[] = data.products || [];
  let globals: Typeglobals | null = data.globals?.[0] || null;
  // let global: Typeglobals = globals[0];
   

  return (
    <>
      <NavBar />

      {blocks.map((b, i) => {
        if (b.__typename === "ComponentHomepageHeaderHeader") {
          return (<HeaderMain key={i} HOST_STRIPE={HOST_STRIPE} data={b} />)
        }
        if (b.__typename === "ComponentBspBestSellingPlants") {
          return (<Best_Selling_Plants key={i} HOST_STRIPE={HOST_STRIPE} globals={globals} data={b} products={products} />)
        }
        if (b.__typename === "ComponentAboutUsAboutUs") {
          return (<About_us key={i} data={b} />)
        }
        if (b.__typename === "ComponentMainCategoriesMainCategories") {
          return <MainCategories HOST_STRIPE={HOST_STRIPE} key={i} data={b} />
        }
        if (b.__typename === "ComponentMainCommentsMainComments") {
          return <MainClientMessageSlider key={i} data={b} HOST_STRIPE={HOST_STRIPE} />
        }
        return null;
      }
      )}



      {/*       
      <div>
        <Button subtitle="See more" >
          <SVGArrowRight />
        </Button>
        <Button subtitle="Explore" classStyle="bg-white" >
          <SVGArrowRight />
        </Button>
      </div>
     */}
    </>
  );
}


