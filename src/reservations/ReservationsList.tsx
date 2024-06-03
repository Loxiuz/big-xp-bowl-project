import "./ReservationList.css";
import { Reservation } from "../services/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUpdateReservation } from "../services/ReservationApi";

export default function ReservationList(props: {
  reservations: Reservation[];
}) {
  const { reservations } = props;
  const [reservationForDelete, setReservationForDelete] =
    useState<Reservation | null>(null);
  const navigate = useNavigate();

  async function handleDelete() {
    if (reservationForDelete) {
      const invalidReservation = { ...reservationForDelete, isValid: false };
      const response = await createUpdateReservation(invalidReservation);
      if (response) {
        alert("Reservation deleted successfully");
      } else {
        alert("Failed to delete reservation");
      }
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>CustId</th>
          <th>Activity</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Participants</th>
          <th>Standard Lanes</th>
          <th>Junior Lanes</th>
          <th>Air Hockey Tables</th>
          <th>Is Valid</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation.id}>
            <td>{reservation.id}</td>
            <td>{reservation.customerId}</td>
            <td>{reservation.activity}</td>
            <td>{reservation.activityStart.toString()}</td>
            <td>{reservation.activityEnd.toString()}</td>
            <td>{reservation.numberOfParticipants}</td>
            <td>{reservation.numberOfStandardLanes}</td>
            <td>{reservation.numberOfJrLanes}</td>
            <td>{reservation.numberOfAirTables}</td>
            <td>{reservation.isValid ? "Yes" : "No"}</td>
            <td>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/employee/bookings/edit", {
                    state: { reservation },
                  });
                }}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setReservationForDelete(reservation);
                  handleDelete();
                }}
              >
                X
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
