import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/bookings"
    );

    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    const userBookings =
      response.data.filter(
        (booking) =>
          booking.userEmail ===
          currentUser.email
      );

    setBookings(userBookings);
  } catch (error) {
    console.log(error);
  }
};
  const clearBookings =
    async () => {
      alert(
        "Use Admin Bookings page to delete bookings"
      );
    };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <div className="card p-4 shadow text-center">
          <h4>No Bookings Found</h4>
        </div>
      ) : (
        bookings.map(
          (booking) => (
            <div
              key={
                booking._id
              }
              className="card shadow p-4 mb-3"
            >
              <h4 className="text-success">
                Booking Confirmed ✅
              </h4>

              <hr />

              <p>
                <strong>
                  Hotel:
                </strong>{" "}
                {
                  booking.hotel
                }
              </p>

              <p>
                <strong>
                  Room:
                </strong>{" "}
                {
                  booking.room
                }
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {
                  booking.status
                }
              </p>
            </div>
          )
        )
      )}

      <div className="text-center mt-4">
        <button
          className="btn btn-primary"
          onClick={() =>
            navigate(
              "/hotels"
            )
          }
        >
          Go Back To Home
        </button>
      </div>
    </div>
  );
}

export default MyBookings;