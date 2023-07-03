import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCarts";

export default function ProductDetail() {
  const { addOrUpdateItem } = useCart();
  const {
    state: {
      product: { id, imageUrl, title, category, price, description, size },
    },
  } = useLocation();
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(size && size[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = () => {
    const product = { id, imageUrl, title, price, option: selected, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess("장바구니에 추가되었습니다.");
        setTimeout(() => setSuccess(null), 3000);
      },
    });
  };
  return (
    <>
      <p>{category}</p>
      <section>
        <img src={imageUrl} alt={title} />
        <div>
          <h2>{title}</h2>
          <p>{`￦${price.toLocaleString()}`}</p>
          <p>{description}</p>
        </div>
        <div>
          <label htmlFor="select">Option</label>
          <select id="select" onChange={handleSelect} value={selected}>
            {}
          </select>
          {}
          <Button text="장바구니에 추가" onClick={handleClick} />
        </div>
      </section>
    </>
  );
}
