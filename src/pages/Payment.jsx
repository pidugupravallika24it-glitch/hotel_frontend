import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const hotel = location.state?.hotel;
  const room = location.state?.room;

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  if (!hotel || !room) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Payment information not found.
        </div>
      </div>
    );
  }

  const confirmBooking = async () => {
  if (!cardNumber || !cardHolder || !cvv) {
    alert("Please fill all payment details");
    return;
  }

  if (cardNumber.length !== 16) {
    alert("Card Number must be exactly 16 digits");
    return;
  }

  if (cvv.length !== 3) {
    alert("CVV must be exactly 3 digits");
    return;
  }

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  try {
    const response = await axios.post(
      "http://localhost:5000/api/bookings",
      {
        hotel: hotel.name,
        room: room.name,
        status: "Confirmed",
        userEmail: currentUser.email,
      }
    );

    alert(response.data.message);

    navigate("/my-bookings");
  } catch (error) {
    console.log(error);

    alert("Booking Failed");
  }
};

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4 text-primary">
          Payment Details
        </h2>

        <div className="mb-3">
          <strong>Hotel:</strong> {hotel.name}
        </div>

        <div className="mb-3">
          <strong>Room:</strong> {room.name}
        </div>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Card Number"
          maxLength="16"
          value={cardNumber}
          onChange={(e) =>
            setCardNumber(e.target.value)
          }
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Card Holder Name"
          value={cardHolder}
          onChange={(e) =>
            setCardHolder(e.target.value)
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="CVV"
          maxLength="3"
          value={cvv}
          onChange={(e) =>
            setCvv(e.target.value)
          }
        />

        <button
          className="btn btn-primary w-100"
          onClick={confirmBooking}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default Payment;