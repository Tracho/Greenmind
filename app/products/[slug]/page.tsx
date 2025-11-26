import { query } from "@/components/lib/gql/product";

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
  const { data }: { data: any } = await res.json();

  // let blocks: TypeBlocks[] = data.HomePage.HomePage;
  // let blocks: TypeBlocks[] = data.homePage.HomePage;
  console.log(data)
  return (<>
    qwe
  </>);
}

export default Product;