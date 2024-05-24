import { useEffect, useState } from "react";
import "./ReservationCalendar.css";
import { getReservations } from "../services/ReservationApi";
import { Reservation } from "../services/types";

export default function ReservationCalendar() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await getReservations();
      setReservations(response);
    };
    fetchReservations();
  }, [setReservations]);

  useEffect(() => {
    console.log(reservations);
  }, [reservations]);

  function selectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedMonth(parseInt(e.target.value));
  }

  function dayRow(date: number) {
    const activityBtns = (hours: number) => {
      if (reservations.length > 0) {
        const bowlRes = reservations.find((res) => {
          const activityStartDate = new Date(res.activityStart);
          return (
            res.activity === "bowling" &&
            activityStartDate.getMonth() === selectedMonth &&
            activityStartDate.getDate() === date &&
            activityStartDate.getHours() === hours
          );
        });
        const hockeyRes = reservations.find((res) => {
          const activityStartDate = new Date(res.activityStart);
          return (
            res.activity === "airHockey" &&
            activityStartDate.getMonth() === selectedMonth &&
            activityStartDate.getDate() === date &&
            activityStartDate.getHours() === hours
          );
        });

        return (
          <td key={hours}>
            <button
              className="activityBtn"
              style={{
                backgroundColor:
                  reservations.length > 0 && bowlRes ? "green" : "red",
              }}
            >
              B
            </button>
            <button
              className="activityBtn"
              style={{
                backgroundColor:
                  reservations.length > 0 && hockeyRes ? "green" : "red",
              }}
            >
              H
            </button>
          </td>
        );
      }
    };

    const btns = [];
    let i = 17;
    while (i < 24) {
      btns.push(activityBtns(i));
      i++;
    }
    return btns;
  }

  function monthTable(month: number) {
    function getDaysOfMonth() {
      const weekDays: string[] = [];
      const date = new Date(2024, month, 1);

      while (date.getMonth() === month) {
        switch (date.getDay()) {
          case 0:
            weekDays.push("Sunday");
            break;
          case 1:
            weekDays.push("Monday");
            break;
          case 2:
            weekDays.push("Tuesday");
            break;
          case 3:
            weekDays.push("Wednesday");
            break;
          case 4:
            weekDays.push("Thursday");
            break;
          case 5:
            weekDays.push("Friday");
            break;
          case 6:
            weekDays.push("Saturday");
            break;
        }

        date.setDate(date.getDate() + 1);
      }

      return weekDays.map((day, i) => (
        <tr key={i}>
          <th className="weekDayRow">
            2024-{month + 1}-{i + 1}
            <br />
            {day}
          </th>
          {day !== "Sunday" && day !== "Saturday" && dayRow(i + 1)}
        </tr>
      ));
    }

    return (
      <>
        <table id="weekTable">
          <thead>
            <tr>
              <th>Time:</th>
              <th>17:00</th>
              <th>18:00</th>
              <th>19:00</th>
              <th>20:00</th>
              <th>21:00</th>
              <th>22:00</th>
              <th>23:00</th>
            </tr>
          </thead>
          <tbody>{getDaysOfMonth()}</tbody>
        </table>
      </>
    );
  }

  function monthSelect() {
    return (
      <>
        <select
          name="selectMonth"
          id="selectMonth"
          onChange={selectChange}
          defaultValue={`${new Date().getMonth()}`}
        >
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
      </>
    );
  }

  return (
    <div>
      <h2>Reservations</h2>
      {monthSelect()}
      <br />
      <br />
      {monthTable(selectedMonth)}
    </div>
  );
}
