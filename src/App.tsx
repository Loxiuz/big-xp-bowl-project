import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import ReservationForm from "./reservations/ReservationForm";

function App() {
  return (
    <Routes>
      <Route path="*" element={<h2>Not Found</h2>} />
      <Route path="/home" element={<Home />} />
      <Route path="/booking" element={<ReservationForm />} />
      <Route path="/employee/bookings/:id/edit" />
      <Route path="/manager/schedules" />
      <Route path="/manager/products/create" />
      <Route path="/manager/products/:id/create" />
      <Route path="/manager/maintenance" />
      <Route path="/operator/equipment" />
    </Routes>
  );
}

export default App;
