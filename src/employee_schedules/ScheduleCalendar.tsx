import { useEffect, useState } from "react";
import "./ScheduleCalendar.css";
import { EmployeeSchedule } from "../services/types";
import { getEmployeeSchedules } from "../services/EmployeeSchedulesApi";
// import { getEmployees } from "../services/EmployeeApi";

export default function ScheduleCalendar() {
  const [schedules, setSchedules] = useState<EmployeeSchedule[]>([]);
  // const [employees, setEmployees] = useState<Employee[]>([]);
  // const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  useEffect(() => {
    const fetchSchedules = async () => {
      const schedulesResponse = await getEmployeeSchedules();
      // const employeesResponse = await getEmployees();
      setSchedules(schedulesResponse);
      // setEmployees(employeesResponse);
    };
    fetchSchedules();
  }, [setSchedules]);

  function scheduleTimes() {
    const times = [];
    for (let i = 7; i <= 23; i++) {
      times.push(i);
    }
    return times;
  }

  function scheduleHeaderTimes() {
    const times = [];
    for (const time of scheduleTimes()) {
      times.push(<div>{time}:00</div>);
    }
    return times;
  }

  function scheduleTimesRow(role: string, time: number) {
    if (time >= 7 && time < 17) {
      for (let i = 0; i < schedules.length; i++) {
        if (role === schedules[i].employeeRole) {
          const shiftStart = Number(schedules[i].shiftStart.split(":")[0]);
          const shiftEnd = Number(schedules[i].shiftEnd.split(":")[0]);
          if (time >= shiftStart && time <= shiftEnd) {
            return (
              <p
                style={{
                  backgroundColor: "green",
                  width: "3em",
                  height: "100%",
                }}
              >
                {"_"}
              </p>
            );
          } else {
            return (
              <p
                style={{
                  backgroundColor: "red",
                  width: "3em",
                  height: "100%",
                }}
              >
                {"_"}
              </p>
            );
          }
        }
      }
    } else {
      for (let i = schedules.length - 1; i >= 0; i--) {
        if (role === schedules[i].employeeRole) {
          const shiftStart = Number(schedules[i].shiftStart.split(":")[0]);
          const shiftEnd = Number(schedules[i].shiftEnd.split(":")[0]);
          if (time >= shiftStart && time <= shiftEnd) {
            return (
              <p
                style={{
                  backgroundColor: "green",
                  width: "3em",
                  height: "100%",
                }}
              >
                {"_"}
              </p>
            );
          } else {
            return (
              <p
                style={{
                  backgroundColor: "red",
                  width: "3em",
                  height: "100%",
                }}
              >
                {"_"}
              </p>
            );
          }
        }
      }
    }
  }

  function scheduleRows() {
    const rows = [];
    const roles: string[] = [];
    for (const schedule of schedules) {
      if (!roles.includes(schedule.employeeRole)) {
        roles.push(schedule.employeeRole);
      }
    }
    for (let i = 0; i < roles.length; i++) {
      rows.push(
        <tr key={roles[i]}>
          <td>{roles[i]}</td>
          {scheduleTimes().map((time, index) => (
            <td key={index}>{scheduleTimesRow(roles[i], time)}</td>
          ))}
        </tr>
      );
    }
    return rows;
  }

  function scheduleTimeTable() {
    return (
      <table id="schedule_time_table">
        <thead>
          <tr>
            <th></th>
            {scheduleHeaderTimes().map((time, index) => (
              <th key={index}>{time}</th>
            ))}
          </tr>
        </thead>
        <tbody>{scheduleRows()}</tbody>
      </table>
    );
  }

  return (
    <>
      <h1>Schedules</h1>
      {scheduleTimeTable()}
    </>
  );
}
