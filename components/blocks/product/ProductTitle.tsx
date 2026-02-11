"use client"
import Link from "next/link";
import { SliderComponent } from "@/components/blocks/product/SliderComponent";
import { useCart } from "@/components/context/CartContext";
import { TypeImageData, TypeProduct } from "@/components/types/global";
function convertMarkdown(md: string) {
  return md?.replace(/\n/g, "<br>") || "";
}
type Props = {
  HOST_STRIPE:string;
  data:TypeProduct;
  description:string;
  images:TypeImageData[];
}

function ProductTitle({HOST_STRIPE, data, description, images} : Props) {
  const { addToCart } = useCart();

  return (<>
    <div className="mxw_1440 px96_15 mx-auto mt-6">

      {/* Breadcrumbs */}
      <div className="bread_crumbs mb-4">
        <ul className="flex gap-4 text-sm text-gray-600">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><span className="font-semibold truncate block max-w-3xs">{data?.title}</span></li>
        </ul>
      </div>

      {/* Top block: Slider + Info */}
      <div className="bg_aquamarine p-6 md:p-12 rounded-3xl flex flex-wrap md:flex-nowrap gap-10">

        {/* LEFT COLUMN – SLIDER */}
        <div className="w-full md:w-1/2">
          <div className="w-full max-w-[500px] mx-auto">
            <SliderComponent images={images} HOST_STRIPE={HOST_STRIPE} />
          </div>
        </div>

        {/* RIGHT COLUMN – MAIN INFO */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">

          <h1 className="text-2xl font-bold">{data?.title}</h1>

          <div className="flex items-center gap-3 text-lg">
            <span className="font-semibold text-green-700 text-2xl">${data?.price}</span>
            <span className="text-gray-500">• Sold: {data?.sold}</span>
            <span className="text-gray-500">• Likes: ❤️ {data?.likes}</span>
          </div>

          {data?.inStock ? (
            <span className="inline-block px-3 py-1 bg-green-600 text-white rounded-lg w-fit">
              In Stock
            </span>
          ) : (
            <span className="inline-block px-3 py-1 bg-red-600 text-white rounded-lg w-fit">
              Out of Stock
            </span>
          )}

          {/* <p className="text-gray-700 leading-relaxed mt-3">
            {data?.shortDescription || "Great quality hanging baskets for indoor and outdoor use."}
          </p> */}

          <button className="mt-4 bg-black text-white py-3 px-6 rounded-xl text-lg hover:bg-gray-900"
            onClick={() => addToCart({
              id: data.documentId,
              title: data.title,
              price: data.price || null,
              image: (images[0].url !== undefined ? HOST_STRIPE + images[0].url : ''),
              quantity: 1
            })}
          >
            Add to Cart
          </button>

        </div>
      </div>

      {/* FULL DESCRIPTION (BOTTOM) */}
      <div className="mt-12 p-6 md:p-10 bg-white rounded-3xl shadow-sm text-gray-800 prose">
        <h2 className="text-2xl font-bold mb-4">Description</h2>

        {/* Markdown content */}
        <div dangerouslySetInnerHTML={{ __html: convertMarkdown(description) }} />
      </div>

    </div>
  </>);
}

export default ProductTitle;