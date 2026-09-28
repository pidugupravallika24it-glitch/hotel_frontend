import { useNavigate, useLocation } from "react-router-dom";

function HotelDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const hotel = location.state;

  if (!hotel) {
    return (
      <div className="container mt-5">
        <h2>No Hotel Data Found</h2>
      </div>
    );
  }

  const viewRooms = () => {
    navigate("/rooms", {
      state: hotel,
    });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2>{hotel.name}</h2>

        <p>{hotel.description}</p>

        <p>
          <strong>Rating:</strong> {hotel.rating}
        </p>

        <p>
          <strong>Price:</strong> {hotel.price}
        </p>

        <p>
          <strong>Facilities:</strong>{" "}
          {hotel.facilities}
        </p>

        <button
          className="btn btn-primary mt-3"
          onClick={viewRooms}
        >
          View Rooms
        </button>
      </div>
    </div>
  );
}

export default HotelDetails;