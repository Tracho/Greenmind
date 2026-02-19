"use client"

import Image from "next/image";
import { TypeThisProduct } from "../types/basket";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import SVGclose from "../icons/SVGclose";
import SVGtrash from "../icons/SVGtrash";
import SVGminus from "../icons/SVGminus";
import SVGplus from "../icons/SVGplus";

type Props = {
  cart: TypeThisProduct[];
  onClose: () => void;
}
function BasketInfo({ cart, onClose }: Props) {
  const { plusQuantity, minusQuantity, removeFromCart } = useCart();
  // const imgUrl = `${HOST_STRIPE}/uploads/thumbnail_${e.hash}${e.ext}`;

  return (<>
    {cart.map((item) => {
      const thisItemPrice = (Number(item.price) * Number(item.quantity)).toFixed(2);
      const [mainPrice, cents] = String(thisItemPrice).split('.');
      const [mainOldPrice, oldCents] = String(item.oldPrice).split('.');

      const price = Number(item.price);
      const oldPrice = Number(item.oldPrice);
      const discountPercent = oldPrice > price
        ? Math.round(((oldPrice - price) / oldPrice) * 100)
        : 0;

      return (
        <div key={item.id} className="flex flex-col items-center gap-2.5 justify-between p-2 border-b">
          <div className="flex w-full flex-col gap-2.5">
            <Link className="flex gap-2.5" href={item.url ?? "#"} target="_blank" rel="noopener noreferrer">
              <div>
                <Image src={item.image} alt={item.title} width={100} height={100} className="object-cover rounded-md" />
              </div>
              <span className="w-full flex text-sm">{item.title}</span>
            </Link>

            {item.discountboolean &&
              <div className="flex gap-1 text-md">
                <p>
                  Old Price: <span className="line-through color_blackgray">{item.currency}{mainOldPrice}{oldCents && "."}
                    {oldCents && <sup>{oldCents}</sup>}
                  </span>
                </p>
                <p className="text-orange-600 text-sm font-semibold">-{item.discount}%</p>
              </div>
            }

            <div className="flex gap-2.5 justify-between items-center">
              <div>
                <span>
                  Price: {item.currency}{mainPrice}{cents && "."}
                  {cents && <sup>{cents}</sup>}
                </span>
              </div>

              {item.inStock ? (
                <span className="inline-block text-xs px-3 py-1 bg-green-600 text-white rounded w-fit">
                  In Stock
                </span>
              ) : (
                <span className="inline-block text-xs px-3 py-1 bg-red-600 text-white rounded w-fit">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="flex gap-2.5 justify-between items-center">
              <div className="flex items-center justify-between gap-2.5">
                <button className="cursor-pointer" onClick={() => minusQuantity(item.id)}>
                  <SVGminus clas="w-6 h-6" />
                </button>
                <span>{item.quantity}</span>
                <button className="cursor-pointer" onClick={() => plusQuantity(item.id)}>
                  <SVGplus clas="w-6 h-6" />
                </button>
              </div>

              <button className="cursor-pointer" onClick={() => removeFromCart(item.id)}>
                <SVGclose clas="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      )
    })}

    <button
      className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      onClick={onClose}
    >
      Понятно
    </button>
  </>);
}

export default BasketInfo;