import { API_URL } from "../settings";
import { handleHttpErrors, makeOptions } from "./fetchUtils";
import { Product } from "./types";

const PRODUCT_URL = API_URL + "/products";

async function getProducts(): Promise<Product[]> {
  return fetch(PRODUCT_URL).then(handleHttpErrors);
}

async function getProduct(id: number): Promise<Product> {
  return fetch(PRODUCT_URL + `/${id}`).then(handleHttpErrors);
}

async function createUpdateProduct(newProduct: Product): Promise<Product> {
  const method = newProduct.id ? "PUT" : "POST";
  const options = makeOptions(method, newProduct);
  const URL = newProduct.id ? `${PRODUCT_URL}/${newProduct.id}` : PRODUCT_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

export { getProducts, createUpdateProduct, getProduct };
