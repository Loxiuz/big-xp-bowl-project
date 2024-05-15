import "./ReservationForm.css";
import BookingCalendar from "./BookingCalendar";
import { Customer, LaneTable, Reservation } from "../services/types";
import { useEffect, useState } from "react";
import CustomerForm from "../customers/CustomerForm";
import BowlLanes from "../activities/BowlLanes";
import AirTables from "../activities/AirTables";
import {
  // getLaneTableReservations,
  getLaneTables,
} from "../services/LaneTableApi";
// import { getReservations } from "../services/ReservationApi";

export default function ReservationForm() {
  const [customerForm, setCustomerForm] = useState<Customer>({
    id: null,
    fullName: "",
    email: "",
    phoneNumber: "",
    birthDate: null,
  });
  const [reservationForm, setReservationForm] = useState<Reservation>({
    id: null,
    customerId: null,
    diningTableId: null,
    activity: "",
    noOfParticipants: 0,
    activityStart: new Date(),
    activityEnd: new Date(),
    creationDateTime: null,
  });
  const [diningSeatAmount, setDiningSeatAmount] = useState(0);
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());
  const [selectedLanes, setSelectedLanes] = useState<number[]>([]);
  const [selectedTables, setSelectedTables] = useState<number[]>([]);
  const [lanesTables, setLanesTables] = useState<LaneTable[]>([]);
  // const [availableDates, setAvailableDates] = useState<Date[]>([]);
  // const [availableTimes, setAvailableTimes] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLaneTables();
      setLanesTables(response);
    };
    fetchData();
  }, [setLanesTables]);

  // useEffect(() => {
  //   const fetchLaneTableReservations = async () => {
  //     const response = await getLaneTableReservations();
  //     const reservationsRes = await getReservations();
  //     const dates = [];
  //     const times = [];
  //     if (
  //       response &&
  //       response.length > 0 &&
  //       reservationsRes &&
  //       reservationsRes.length > 0
  //     ) {
  //       for (let i = 0; i < dateTimes.length; i++) {
  //         if (
  //           i < reservationsRes.length &&
  //           dateTimes[i] !== reservationsRes[i].activityStart &&
  //           response[i].reservationId !== reservationsRes[i].id
  //         ) {
  //           dates.push(dateTimes[i]);
  //           times.push(dateTimes[i].getHours());
  //         }
  //       }
  //       setAvailableDates(dates);
  //       setAvailableTimes(times);
  //     }
  //   };
  //   fetchLaneTableReservations();
  // }, [setAvailableDates, setAvailableTimes]);

  // useEffect(() => {
  //   console.log("Available date times", availableDates, availableTimes);
  // });

  function handleDateTimeSelected(date: Date) {
    setSelectedDateTime(date);
    console.log(`Date: ${selectedDateTime}`);
  }

  function handleReservationFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setReservationForm({ ...reservationForm, [name]: value });
  }

  function handleCustomerFormChange(customer: Customer) {
    setCustomerForm(customer);
  }

  function handleLanesChange(lanes: number[]) {
    setSelectedLanes(lanes);
    console.log("Selected lanes", selectedLanes);
  }

  function handleAirTablesChange(tables: number[]) {
    setSelectedTables(tables);
    console.log("Selected tables", selectedTables);
  }

  function handleDiningSeatAmountChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setDiningSeatAmount(parseInt(e.currentTarget.value));
    console.log("Dining seat amount", diningSeatAmount);
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("Submitting booking", reservationForm, customerForm);
    alert("Booking submitted");
  }

  return (
    <>
      <h2>Booking</h2>
      <form id="reservation-form">
        <div id="reservation-form-input">
          <div id="reservation-radio">
            <input
              type="radio"
              name="activity"
              value="bowling"
              onChange={handleReservationFormChange}
            />{" "}
            Bowling
            <input
              type="radio"
              name="activity"
              value="airHockey"
              onChange={handleReservationFormChange}
            />{" "}
            Air Hockey
          </div>
          <label htmlFor="noOfParticipants">Number of Participants:</label>
          <input
            type="number"
            name="noOfParticipants"
            onChange={handleReservationFormChange}
          />
          <BookingCalendar
            availableDates={[
              new Date("2022-01-01"),
              new Date("2022-01-02"),
              new Date("2022-01-03"),
            ]}
            availableTimes={["10:00", "12:00", "14:00", "16:00"]}
            onDateTimeSelected={handleDateTimeSelected}
          />
          {reservationForm.activity === "bowling" && (
            <BowlLanes lanesTables={lanesTables} onChange={handleLanesChange} />
          )}
          {reservationForm.activity === "airHockey" && (
            <AirTables
              lanesTables={lanesTables}
              onChange={handleAirTablesChange}
            />
          )}
          <label htmlFor="diningSeatAmount">Dining Seat Amount:</label>
          <input
            type="number"
            name="diningSeatAmount"
            onChange={handleDiningSeatAmountChange}
          />
        </div>
        <CustomerForm onChange={handleCustomerFormChange} />
        <button onClick={handleSubmit}>Book</button>
      </form>
    </>
  );
}
