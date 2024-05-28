import { API_URL } from "../settings";
import { handleHttpErrors } from "./fetchUtils";
import { DiningTable } from "./types";

const DINING_TABLES_URL = API_URL + "/dining_tables";

async function getDiningTables(): Promise<DiningTable[]> {
  return fetch(DINING_TABLES_URL).then(handleHttpErrors);
}

export { getDiningTables };
