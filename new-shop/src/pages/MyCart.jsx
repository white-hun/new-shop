import React from "react";
import CartProductCard from "../components/CartProductCard";
import useCart from "../hooks/useCarts";
import PriceCard from "../components/PriceCard";

export default function MyCart() {
  const {
    cartQuery: { isLoading, data: product },
  } = useCart();

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = product && product.length > 0;
  //

  return (
    <section className="p-8 flex flex-col">
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          {isLoading && <p>Loading...</p>}
          <ul>
            {product && product.map((prod) => <CartProductCard key={prod.id} product={prod} />)}
          </ul>
          <div>
            <PriceCard />
          </div>
        </>
      )}
    </section>
  );
}
