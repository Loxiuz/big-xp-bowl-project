import "./ReservationForm.css";
import BookingCalendar from "./BookingCalendar";
import { Customer, Reservation } from "../services/types";
import { useState } from "react";
import CustomerForm from "../customers/CustomerForm";
import BowlLanes from "../activities/BowlLanes";
import AirTables from "../activities/AirTables";
import { lanesTables } from "../services/LaneTableApi";

export default function ReservationForm() {
  const [customerForm, setCustomerForm] = useState<Customer>({
    id: null,
    fullName: "",
    email: "",
    phone: "",
    birthDate: null,
  });
  const [reservationForm, setReservationForm] = useState<Reservation>({
    id: null,
    customerId: null,
    diningTableId: null,
    activity: "",
    noOfParticipants: 0,
    activityStart: null,
    activityEnd: null,
    creationDateTime: null,
  });

  function handleDateTimeSelected(date: Date) {
    console.log(`Date: ${date}`);
  }

  function handleReservationFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setReservationForm({ ...reservationForm, [name]: value });
  }

  function handleCustomerFormChange(customer: Customer) {
    setCustomerForm(customer);
  }

  function handleLanesChange(lanes: number[]) {
    console.log("Selected lanes", lanes);
  }

  function handleAirTablesChange(tables: number[]) {
    console.log("Selected tables", tables);
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
        </div>
        <CustomerForm onChange={handleCustomerFormChange} />
        <button onClick={handleSubmit}>Book</button>
      </form>
    </>
  );
}
