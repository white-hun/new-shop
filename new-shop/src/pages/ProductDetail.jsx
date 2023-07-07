import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCarts";

export default function ProductDetail() {
  const { addProduct } = useCart();
  const {
    state: {
      product: { id, imageUrl, title, category, price, description, size },
    },
  } = useLocation();
  // const [product, setProduct] = useState({ id, imageUrl, title, price, category, size });
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(size && size[0]);
  const [success, setSuccess] = useState();

  const handleMinus = () => setQuantity(quantity - 1);
  const handlePlus = () => setQuantity(quantity + 1);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = async () => {
    const product = {
      id,
      imageUrl,
      title,
      category,
      price: price * quantity,
      size: selected,
      quantity,
    };
    // setProduct({ ...product, price: price * quantity, size: selected, quantity });
    addProduct.mutate(product, {
      onSuccess: () => {
        setSuccess("장바구니에 추가되었습니다.");
        setTimeout(() => setSuccess(null), 2000);
      },
    });
    console.log(product);
  };
  return (
    <>
      <p>{category}</p>
      <section>
        <img src={imageUrl} alt={title} />
        <div>
          <h2>{title}</h2>
          <p>{`￦${price.toLocaleString() * quantity}`}</p>
          <p>{description}</p>
        </div>
        <div>
          <label htmlFor="select">Option</label>
          <select id="select" onChange={handleSelect} value={selected}>
            {size && size.map((size, index) => <option key={index}>{size}</option>)}
          </select>
          {quantity >= 2 ? <Button text="-" onClick={handleMinus} /> : <Button text="-" disabled />}
          <p>{quantity}</p>
          <Button text="+" onClick={handlePlus} />
          {/* {success && <p className="my-2">{success}</p>} */}
          <Button text={success ? success : "장바구니에 추가"} onClick={handleClick} />
        </div>
      </section>
    </>
  );
}
