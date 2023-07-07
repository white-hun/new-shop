import React from "react";
import useCart from "../hooks/useCarts";

export default function CartProductCard({
  product,
  product: { id, imageUrl, title, price, quantity, size, category },
}) {
  const { updateProduct, removeProduct } = useCart();
  const handleMinus = () => {
    if (quantity >= 2) return updateProduct.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () => {
    updateProduct.mutate({ ...product, quantity: quantity + 1 });
  };
  const handleDelete = async () => {
    removeProduct.mutate(id, {
      onSuccess: () => {
        window.confirm("삭제되었습니다.");
      },
    });
  };
  return (
    <li className="flex">
      <img className="w-24 md:w-48 rounded-lg" src={imageUrl} alt={title} />
      <div>
        <div>
          <p>{title}</p>
          <p>{category}</p>
          <p>{size}</p>
          <p>￦{price.toLocaleString()}</p>
        </div>
        <div>
          <button className="pr-3" onClick={handleMinus}>
            -
          </button>
          <span className="pr-3">{quantity}</span>
          <button className="pr-3" onClick={handlePlus}>
            +
          </button>
          <button className="pr-3" onClick={handleDelete}>
            X
          </button>
        </div>
      </div>
    </li>
  );
}
