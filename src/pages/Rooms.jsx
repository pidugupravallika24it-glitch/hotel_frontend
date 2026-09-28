import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Rooms() {
  const navigate = useNavigate();
  const location = useLocation();

  const hotel = location.state;

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/rooms"
      );

      setRooms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!hotel) {
    return (
      <div className="container mt-5">
        <h2>Hotel information not found</h2>
      </div>
    );
  }

  const bookRoom = (room) => {
    navigate("/booking", {
      state: {
        hotel,
        room,
      },
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-2">
        Available Rooms
      </h2>

      <h4 className="text-center mb-4">
        {hotel.name}
      </h4>

      <div className="row g-4">
        {rooms.map((room) => (
          <div
            className="col-md-4"
            key={room._id}
          >
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h4>{room.name}</h4>

                <p>
                  {room.guests} Guests
                </p>

                <p className="fw-bold text-success">
                  ₹{room.price}/Night
                </p>

                <button
                  className="btn btn-primary w-100"
                  onClick={() =>
                    bookRoom(room)
                  }
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;