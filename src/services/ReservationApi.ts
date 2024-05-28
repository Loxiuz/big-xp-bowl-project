import { API_URL } from "../settings";
import { handleHttpErrors, makeOptions } from "./fetchUtils";
import { Reservation } from "./types";
const RESERVATION_URL = API_URL + "/reservations";

async function getReservations(): Promise<Reservation[]> {
  return fetch(RESERVATION_URL).then(handleHttpErrors);
}

async function createUpdateReservation(
  newReservation: Reservation
): Promise<Reservation> {
  const method = newReservation.id ? "PUT" : "POST";
  const options = makeOptions(method, newReservation);
  const URL = newReservation.id
    ? `${RESERVATION_URL}/${newReservation.id}`
    : RESERVATION_URL + "/create";
  return fetch(URL, options).then(handleHttpErrors);
}

export { getReservations, createUpdateReservation };
