

import { TypeHomePageResponse, TypeBlocks } from "@/components/types/global";

import About_us from "@/components/blocks/About_us";
import Best_Selling_Plants from "@/components/blocks/Best_Selling_Plants";
import HeaderMain from "@/components/blocks/HeaderMain";
import MainCategories from "@/components/blocks/MainCategories";
import MainClientMessageSlider from "@/components/blocks/MainClientMessageSlider";
import SVGArrowRight from "@/components/icons/SVGArrowRight";
import NavBar from "@/components/layout/navbar";
import Button from "@/components/ui/Button";

// ?populate=*

const HOST_STRIPE: string = "http://localhost:1337";
const HOST = "http://localhost:1337/graphql";



export default async function Home() {
  const query = ` 
  query HomePage {
  homePage {
    HomePage {
      ... on ComponentHomepageHeaderHeader {
      __typename
        id
        header
        subtitle_l_number
        subtitle_l_text
        subtitle_r_number
        subtitle_r_text
        input_placeholder
        image {
          width
          url
          height
          alternativeText
        }
      }
      ... on ComponentAboutUsAboutUs {
      __typename
        id
        Header
        subtitle
        cycle {
          header
          subtitle
        }
      }
      ... on ComponentBspBestSellingPlants {
      __typename
        id
        header
        subtitle
        text_btn
        cycle {
          header
          price
          img {
            alternativeText
            height
            width
            url
          }
          number_price
          currency
        }
      }
      ... on ComponentMainCategoriesMainCategories {
      __typename
        id
        Header
        subtitle
        cycle {
          header
          subtitle
          text_btn
          img {
            width
            url
            height
            alternativeText
          }
        }
      }
      ... on ComponentMainCommentsMainComments {
      __typename
        id
        header
        cycle {
          img {
            width
            url
            alternativeText
            height
          }
          social
          rating
          name
          message
        }
      }
    }
  }
} 
  `;

  const res = await fetch(HOST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  // const { json }: any = await res.json();


  // const data = await res.json();

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


