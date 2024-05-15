import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ReservationForm from "./reservations/ReservationForm";
import ManagerHome from "./manager/managerHome";

function App() {
  return (
    <Routes>
      <Route path="*" element={<h2>Not Found</h2>} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/booking" element={<ReservationForm />} />
      <Route path="/employee" element={<h2>Employee</h2>} />
      <Route path="/employee/bookings/:id/edit" />
      <Route path="/employee/sale" />
      <Route path="/manager" element={<ManagerHome />} />
      <Route path="/manager/schedules" />
      <Route path="/manager/products" />
      <Route path="/manager/products/create" />
      <Route path="/manager/products/:id/edit" />
      <Route path="/manager/maintenance" />
      <Route path="/operator" element={<h2>Operator</h2>} />
      <Route path="/operator/equipment" />
    </Routes>
  );
}

export default App;
