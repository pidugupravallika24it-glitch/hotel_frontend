import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

  useEffect(() => {
    const savedHotels =
      JSON.parse(localStorage.getItem("hotels")) || [];

    setHotels(savedHotels);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        Admin Dashboard
      </h2>

      {/* Dashboard Buttons */}
      <div className="row g-3">
        <div className="col-md-2">
          <button
            className="btn btn-success w-100"
            onClick={() => navigate("/add-hotel")}
          >
            Add Hotel
          </button>
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-primary w-100"
            onClick={() => navigate("/manage-hotels")}
          >
            Manage Hotels
          </button>
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-warning w-100"
            onClick={() => navigate("/manage-rooms")}
          >
            Manage Rooms
          </button>
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-dark w-100"
            onClick={() => navigate("/users")}
          >
            Users
          </button>
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-info w-100"
            onClick={() =>
              navigate("/admin-bookings")
            }
          >
            Bookings
          </button>
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-danger w-100"
            onClick={() => navigate("/admin")}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="row mt-5 g-4">
        <div className="col-md-4">
          <div className="card text-center shadow p-4">
            <h5>Total Hotels</h5>
            <h2 className="text-primary">
              {hotels.length}
            </h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow p-4">
            <h5>Total Users</h5>
            <h2 className="text-success">
              {users.length}
            </h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow p-4">
            <h5>Total Bookings</h5>
            <h2 className="text-danger">
              {bookings.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="card mt-5 shadow p-4">
        <h4 className="mb-3">
          Recent Bookings
        </h4>

        {bookings.length === 0 ? (
          <p>No bookings available</p>
        ) : (
          <ul className="list-group">
            {bookings
              .slice(-5)
              .reverse()
              .map((booking) => (
                <li
                  key={booking.id}
                  className="list-group-item"
                >
                  <strong>{booking.hotel}</strong>
                  {" - "}
                  {booking.room}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;