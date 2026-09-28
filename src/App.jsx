import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import MyBookings from "./pages/MyBookings";
import HotelDetails from "./pages/HotelDetails";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddHotel from "./admin/AddHotel";
import ManageHotels from "./admin/ManageHotels";
import ManageRooms from "./admin/ManageRooms";
import Users from "./admin/Users";
import Bookings from "./admin/Bookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/hotels" element={<Hotels />} />

  <Route
    path="/hotel-details"
    element={<HotelDetails />}
  />

  <Route path="/rooms" element={<Rooms />} />
  <Route path="/booking" element={<Booking />} />
  <Route path="/payment" element={<Payment />} />
  <Route
    path="/my-bookings"
    element={<MyBookings />}
  />
  <Route
  path="/admin"
  element={<AdminLogin />}
/>

<Route
  path="/admin-dashboard"
  element={<AdminDashboard />}
/>
<Route path="/admin" element={<AdminLogin />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />
<Route path="/add-hotel" element={<AddHotel />} />
<Route path="/manage-hotels" element={<ManageHotels />} />
<Route path="/manage-rooms" element={<ManageRooms />} />
<Route path="/users" element={<Users />} />
<Route
  path="/admin-bookings"
  element={<Bookings />}
/>
</Routes>
    </BrowserRouter>
  );
}

export default App;