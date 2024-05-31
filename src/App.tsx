import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ReservationForm from "./reservations/ReservationForm";
import ManagerHome from "./manager/managerHome";
import ProductsList from "./products/ProductsList";
import ProductForm from "./products/ProductForm";
import EmployeeHome from "./employees/EmployeeHome";
import ReservationCalendar from "./reservations/ReservationCalendar";
import LanesAndAirTablesManagement from "./manager/LanesAndAirTablesManagement";
import EquipmentList from "./equipment/EquipmentList";
import ScheduleCalendar from "./employee_schedules/ScheduleCalendar";

function App() {
  return (
    <Routes>
      <Route path="*" element={<h2>Not Found</h2>} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/booking" element={<ReservationForm />} />
      <Route path="/employee" element={<EmployeeHome />} />
      <Route path="/employee/bookings" element={<ReservationCalendar />} />
      <Route path="/employee/bookings/edit" element={<ReservationForm />} />
      <Route path="/employee/sale" />
      <Route path="/manager" element={<ManagerHome />} />
      <Route path="/manager/schedules" element={<ScheduleCalendar />} />
      <Route path="/manager/products" element={<ProductsList />} />
      <Route path="/manager/products/create" element={<ProductForm />} />
      <Route path="/manager/products/:id/edit" element={<ProductForm />} />
      <Route
        path="/manager/maintenance"
        element={<LanesAndAirTablesManagement />}
      />
      <Route path="/operator" element={<EquipmentList />} />
    </Routes>
  );
}

export default App;
