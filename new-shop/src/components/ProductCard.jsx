import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  product: { id, imageUrl, title, category, price },
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${id}`, { state: { product } });
  };
  return (
    <li onClick={handleClick}>
      <img src={imageUrl} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{`￦${price.toLocaleString()}`}</p>
      </div>
      <p>{category}</p>
    </li>
  );
}
