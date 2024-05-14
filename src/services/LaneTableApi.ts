import { handleHttpErrors, makeOptions } from "./fetchUtils";
import { LaneTable } from "./types";

const LANE_TABLE_URL = import.meta.env.BASE_URL + "laneTables";

async function getLaneTables(): Promise<LaneTable[]> {
  return fetch(LANE_TABLE_URL).then(handleHttpErrors);
}

async function createUpdateLaneTable(
  newLaneTable: LaneTable
): Promise<LaneTable> {
  const method = newLaneTable.id ? "PUT" : "POST";
  const options = makeOptions(method, newLaneTable);
  const URL = newLaneTable.id
    ? `${LANE_TABLE_URL}/${newLaneTable.id}`
    : LANE_TABLE_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

const lanesTables = [
  {
    id: 1,
    type: "lane",
    isJunior: false,
    isActive: true,
  },
  {
    id: 2,
    type: "lane",
    isJunior: false,
    isActive: true,
  },
  {
    id: 3,
    type: "lane",
    isJunior: false,
    isActive: true,
  },
  {
    id: 4,
    type: "lane",
    isJunior: false,
    isActive: true,
  },
  {
    id: 5,
    type: "lane",
    isJunior: false,
    isActive: true,
  },
  {
    id: 6,
    type: "lane",
    isJunior: false,
    isActive: true,
  },
  {
    id: 7,
    type: "lane",
    isJunior: false,
    isActive: true,
  },
  {
    id: 8,
    type: "lane",
    isJunior: false,
    isActive: true,
  },
  {
    id: 9,
    type: "lane",
    isJunior: true,
    isActive: true,
  },
  {
    id: 10,
    type: "lane",
    isJunior: true,
    isActive: true,
  },
  {
    id: 11,
    type: "lane",
    isJunior: false,
    isActive: true,
  },
  {
    id: 12,
    type: "lane",
    isJunior: false,
    isActive: true,
  },
  {
    id: 13,
    type: "lane",
    isJunior: false,
    isActive: true,
  },
  {
    id: 14,
    type: "lane",
    isJunior: false,
    isActive: true,
  },
  {
    id: 15,
    type: "table",
    isJunior: false,
    isActive: true,
  },
  {
    id: 16,
    type: "table",
    isJunior: false,
    isActive: true,
  },
  {
    id: 17,
    type: "table",
    isJunior: false,
    isActive: true,
  },
  {
    id: 18,
    type: "table",
    isJunior: false,
    isActive: true,
  },
  {
    id: 19,
    type: "table",
    isJunior: false,
    isActive: true,
  },
  {
    id: 20,
    type: "table",
    isJunior: false,
    isActive: true,
  },
];

export { getLaneTables, createUpdateLaneTable, lanesTables };
