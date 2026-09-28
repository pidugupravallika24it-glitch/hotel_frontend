import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();

  const hotel = location.state?.hotel;
  const room = location.state?.room;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [total, setTotal] = useState("");

  if (!hotel || !room) {
    return (
      <div className="container mt-5">
        <h2>Booking information not found</h2>
      </div>
    );
  }

  const calculatePrice = () => {
    if (!checkIn || !checkOut) {
      alert("Please select dates");
      return;
    }

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);

    const days =
      (outDate - inDate) / (1000 * 60 * 60 * 24);

    if (days <= 0) {
      alert("Check-out date must be after check-in date");
      return;
    }

    const pricePerNight = 5000;

    setTotal(days * pricePerNight);
  };

 const paymentPage = () => {
  if (!checkIn || !checkOut) {
    alert("Please select check-in and check-out dates");
    return;
  }

  if (!total) {
    alert("Please calculate the total price first");
    return;
  }

  navigate("/payment", {
    state: {
      hotel,
      room,
    },
  });
};

  return (
    <div className="container mt-5">
      <div
        className="card p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <h2>Book Room</h2>

        <h5>{hotel.name}</h5>
        <p>{room.name}</p>

        <label>Check In</label>
        <input
          type="date"
          className="form-control mb-3"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        <label>Check Out</label>
        <input
          type="date"
          className="form-control mb-3"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />

        <button
          className="btn btn-info mb-3"
          onClick={calculatePrice}
        >
          Calculate Price
        </button>

        <input
          className="form-control mb-3"
          value={total}
          placeholder="Total Price"
          readOnly
        />

        <button
          className="btn btn-success"
          onClick={paymentPage}
        >
          Proceed To Payment
        </button>
      </div>
    </div>
  );
}

export default Booking;