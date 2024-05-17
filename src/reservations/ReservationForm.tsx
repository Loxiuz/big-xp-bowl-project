import "./ReservationForm.css";
import BookingDateTimes from "./BookingDateTimes";
import { Customer, Equipment, Reservation } from "../services/types";
import { useEffect, useState } from "react";
import CustomerForm from "../customers/CustomerForm";
import { getReservations } from "../services/ReservationApi";
import { getEquipment } from "../services/EquipmentApi";

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
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());
  // Get initial value from equipment-------------------------------------
  const [equipment, setEquipment] = useState<Equipment[]>([]); //equipment available in the system
  const [availableAirHockeyTables, setAvailableAirHockeyTables] = useState(0); //amount of available air hockey tables
  const [availableStandardLanes, setAvailableStandardLanes] = useState(0); //amount of available lanes
  const [availableJuniorLanes, setAvailableJuniorLanes] = useState(0); //amount of available junior lanes
  //---------------------------------------------------------
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const reservationRes = await getReservations();
      const equipmentRes = await getEquipment();
      setReservations(reservationRes);
      setEquipment(equipmentRes);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Initialize available lanes and tables
    let airHockeyTables = 0;
    let standardLanes = 0;
    let juniorLanes = 0;

    // Set available lanes and tables based on equipment
    if (equipment && equipment.length > 0) {
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

    // Adjust available lanes and tables based on reservations
    if (reservations && reservations.length > 0) {
      for (const reservation of reservations) {
        const date = new Date(reservation.activityStart);
        if (
          date.getDate() === selectedDateTime.getDate() &&
          date.getHours() === selectedDateTime.getHours()
        ) {
          if (reservation.activity === "bowling") {
            standardLanes -= reservation.numberOfStandardLanes;
            juniorLanes -= reservation.numberOfJrLanes;
          } else if (reservation.activity === "airHockey") {
            airHockeyTables -= reservation.numberOfAirTables;
          }
        }
      }
    }

    // Update state
    setAvailableAirHockeyTables(airHockeyTables);
    setAvailableStandardLanes(standardLanes);
    setAvailableJuniorLanes(juniorLanes);
  }, [equipment, selectedDateTime, reservations]);

  function handleDateTimeSelected(date: Date) {
    setSelectedDateTime(date);
    console.log(`Date: ${selectedDateTime}`);
  }

  function handleReservationFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setReservationForm({ ...reservationForm, [name]: value });
  }

  useEffect(() => {
    if (reservationForm.activity === "bowling") {
      reservationForm.numberOfAirTables = 0;
    } else if (reservationForm.activity === "airHockey") {
      reservationForm.numberOfStandardLanes = 0;
      reservationForm.numberOfJrLanes = 0;
    }
  });

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
  });

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
            name="numberOfParticipants"
            onChange={handleReservationFormChange}
          />
          <BookingDateTimes
            availableDates={[
              new Date("2022-01-01"),
              new Date("2022-01-02"),
              new Date("2022-01-03"),
              new Date("2022-01-04"),
              new Date("2022-01-05"),
            ]}
            availableTimes={[
              "17:00",
              "18:00",
              "19:00",
              "20:00",
              "21:00",
              "22:00",
              "23:00",
            ]}
            onDateTimeSelected={handleDateTimeSelected}
          />
          {reservationForm.activity === "bowling" && (
            <div>
              <label htmlFor="numberOfLanes">
                Number of standard Lanes ({availableStandardLanes} available):
              </label>
              <input
                type="number"
                name="numberOfLanes"
                onChange={handleReservationFormChange}
              />
              <br />
              <label htmlFor="numberOfJrLanes">
                Number of junior Lanes ({availableJuniorLanes} available):
              </label>
              <input
                type="number"
                name="numberOfJrLanes"
                onChange={handleReservationFormChange}
              />
            </div>
          )}
          {reservationForm.activity === "airHockey" && (
            <div>
              <label htmlFor="numberOfAirTables">
                Number of Air Hockey Tables ({availableAirHockeyTables}{" "}
                available):
              </label>
              <input
                type="number"
                name="numberOfAirTables"
                onChange={handleReservationFormChange}
              />
            </div>
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
