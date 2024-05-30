import "./ReservationList.css";
import { Reservation } from "../services/types";
import { useNavigate } from "react-router-dom";

export default function ReservationList(props: {
  reservations: Reservation[];
}) {
  const { reservations } = props;
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Activity</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Participants</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation.id}>
            <td>{reservation.id}</td>
            <td>{reservation.activity}</td>
            <td>{reservation.activityStart.toString()}</td>
            <td>{reservation.activityEnd.toString()}</td>
            <td>{reservation.numberOfParticipants}</td>
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
