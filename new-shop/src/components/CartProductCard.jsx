import React from "react";
import useCart from "../hooks/useCarts";

export default function CartProductCard({
  product,
  product: { id, imageUrl, title, price, quantity, size, category },
}) {
  const { addProduct, removeProduct } = useCart();
  const handleMinus = () => {
    if (quantity > 2) return;
    addProduct.mutate({ ...product, price: price * quantity, quantity: quantity - 1 });
  };
  const handlePlus = () => {
    addProduct.mutate({ ...product, price: price * quantity, quantity: quantity + 1 });
  };
  const handleDelete = () => {
    removeProduct.mutate(id);
  };
  return (
    <li className="flex">
      <img className="w-24 md:w-48 rounded-lg" src={imageUrl} alt={title} />
      <div>
        <div>
          <p>{title}</p>
          <p>{category}</p>
          <p>{size}</p>
          <p>{price}</p>
        </div>
        <div>
          <button onclick={handleMinus}>-</button>
          <span>{quantity}</span>
          <button onclick={handlePlus}>+</button>
          <button onclick={handleDelete}>X</button>
        </div>
      </div>
    </li>
  );
}
