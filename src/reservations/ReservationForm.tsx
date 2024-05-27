import "./ReservationForm.css";
import { Customer, Reservation } from "../services/types";
import React, { useEffect, useState } from "react";
import CustomerForm from "../customers/CustomerForm";
import BookingCalendar from "./BookingCalendar";

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
    numberOfStandardLanes: 0,
    numberOfJrLanes: 0,
    numberOfAirTables: 0,
    numberOfParticipants: 0,
    activityStart: new Date(),
    activityEnd: new Date(),
    creationDateTime: null,
  });
  const [diningSeatAmount, setDiningSeatAmount] = useState(0);
  const [availableStandardLanes, setAvailableStandardLanes] = useState(0);
  const [availableJuniorLanes, setAvailableJuniorLanes] = useState(0);
  const [availableAirHockeyTables, setAvailableAirHockeyTables] = useState(0);
  function handleReservationFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setReservationForm({ ...reservationForm, [name]: value });
  }

  function handleChosenActivityDateTime(activity: string, dateTime: Date) {
    setReservationForm((prevState) => ({
      ...prevState,
      activity: activity,
      activityStart: dateTime,
    }));
  }

  // useEffect(() => {
  //   if (reservationForm.activity === "bowling") {
  //     reservationForm.numberOfAirTables = 0;
  //   } else if (reservationForm.activity === "airHockey") {
  //     reservationForm.numberOfStandardLanes = 0;
  //     reservationForm.numberOfJrLanes = 0;
  //   }
  // });

  useEffect(() => {
    if (reservationForm.activity === "bowling") {
      setReservationForm((prevState) => ({
        ...prevState,
        numberOfAirTables: 0,
      }));
    } else if (reservationForm.activity === "airHockey") {
      setReservationForm((prevState) => ({
        ...prevState,
        numberOfStandardLanes: 0,
        numberOfJrLanes: 0,
      }));
    }
  }, [reservationForm.activity]);

  function handleCustomerFormChange(customer: Customer) {
    setCustomerForm(customer);
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

  useEffect(() => {
    console.log("Reservation form", reservationForm);
    console.log("Customer form", customerForm);
  });

  return (
    <>
      <h2>Booking</h2>
      <button onClick={handleSubmit}>Book</button>
      <BookingCalendar
        defaultYear={new Date().getFullYear()}
        defaultMonth={new Date().getMonth()}
        handleAvailableStandardLanes={setAvailableStandardLanes}
        handleAvailableJuniorLanes={setAvailableJuniorLanes}
        handleAvailableAirHockeyTables={setAvailableAirHockeyTables}
        handleActivityDateTime={handleChosenActivityDateTime}
      />
      <br />
      <form id="reservation-form">
        <div id="reservation-form-input">
          {reservationForm.activity === "bowling" && (
            <div>
              <h3>Bowling</h3>
              <p>
                {reservationForm.activityStart.getDate()}-
                {reservationForm.activityStart.getMonth() + 1}-
                {reservationForm.activityStart.getFullYear()}
              </p>
              <p>{reservationForm.activityStart.getHours()}:00</p>
              <label>
                Standard Lanes ({availableStandardLanes} available):{" "}
              </label>
              <input
                type="number"
                name="numberOfStandardLanes"
                onChange={handleReservationFormChange}
              />
              <label>Junior Lanes ({availableJuniorLanes} available): </label>
              <input
                type="number"
                name="numberOfJrLanes"
                onChange={handleReservationFormChange}
              />
            </div>
          )}
          {reservationForm.activity === "airHockey" && (
            <div>
              <h3>Air Hockey</h3>
              <p>
                {reservationForm.activityStart.getDate()}-
                {reservationForm.activityStart.getMonth() + 1}-
                {reservationForm.activityStart.getFullYear()}
              </p>
              <p>{reservationForm.activityStart.getHours()}:00</p>
              <label>
                Air Hockey Tables ({availableAirHockeyTables} available):{" "}
              </label>
              <input
                type="number"
                name="numberOfAirTables"
                onChange={handleReservationFormChange}
              />
            </div>
          )}
          <label htmlFor="noOfParticipants">Number of Participants:</label>
          <input
            type="number"
            name="numberOfParticipants"
            onChange={handleReservationFormChange}
          />
          <label htmlFor="diningSeatAmount">Dining Seat Amount:</label>
          <input
            type="number"
            name="diningSeatAmount"
            onChange={handleDiningSeatAmountChange}
          />
        </div>
        <CustomerForm onChange={handleCustomerFormChange} />
      </form>
    </>
  );
}
