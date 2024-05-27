import { useEffect, useState } from "react";
import "./BookingCalendar.css";
import { BookingCalendarProps, Reservation } from "../services/types";
import { getReservations } from "../services/ReservationApi";
import { getEquipment } from "../services/EquipmentApi";

export default function BookingCalendar(props: BookingCalendarProps) {
  const { defaultMonth, defaultYear } = props;
  const [selectedMonth, setSelectedMonth] = useState<number>(defaultMonth);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [totalStandardLanes, setTotalStandardLanes] = useState<number>(0);
  const [totalJuniorLanes, setTotalJuniorLanes] = useState<number>(0);
  const [totalAirHockeyTables, setTotalAirHockeyTables] = useState<number>(0);
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

  useEffect(() => {
    const fetchEquipment = async () => {
      const equipment = await getEquipment();
      // Initialize available lanes and tables
      let airHockeyTables = 0;
      let standardLanes = 0;
      let juniorLanes = 0;

      // Set available lanes and tables based on equipment
      if (equipment.length) {
        for (const item of equipment) {
          if (item.name === "air_hockey_table") {
            airHockeyTables = item.quantity;
          } else if (item.name === "standard_lane") {
            standardLanes = item.quantity;
          } else if (item.name === "junior_lane") {
            juniorLanes = item.quantity;
          }
        }
      }

      // Update state
      setTotalAirHockeyTables(airHockeyTables);
      setTotalStandardLanes(standardLanes);
      setTotalJuniorLanes(juniorLanes);
    };
    fetchEquipment();
  }, [setTotalAirHockeyTables, setTotalStandardLanes, setTotalJuniorLanes]);

  function monthDays() {
    const date = new Date(defaultYear, selectedMonth, 1);
    const days = [];

    while (date.getMonth() === selectedMonth) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }

    return days;
  }

  function availableLanes(bowlRes: Reservation[]) {
    let standardLanes = totalStandardLanes;
    let juniorLanes = totalJuniorLanes;
    for (const res of bowlRes) {
      standardLanes -= res.numberOfStandardLanes;
      juniorLanes -= res.numberOfJrLanes;
    }
    return { standardLanes, juniorLanes };
  }

  function availableTables(hockeyRes: Reservation[]) {
    let airHockeyTables = totalAirHockeyTables;
    for (const res of hockeyRes) {
      airHockeyTables -= res.numberOfAirTables;
    }
    return airHockeyTables;
  }

  function weekDayRowsBtns(time: string) {
    const hour = parseInt(time.split(":")[0]);
    const activityBtns = (date: number) => {
      if (reservations.length) {
        const bowlRes = reservations.filter((res) => {
          const activityStartDate = new Date(res.activityStart);
          return (
            res.activity === "bowling" &&
            activityStartDate.getMonth() === selectedMonth &&
            activityStartDate.getDate() === date &&
            activityStartDate.getHours() === hour
          );
        });
        const hockeyRes = reservations.filter((res) => {
          const activityStartDate = new Date(res.activityStart);
          return (
            res.activity === "airHockey" &&
            activityStartDate.getMonth() === selectedMonth &&
            activityStartDate.getDate() === date &&
            activityStartDate.getHours() === hour
          );
        });

        return (
          <td key={date}>
            <button
              className="activityBtn"
              style={{
                backgroundColor:
                  reservations.length &&
                  bowlRes.length &&
                  availableLanes(bowlRes).standardLanes +
                    availableLanes(bowlRes).juniorLanes ===
                    0
                    ? "red"
                    : "green",
              }}
              onClick={(e) => {
                e.preventDefault();
                props.handleAvailableStandardLanes(
                  availableLanes(bowlRes).standardLanes
                );
                props.handleAvailableJuniorLanes(
                  availableLanes(bowlRes).juniorLanes
                );
                props.handleActivityDateTime(
                  "bowling",
                  new Date(defaultYear, selectedMonth, date, hour)
                );
              }}
            >
              B
            </button>
            <button
              className="activityBtn"
              style={{
                backgroundColor:
                  reservations.length &&
                  hockeyRes.length &&
                  availableTables(hockeyRes) === 0
                    ? "red"
                    : "green",
              }}
              onClick={(e) => {
                e.preventDefault();
                props.handleAvailableAirHockeyTables(
                  availableTables(hockeyRes)
                );
                props.handleActivityDateTime(
                  "airHockey",
                  new Date(defaultYear, selectedMonth, date, hour)
                );
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
        {weekDayRowsBtns(time)}
      </tr>
    ));
  }

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
