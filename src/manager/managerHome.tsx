import { Link } from "react-router-dom";

export default function ManagerHome() {
  return (
    <div>
      <h2>Manager</h2>
      <nav>
        <Link to="/manager/schedules">
          <button>Schedules</button>
        </Link>
        <Link to="/manager/product">
          <button>Products</button>
        </Link>
        <Link to="/manager/maintenance">
          <button>Maintenance</button>
        </Link>
      </nav>
    </div>
  );
}
