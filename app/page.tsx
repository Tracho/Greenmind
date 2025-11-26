

import { TypeHomePageResponse, TypeBlocks } from "@/components/types/global";

import About_us from "@/components/blocks/About_us";
import Best_Selling_Plants from "@/components/blocks/Best_Selling_Plants";
import HeaderMain from "@/components/blocks/HeaderMain";
import MainCategories from "@/components/blocks/MainCategories";
import MainClientMessageSlider from "@/components/blocks/MainClientMessageSlider";
import SVGArrowRight from "@/components/icons/SVGArrowRight";
import NavBar from "@/components/layout/navbar";
import Button from "@/components/ui/Button";
import {query} from "@/components/lib/gql/home"

// ?populate=*

const HOST_STRIPE = process.env.NEXT_PUBLIC_HOST_STRAPI as string;
const GQL = process.env.NEXT_PUBLIC_HOST_GQL as string;



export default async function Home() { 

  const res = await fetch(GQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  }); 
  const { data }: { data: TypeHomePageResponse } = await res.json();
  console.log(data)
  // let blocks: TypeBlocks[] = data.HomePage.HomePage;
  let blocks: TypeBlocks[] = data.homePage.HomePage;
  console.log(blocks)


  return (
    <>
      <NavBar />

      {blocks.map((b, i) => {
        if (b.__typename === "ComponentHomepageHeaderHeader") {
          return (<HeaderMain key={i} HOST_STRIPE={HOST_STRIPE} data={b} />)
        }
        if (b.__typename === "ComponentBspBestSellingPlants") {
          return (<Best_Selling_Plants key={i} HOST_STRIPE={HOST_STRIPE} data={b} />)
        }

        return null;
      }
      )}

      <About_us />
      <MainCategories />
      <MainClientMessageSlider />

      {/*       
      <div>
        <Button title="See more" >
          <SVGArrowRight />
        </Button>
        <Button title="Explore" classStyle="bg-white" >
          <SVGArrowRight />
        </Button>
      </div>
     */}
    </>
  );
}


