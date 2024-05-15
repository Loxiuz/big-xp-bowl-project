import { API_URL } from "../settings";
import { handleHttpErrors, makeOptions } from "./fetchUtils";
import { Customer } from "./types";

const CUSTOMER_URL = API_URL + "/customers";

async function getCustomers(): Promise<Customer[]> {
  return fetch(CUSTOMER_URL).then(handleHttpErrors);
}

async function createUpdateCustomer(newCustomer: Customer): Promise<Customer> {
  const method = newCustomer.id ? "PUT" : "POST";
  const options = makeOptions(method, newCustomer);
  const URL = newCustomer.id
    ? `${CUSTOMER_URL}/${newCustomer.id}`
    : CUSTOMER_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

export { getCustomers, createUpdateCustomer };
