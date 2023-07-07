import React from "react";
import CartProductCard from "../components/CartProductCard";
import useCart from "../hooks/useCarts";
import PriceCard from "../components/PriceCard";

const SHIPPING = 3000;

export default function MyCart() {
  const {
    cartQuery: { isLoading, data: product },
  } = useCart();

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = product && product.length > 0;
  const totalPrice =
    product && product.reduce((prev, curr) => prev + parseInt(curr.price) * curr.quantity, 0);

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
            <PriceCard text="상품 총액" price={totalPrice} />
            <PriceCard text="배송비" price={SHIPPING} />
            <PriceCard text="총 가격" price={totalPrice + SHIPPING} />
          </div>
        </>
      )}
    </section>
  );
}
