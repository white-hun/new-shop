import React from "react";
import useCart from "../hooks/useCarts";
import { BsBag } from "react-icons/bs";

export default function CartProductCount() {
  const {
    cartQuery: { data: product },
  } = useCart();
  return (
    <div className="relative">
      <BsBag />
      {product && (
        <p className="flex w-4 h-4 justify-center items-center bg-black text-white font-bold rounded-full absolute -top-1 -right-2 text-sm">
          {product.length}
        </p>
      )}
    </div>
  );
}
