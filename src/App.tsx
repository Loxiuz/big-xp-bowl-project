import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ReservationForm from "./reservations/ReservationForm";
import ManagerHome from "./manager/managerHome";
import ProductsList from "./products/ProductsList";
import ProductForm from "./products/ProductForm";
import EmployeeHome from "./employees/EmployeeHome";
import ReservationCalendar from "./reservations/ReservationCalendar";

function App() {
  return (
    <Routes>
      <Route path="*" element={<h2>Not Found</h2>} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/booking" element={<ReservationForm />} />
      <Route path="/employee" element={<EmployeeHome />} />
      <Route path="/employee/bookings" element={<ReservationCalendar />} />
      <Route path="/employee/bookings/:id/edit" />
      <Route path="/employee/sale" />
      <Route path="/manager" element={<ManagerHome />} />
      <Route path="/manager/schedules" />
      <Route path="/manager/products" element={<ProductsList />} />
      <Route path="/manager/products/create" element={<ProductForm />} />
      <Route path="/manager/products/:id/edit" element={<ProductForm />} />
      <Route path="/manager/maintenance" element={<h2>Maintenance</h2>} />
      <Route path="/operator" element={<h2>Operator</h2>} />
      <Route path="/operator/equipment" />
    </Routes>
  );
}

export default App;
