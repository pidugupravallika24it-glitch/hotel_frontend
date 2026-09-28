import { useState, useEffect } from "react";
import axios from "axios";

function ManageRooms() {
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

  const deleteRoom = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/rooms/${id}`
      );

      setRooms(
        rooms.filter(
          (room) => room._id !== id
        )
      );

      alert("Room Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to Delete Room");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="mb-4">
          Manage Rooms
        </h2>

        {rooms.length === 0 ? (
          <p>No Rooms Found</p>
        ) : (
          rooms.map((room) => (
            <div
              key={room._id}
              className="border p-3 mb-3 rounded"
            >
              <h5>{room.name}</h5>

              <p>
                Guests: {room.guests}
              </p>

              <p>
                Price: ₹{room.price}
              </p>

              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteRoom(room._id)
                }
              >
                Delete Room
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageRooms;