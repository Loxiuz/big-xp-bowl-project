import "./ReservationForm.css";
import BookingCalendar from "./BookingCalendar";
import { Customer, Reservation } from "../services/types";
import { useState } from "react";
import CustomerForm from "../customers/CustomerForm";
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
  // const [availableDates, setAvailableDates] = useState<Date[]>([]);
  // const [availableTimes, setAvailableTimes] = useState<number[]>([]);

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
