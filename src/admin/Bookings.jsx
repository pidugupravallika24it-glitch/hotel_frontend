import { useState, useEffect } from "react";
import axios from "axios";

function Bookings() {
  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings =
    async () => {
      try {
        const response =
          await axios.get(
            "http://localhost:5000/api/bookings"
          );

        setBookings(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const deleteBooking =
    async (id) => {
      try {
        await axios.delete(
          `http://localhost:5000/api/bookings/${id}`
        );

        setBookings(
          bookings.filter(
            (booking) =>
              booking._id !== id
          )
        );

        alert(
          "Booking Deleted Successfully"
        );
      } catch (error) {
        console.log(error);
        alert(
          "Failed to Delete Booking"
        );
      }
    };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        All Bookings
      </h2>

      {bookings.length === 0 ? (
        <div className="alert alert-warning">
          No Bookings Available
        </div>
      ) : (
        <table className="table table-bordered table-striped shadow">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map(
              (
                booking,
                index
              ) => (
                <tr
                  key={
                    booking._id
                  }
                >
                  <td>
                    {index + 1}
                  </td>

                  <td>
                    {
                      booking.hotel
                    }
                  </td>

                  <td>
                    {
                      booking.room
                    }
                  </td>

                  <td>
                    {
                      booking.status
                    }
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteBooking(
                          booking._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Bookings;