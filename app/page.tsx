
import { TypeHomePageResponse, TypeBlocks, TypeProducts, Typeglobals } from "@/components/types/global";

import About_us from "@/components/blocks/About_us";
import Best_Selling_Plants from "@/components/blocks/Best_Selling_Plants";
import HeaderMain from "@/components/Home/HeaderMain";
import MainCategories from "@/components/blocks/MainCategories";
import MainClientMessageSlider from "@/components/blocks/MainClientMessageSlider";
import NavBar from "@/components/layout/navbar";
import { query } from "@/components/lib/gql/home"
import Footer from "@/components/layout/footer";
import LoadingError from "@/components/ui/LoadingError";
import { Data, HomePageElement, Product, Res, Global } from "@/components/types/homePage";

const HOST_STRIPE = process.env.NEXT_PUBLIC_HOST_STRAPI as string;
const GQL = process.env.NEXT_PUBLIC_HOST_GQL as string;


export default async function Home() {
  try {
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
    if (!res.ok) {
      const message = await res.text();
      return <LoadingError>{message || `Error: ${res.status}`}</LoadingError>;
    }
    const json: Res = await res.json();
    const data: Data = json.data;
    console.log(data)
    let blocks: HomePageElement[] = data.homePage.HomePage;
    let products: Product[] = data.products || [];
    let globals: Global | null = data.globals?.[0] || null;



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

        <Footer />
      </>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
     return <LoadingError>{message}</LoadingError>
  }

}


