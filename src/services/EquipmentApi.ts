import { API_URL } from "../settings";
import { handleHttpErrors } from "./fetchUtils";
import { Equipment } from "./types";

const EQUIPMENT_URL = API_URL + "/equipment";

async function getEquipment(): Promise<Equipment[]> {
  return fetch(EQUIPMENT_URL).then(handleHttpErrors);
}

export { getEquipment };
