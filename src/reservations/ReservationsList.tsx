import "./ReservationList.css";
import { Reservation } from "../services/types";

export default function ReservationList(props: {
  reservations: Reservation[];
}) {
  const { reservations } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>Activity</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Participants</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation.id}>
            <td>{reservation.activity}</td>
            <td>{reservation.activityStart.toString()}</td>
            <td>{reservation.activityEnd.toString()}</td>
            <td>{reservation.numberOfParticipants}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
