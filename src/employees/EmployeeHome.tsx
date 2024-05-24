import { Link } from "react-router-dom";

export default function EmployeeHome() {
  return (
    <div>
      <h2>Employee</h2>
      <nav>
        <Link to="/employee/bookings">
          <button>Reservations</button>
        </Link>
      </nav>
    </div>
  );
}
