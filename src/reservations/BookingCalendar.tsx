import { useEffect, useState } from "react";
import "./BookingCalendar.css";
import { Reservation } from "../services/types";
import { getReservations } from "../services/ReservationApi";

export default function BookingCalendar(props: {
  defaultMonth: number;
  defaultYear: number;
}) {
  const { defaultMonth, defaultYear } = props;
  const [selectedMonth, setSelectedMonth] = useState<number>(defaultMonth);
  const [selectedDateTime, setSelectedDateTime] = useState<number[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const times = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await getReservations();
      setReservations(response);
    };
    fetchReservations();
  }, [setReservations]);

  function monthDays() {
    const date = new Date(defaultYear, selectedMonth, 1);
    const days = [];

    while (date.getMonth() === selectedMonth) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }

    return days;
  }

  function weekDayRowsBtns() {
    const activityBtns = (hours: number) => {
      if (reservations.length > 0) {
        const bowlRes = reservations.filter((res) => {
          const activityStartDate = new Date(res.activityStart);
          return (
            res.activity === "bowling" &&
            activityStartDate.getMonth() === selectedMonth &&
            activityStartDate.getDate() === date &&
            activityStartDate.getHours() === hours
          );
        });
        const hockeyRes = reservations.filter((res) => {
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
                  reservations.length && bowlRes.length ? "green" : "red",
              }}
              onClick={(e) => {
                if (bowlRes.length) {
                  setSelectedReservationOfDateTime(bowlRes);
                  handleActivityBtnClick(e);
                }
              }}
            >
              B
            </button>
            <button
              className="activityBtn"
              style={{
                backgroundColor:
                  reservations.length && hockeyRes.length ? "green" : "red",
              }}
              onClick={(e) => {
                if (hockeyRes.length) {
                  setSelectedReservationOfDateTime(hockeyRes);
                  handleActivityBtnClick(e);
                }
              }}
            >
              H
            </button>
          </td>
        );
      }
    };

    const btns = [];
    let i = 1;
    while (i <= monthDays().length) {
      btns.push(activityBtns(i));
      i++;
    }
    return btns;
  }

  function weekDayRows() {
    return times.map((time, i) => (
      <tr key={i}>
        <th className="weekDayRow">{time}</th>
        {weekDayRowsBtns()}
      </tr>
    ));
  }

  //   function getDayOfWeek(dayNumber: number) {
  //     return days[dayNumber];
  //   }

  function handleMonthSelected(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedMonth(parseInt(event.currentTarget.value));
  }

  return (
    <div id="bookingCalendar">
      <p>Booking Calendar:</p>
      <select
        name="selectMonth"
        id="monthSelect"
        onChange={handleMonthSelected}
        defaultValue={defaultMonth}
      >
        <option value={defaultMonth}>{months[defaultMonth]}</option>
        <option value={defaultMonth + 1}>{months[defaultMonth + 1]}</option>
      </select>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th id="timeTag">Time</th>
            {monthDays().map((day) => (
              <th className="monthDayColumn" key={day}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{weekDayRows()}</tbody>
      </table>
    </div>
  );
}
