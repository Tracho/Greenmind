import BSP_card from "@/components/ui/BSP_card";
import { TypeProducts, Typeglobals } from "@/components/types/global";
import SVGLoading from "@/components/icons/SVGLoading";

function Catalog({dataProducts, datacurrency, HOST_STRIPE , LoadingCatalog}
  : {dataProducts: TypeProducts[], datacurrency: string, HOST_STRIPE: string, LoadingCatalog: boolean}) {

   return (<>
    <div className="flex w-full flex-wrap justify-start relative">

      {LoadingCatalog && <span className="text-4xl font-medium flex justify-center items-start w-full abTopCenter z-25">Loading<SVGLoading w="64px" h="64px" strokeW="20" /></span>}
      {!LoadingCatalog && dataProducts.length === 0 && <span className="text-4xl font-medium flex justify-center items-start w-full abTopCenter z-25">No products found.</span>}
      
      {dataProducts.map((card, index) => {
        if (card.images && card.images) return (
          <BSP_card key={index}
            link={`/products/${card.slug}`}
            HOST_STRIPE={HOST_STRIPE}
            // imgUrl={card.images[0]?.url}
            imgUrl={(card.images[0].url !== undefined ? `${HOST_STRIPE}/uploads/thumbnail_${card.images[0].hash}${card.images[0].ext}` : '')}
            // url={"..."}
            // imgjson={card.imgjson?.[0] || undefined}
            alternativeText={card.images[0]?.alternativeText}
            number_price={card.price}
            discount={card.discount}
            discountboolean={card.discountboolean}
            oldPrice={card.oldPrice}
            likes={card.likes}
            inStock={card?.inStock}
            sold={card.sold}
            currency={datacurrency}
            header={card.title}
            width={card.images[0]?.width}
            height={card.images[0]?.height}
            imgClass="rounded-2xl shrink-0  w-[200px] h-[200px]"
            subContainClass="max-w-[205px] relative px-3"
            plusClass="xl:w-1/4 sm:w-1/2 w-full my-5"
            // plusClass="my-5"
             />
        );
      })}
    </div>
  </>);
}

export default Catalog;