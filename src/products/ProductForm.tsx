import { useEffect, useState } from "react";
import { Product } from "../services/types";
import { createUpdateProduct, getProduct } from "../services/ProductApi";
import "./ProductForm.css";
import { useParams } from "react-router-dom";

export default function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const [productFormData, setProductFormData] = useState<Product>({
    id: null,
    name: "",
    price: 0,
    size: "",
    inStock: false,
  });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const response = await getProduct(parseInt(id));
        setProductFormData(response);
      };
      fetchProduct();
    }
  }, [id, setProductFormData]);

  function handleProductFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.currentTarget;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setProductFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleProductFormSelectChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const target = e.currentTarget;
    const value = target.value;
    const name = target.name;

    setProductFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const response = await createUpdateProduct(productFormData);
    if (response) {
      alert(`Product ${response.name} saved!`);
    }
  }

  return (
    <div>
      <h2>Product Form</h2>
      <form id="product-form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleProductFormChange}
          defaultValue={productFormData.name}
        />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          onChange={handleProductFormChange}
          value={productFormData.price}
        />
        <label>Size:</label>
        <select
          name="size"
          onChange={handleProductFormSelectChange}
          value={productFormData.size}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <label>In Stock:</label>
        <input
          type="checkbox"
          name="inStock"
          onChange={handleProductFormChange}
          checked={productFormData.inStock}
        />
        <button onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
}
