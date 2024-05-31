import { API_URL } from "../settings";
import { handleHttpErrors } from "./fetchUtils";
import { Employee } from "./types";

const EMPLOYEES_URL = API_URL + "/employees";

async function getEmployees(): Promise<Employee[]> {
  return fetch(EMPLOYEES_URL).then(handleHttpErrors);
}

export { getEmployees };
