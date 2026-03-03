"use client"

import Image from "next/image";
import { TypeThisProduct } from "../types/basket";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import SVGclose from "../icons/SVGclose";
import SVGtrash from "../icons/SVGtrash";
import SVGminus from "../icons/SVGminus";
import SVGplus from "../icons/SVGplus";
import { useMemo } from "react";

type Props = {
  cart: TypeThisProduct[];
  onClose: () => void;
}
function BasketInfo({ cart, onClose }: Props) {
  const { plusQuantity, minusQuantity, removeFromCart } = useCart();
  // const imgUrl = `${HOST_STRIPE}/uploads/thumbnail_${e.hash}${e.ext}`;
  const totalPrice = useMemo(() => {
    console.log("💰 Пересчитываю сумму..."); // Появится в консоли только при изменении корзины
    let thisPrice = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
    let [price, cents] = String(thisPrice).split(".");
    return ({ price, cents });
  }, [cart]); // Зависит ТОЛЬКО от массива корзины

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
        <div key={item.id} className="flex flex-col items-center gap-2.5 justify-between p-2 border-b border-gray-400">
          <div className="flex w-full flex-col gap-2.5">
            <Link className="flex gap-2.5" href={item.url ?? "#"} target="_blank" rel="noopener noreferrer">
              <div className="flex shrink-0 w-[100px] h-[100px]">
                <Image src={item.image} alt={item.title} width={100} height={100} className="object-cover rounded-md w-full h-full" />
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
                <SVGtrash clas="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      )
    })}

    <div className="flex flex-wrap items-center justify-between mt-4 gap-2.5 max-[500px]:justify-center">
      {cart[0] &&
        <span className="text-lg">
          Total price:
          <b className="font-medium ms-1">
            {cart[0].currency}{totalPrice.price}{totalPrice.cents && "."}
            {totalPrice.cents && <sup>{totalPrice.cents}</sup>}
          </b>
        </span>
      }
      <button
        className=" bg-green-500 text-white px-4 py-2 rounded"
        onClick={onClose}
      >
        Proceed to checkout
      </button>
    </div>

  </>);
}

export default BasketInfo;