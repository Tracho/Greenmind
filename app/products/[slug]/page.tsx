import ProductTitle from "@/components/blocks/product/ProductTitle";
import NavBar from "@/components/layout/navbar";
import { query } from "@/components/lib/gql/product";
import { TypeProduct } from "@/components/types/global";




const HOST_STRIPE = process.env.NEXT_PUBLIC_HOST_STRAPI as string;
const GQL = process.env.NEXT_PUBLIC_HOST_GQL as string;



async function Product({ params, }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log(slug)
  const res = await fetch(GQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        filters: {
          slug: { eq: slug }
        }
      }
    }),
  });
  const jsonResponse = await res.json();
  const data: TypeProduct = jsonResponse.data.products[0];
  console.log(data)

  // const data = Thisdata?.products[0];
  const images = data?.images || [];
  const description = data?.description || "";

  // let blocks: TypeBlocks[] = data.HomePage.HomePage;
  // let blocks: TypeBlocks[] = data.homePage.HomePage;
  return (<>
    <NavBar />
    <ProductTitle data={data} images={images} description={description} HOST_STRIPE={HOST_STRIPE}/>
  </>);
}

export default Product;
