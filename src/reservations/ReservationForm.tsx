import "./ReservationForm.css";
import { Customer, Reservation } from "../services/types";
import React, { useEffect, useState } from "react";
import CustomerForm from "../customers/CustomerForm";
import BookingCalendar from "./BookingCalendar";
import { getDiningTables } from "../services/DiningTables";
import { createUpdateCustomer, getCustomers } from "../services/CustomerApi";
import { createUpdateReservation } from "../services/ReservationApi";
import { useLocation } from "react-router-dom";

const EMPTY_RESERVATION: Reservation = {
  id: null,
  customerId: null,
  diningTableId: null,
  activity: "",
  numberOfStandardLanes: 0,
  numberOfJrLanes: 0,
  numberOfAirTables: 0,
  numberOfParticipants: 0,
  activityStart: new Date("0001:01:01T00:00:00Z"),
  activityEnd: new Date("0001:01:01T00:00:00Z"),
  creationDateTime: null,
  isValid: false,
};

const EMPTY_CUSTOMER: Customer = {
  id: null,
  fullName: "",
  email: "",
  phoneNumber: "",
  birthDate: null,
};

export default function ReservationForm() {
  const [customerForm, setCustomerForm] = useState<Customer>(EMPTY_CUSTOMER);
  const [reservationForm, setReservationForm] =
    useState<Reservation>(EMPTY_RESERVATION);
  const [diningSeatAmount, setDiningSeatAmount] = useState(0);
  const [availableStandardLanes, setAvailableStandardLanes] = useState(0);
  const [availableJuniorLanes, setAvailableJuniorLanes] = useState(0);
  const [availableAirHockeyTables, setAvailableAirHockeyTables] = useState(0);
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      const reservation = {
        ...state.reservation,
        activityStart: new Date(state.reservation.activityStart),
        activityEnd: new Date(state.reservation.activityEnd),
      };
      setReservationForm(reservation);
      const fetchCustomers = async () => {
        const response = await getCustomers();
        const customer = response.find(
          (customer) => customer.id === reservation.customerId
        );
        if (customer) {
          setCustomerForm(customer);
        }
      };
      fetchCustomers();
    }
  }, [state]);

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

  useEffect(() => {
    if (diningSeatAmount > 0) {
      const fetchDiningTables = async () => {
        const response = await getDiningTables();
        const availableTable = response.find(
          (table) => table.numberOfSeats >= diningSeatAmount
        );
        if (availableTable) {
          setReservationForm((prevState) => ({
            ...prevState,
            diningTableId: availableTable.id,
          }));
        } else {
          setReservationForm((prevState) => ({
            ...prevState,
            diningTableId: null,
          }));
        }
      };
      fetchDiningTables();
    }
  }, [diningSeatAmount, setReservationForm]);

  useEffect(() => {
    if (reservationForm.activityStart !== new Date()) {
      const activityEnd = new Date(reservationForm.activityStart);
      activityEnd.setHours(activityEnd.getHours() + 1);
      setReservationForm((prevState) => ({
        ...prevState,
        activityEnd: activityEnd,
      }));
    }
  }, [reservationForm.activityStart]);

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

  async function handleCustomerFormChange(customer: Customer) {
    setCustomerForm(customer);
  }

  function handleDiningSeatAmountChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setDiningSeatAmount(parseInt(e.currentTarget.value));
  }

  /*
    Technically this function is not needed, 
    but it is a good practice to validate the inputs before submitting the form.
    Though right now it doesn't function correctly.

   */
  // function isActivityInputsValid() {
  //   if (reservationForm.activity === "bowling") {
  //     const standardLanesValid =
  //       reservationForm.numberOfStandardLanes > 0 &&
  //       reservationForm.numberOfStandardLanes <= availableStandardLanes;
  //     const juniorLanesValid =
  //       reservationForm.numberOfJrLanes > 0 &&
  //       reservationForm.numberOfJrLanes <= availableJuniorLanes;
  //     const totalLanesValid =
  //       reservationForm.numberOfStandardLanes +
  //         reservationForm.numberOfJrLanes <=
  //       4;

  //     return (standardLanesValid || juniorLanesValid) && totalLanesValid;
  //   } else if (reservationForm.activity === "airHockey") {
  //     return (
  //       reservationForm.numberOfAirTables > 0 &&
  //       reservationForm.numberOfAirTables <= availableAirHockeyTables &&
  //       reservationForm.numberOfAirTables <= 2
  //     );
  //   }
  //   return false;
  // }

  function isParticipantInputsValid() {
    return reservationForm.numberOfParticipants > 0;
  }

  function isCustomerInputsValid() {
    return (
      customerForm.fullName !== "" &&
      customerForm.email !== "" &&
      customerForm.phoneNumber !== "" &&
      customerForm.birthDate !== null
    );
  }

  async function getExistingCustomer() {
    const customers = await getCustomers();
    return customers.find(
      (customer) =>
        customer.fullName === customerForm.fullName &&
        customer.email === customerForm.email &&
        customer.phoneNumber === customerForm.phoneNumber &&
        customer.birthDate === customerForm.birthDate
    );
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    let customer = customerForm;
    if (isCustomerInputsValid()) {
      const existingCustomer = await getExistingCustomer();
      if (existingCustomer) {
        customer = existingCustomer;
      } else {
        customer = await createUpdateCustomer(customerForm);
      }
      if (customer) {
        const updatedReservationForm = {
          ...reservationForm,
          customerId: customer.id,
          isValid: true,
        };
        if (isParticipantInputsValid()) {
          const reservation = await createUpdateReservation(
            updatedReservationForm
          );
          if (reservation) {
            console.log("Submitting booking", reservation, customer);
            alert("Booking submitted");
            window.location.reload();
            return;
          } else {
            alert("Failed to create reservation. Booking not submitted");
            return;
          }
        } else {
          alert(
            "Reservation information (including tables/lanes or number of participants) is not valid. Booking not submitted"
          );
          return;
        }
      } else {
        alert("Failed to create customer. Booking not submitted");
        return;
      }
    } else {
      alert("Customer information is not valid. Booking not submitted");
      return;
    }
  }

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
              <p>
                {reservationForm.activityStart.getHours()}:00 -{" "}
                {reservationForm.activityEnd.getHours()}:00
              </p>
              <label>
                Standard Lanes ({availableStandardLanes} available):{" "}
              </label>
              <input
                type="number"
                name="numberOfStandardLanes"
                defaultValue={reservationForm.numberOfStandardLanes}
                onChange={handleReservationFormChange}
              />
              <label>Junior Lanes ({availableJuniorLanes} available): </label>
              <input
                type="number"
                name="numberOfJrLanes"
                defaultValue={reservationForm.numberOfJrLanes}
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
              <p>
                {reservationForm.activityStart.getHours()}:00 -{" "}
                {reservationForm.activityEnd.getHours()}:00
              </p>
              <label>
                Air Hockey Tables ({availableAirHockeyTables} available):{" "}
              </label>
              <input
                type="number"
                name="numberOfAirTables"
                defaultValue={reservationForm.numberOfAirTables}
                onChange={handleReservationFormChange}
              />
            </div>
          )}
          <label htmlFor="noOfParticipants">Number of Participants:</label>
          <input
            type="number"
            name="numberOfParticipants"
            defaultValue={reservationForm.numberOfParticipants}
            onChange={handleReservationFormChange}
          />
          <label htmlFor="diningSeatAmount">
            Dining Seat Amount (optional):
          </label>
          <input
            type="number"
            name="diningSeatAmount"
            onChange={handleDiningSeatAmountChange}
          />
        </div>
        <CustomerForm
          onChange={handleCustomerFormChange}
          customerToEdit={customerForm}
        />
      </form>
    </>
  );
}
