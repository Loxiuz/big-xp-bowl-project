import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../services/types";
import { getProducts } from "../services/ProductApi";

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response);
    };
    fetchProducts();
  }, [setProducts]);

  return (
    <div>
      <h2>Products</h2>
      <nav>
        <Link to="/manager/products/create">
          <button>Create Product</button>
        </Link>
      </nav>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Size</th>
            <th>In Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.size}</td>
              <td>{`${product.inStock}`}</td>
              <td>
                <Link to={`/manager/products/${product.id}/edit`}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
