import React, { useState } from "react";
import Button from "../components/ui/Button";
import { uploadImage } from "../api/upload";
import useProducts from "../hooks/useProducts";
import { addNewProduct } from "../api/firebase";

export default function NewProduct() {
  const option = {
    title: "",
    price: "",
    category: "",
    description: "",
    size: "",
  };
  const [product, setProduct] = useState(option);
  const [file, setFile] = useState();
  const [success, setSuccess] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const { title, price, category, description, size } = product;

  const { addProduct } = useProducts();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file) //
      .then((url) => {
        console.log(product, url);
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess("성공적으로 제품이 추가되었습니다.");
              setTimeout(() => {
                setSuccess(null);
              }, 3000);
            },
          }
        );
      })
      .finally(() => setIsUploading(false));

    // .then((url) => {
    //   addProduct.mutate(
    //     { product, url },
    //     {
    //       onSuccess: () => {
    //         setSuccess("성공적으로 제품이 추가되었습니다.");
    //         setTimeout(() => {
    //           setSuccess(null);
    //         }, 3000);
    //       },
    //     }
    //   );
    // })
    // .finally(() => setIsUploading(false));
  };

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
          value={title}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={price}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={category}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={description}
          placeholder="제품설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="size"
          value={size}
          placeholder="옵션(콤마(,)로 구분)"
          required
          onChange={handleChange}
        />
        <Button text={isUploading ? "업로드중..." : "제품 등록하기"} disabled={isUploading} />
      </form>
    </section>
  );
}
