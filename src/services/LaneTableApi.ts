import { API_URL } from "../settings";
import { handleHttpErrors } from "./fetchUtils";
import { LaneTable, LaneTableReservation } from "./types";

const LANE_TABLE_URL = API_URL + "/lanes_and_air_tables";

async function getLaneTables(): Promise<LaneTable[]> {
  return await fetch(LANE_TABLE_URL).then(handleHttpErrors);
}

async function getLaneTableReservations(): Promise<LaneTableReservation[]> {
  return await fetch(LANE_TABLE_URL + "/reservations").then(handleHttpErrors);
}

export { getLaneTables, getLaneTableReservations };
