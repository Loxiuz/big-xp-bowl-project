import { API_URL } from "../settings";
import { handleHttpErrors, makeOptions } from "./fetchUtils";
import { Equipment } from "./types";

const EQUIPMENT_URL = API_URL + "/equipment";

async function getEquipment(): Promise<Equipment[]> {
  return fetch(EQUIPMENT_URL).then(handleHttpErrors);
}

async function createUpdateEquipment(
  newEquipment: Equipment
): Promise<Equipment> {
  const method = newEquipment.id ? "PUT" : "POST";
  const options = makeOptions(method, newEquipment);
  const URL = newEquipment.id
    ? `${EQUIPMENT_URL}/${newEquipment.id}`
    : EQUIPMENT_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

export { getEquipment, createUpdateEquipment };
