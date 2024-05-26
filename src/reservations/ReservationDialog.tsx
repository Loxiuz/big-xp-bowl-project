import "./ReservationDialog.css";
import { Reservation } from "../services/types";
import ReservationList from "./ReservationsList";

export default function ReservationDialog(props: {
  reservations: Reservation[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const { reservations, isOpen, onClose } = props;

  return (
    <>
      {isOpen && (
        <dialog open>
          <ReservationList reservations={reservations} />
          <button onClick={onClose}>Close</button>
        </dialog>
      )}
    </>
  );
}
