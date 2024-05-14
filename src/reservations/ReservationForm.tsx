import "./ReservationForm.css";
import BookingCalendar from "./BookingCalendar";
import { Reservation } from "../services/types";
import { useState } from "react";

export default function ReservationForm() {
  const [reservationForm, setReservationForm] = useState<Reservation>({
    id: null,
    customerId: 0,
    diningTableId: 0,
    activity: "",
    noOfParticipants: 0,
    activityStart: null,
    activityEnd: null,
    creationDateTime: null,
  });

  function handleDateTimeSelected(date: Date) {
    console.log(`Date: ${date}`);
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setReservationForm({ ...reservationForm, [name]: value });
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    alert("Booking submitted");
  }

  return (
    <>
      <h2>Booking</h2>
      <form>
        <input
          type="radio"
          name="activity"
          value="bowling"
          onChange={handleFormChange}
        />{" "}
        Bowling
        <input
          type="radio"
          name="activity"
          value="airHockey"
          onChange={handleFormChange}
        />{" "}
        Air Hockey
        <label htmlFor="noOfParticipants">Number of Participants:</label>
        <input
          type="number"
          name="noOfParticipants"
          onChange={handleFormChange}
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
        <button onClick={handleSubmit}>Book</button>
      </form>
    </>
  );
}
