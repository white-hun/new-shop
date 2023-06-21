import React, { useState } from "react";
import Button from "../components/ui/Button";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [success, setSuccess] = useState();
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = () => {};

  const handleSubmit = () => {};

  return (
    <section className="w-full text-center">
      <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
      {success && <p className="">✅{success}</p>}
      {file && (
        <img src={URL.createObjectURL(file)} alt="local file" className="w-96 mx-auto mb-2 " />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col px-12">
        <input type="file" accept="image/*" name="file" onChange={handleChange} required />
        <input
          type="text"
          name="title"
          value={product.title ?? ""}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ""}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ""}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ""}
          placeholder="제품설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ""}
          placeholder="옵션(콤마(,)로 구분)"
          required
          onChange={handleChange}
        />
        <Button text={isUploading ? "업로드중..." : "제품 등록하기"} disabled={isUploading} />
      </form>
    </section>
  );
}
