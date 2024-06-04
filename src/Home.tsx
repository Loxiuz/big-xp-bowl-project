import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div>
      <h2>Choose Purpose</h2>
      <button
        onClick={() => {
          nav("/booking");
        }}
      >
        Booking
      </button>
      <button
        onClick={() => {
          nav("/employee");
        }}
      >
        Employee
      </button>
      <button
        onClick={() => {
          nav("/manager");
        }}
      >
        Manager
      </button>
      <button
        onClick={() => {
          nav("/operator");
        }}
      >
        Operator
      </button>
    </div>
  );
}
