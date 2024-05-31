import { API_URL } from "../settings";
import { handleHttpErrors } from "./fetchUtils";
import { EmployeeSchedule } from "./types";

const EMPLOYEE_SCHEDULES_URL = API_URL + "/employee_schedules";

async function getEmployeeSchedules(): Promise<EmployeeSchedule[]> {
  return fetch(EMPLOYEE_SCHEDULES_URL).then(handleHttpErrors);
}

export { getEmployeeSchedules };
