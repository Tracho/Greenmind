import BSP_card from "@/components/ui/BSP_card";
import { TypeProducts, Typeglobals } from "@/components/types/global";

function Catalog({dataProducts, datacurrency, HOST_STRIPE , LoadingCatalog}
  : {dataProducts: TypeProducts[], datacurrency: string, HOST_STRIPE: string, LoadingCatalog: boolean}) {
    
   return (<>
    <div className="flex w-full flex-wrap justify-between">
      {LoadingCatalog && <p>Loading...</p>}
      {!LoadingCatalog && dataProducts.length === 0 && <p>No products found.</p>}
      
      {dataProducts.map((card, index) => {
        if (card.images && card.images) return (
          <BSP_card key={index}
            link={`/products/${card.slug}`}
            HOST_STRIPE={HOST_STRIPE}
            imgUrl={card.images[0]?.url}
            imgjson={card.imgjson?.[0] || undefined}
            alternativeText={card.images[0]?.alternativeText}
            number_price={card.price}
            likes={card.likes}
            inStock={card?.inStock}
            sold={card.sold}
            currency={datacurrency}
            header={card.title}
            width={card.images[0]?.width}
            height={card.images[0]?.height}
            imgClass="rounded-2xl w-[200px] h-[200px]"
            subContainClass="max-w-[225px] px-3"
            plusClass="xl:w-1/4 sm:w-1/2 w-full my-5" />
        );
      })}
    </div>
  </>);
}

export default Catalog;