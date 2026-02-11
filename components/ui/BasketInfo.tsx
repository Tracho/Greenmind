"use client"

import Image from "next/image";
import { TypeThisProduct } from "../types/basket";
import { TypeProduct } from "../types/global";
import { useCart } from "../context/CartContext";

type Props = {
  cart:  TypeThisProduct[];
  setIsModalOpenLogin:  
}
function BasketInfo({cart, setIsModalOpenLogin}: Props) {
  const {removeFromCart} =  useCart();

  return (<>
    {cart.map((item) => (
      <div key={item.id} className="flex items-center gap-2.5 justify-between p-2 border-b">
        <div> 
          <Image src={item.image} alt={item.title} width={50} height={50} className="object-cover rounded" />
        </div>
        <span className="w-full">{item.title} (x{item.quantity})</span>
        <button onClick={() => removeFromCart(item.id)}>❌</button>
      </div>
    ))}

    <button
      className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      onClick={() => setIsModalOpenLogin(false)}
    >
      Понятно
    </button>
  </>);
}

export default BasketInfo;