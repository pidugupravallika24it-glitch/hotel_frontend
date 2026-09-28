import { useState, useEffect } from "react";
import axios from "axios";

function ManageHotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/hotels"
      );

      setHotels(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHotel = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/hotels/${id}`
      );

      setHotels(
        hotels.filter(
          (hotel) => hotel._id !== id
        )
      );

      alert("Hotel Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to Delete Hotel");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        Manage Hotels
      </h2>

      {hotels.length === 0 ? (
        <div className="alert alert-info">
          No Hotels Found
        </div>
      ) : (
        <div className="row g-4">
          {hotels.map((hotel) => (
            <div
              className="col-md-4"
              key={hotel._id}
            >
              <div className="card shadow">
                {hotel.image && (
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="card-img-top"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                )}

                <div className="card-body">
                  <h4>{hotel.name}</h4>

                  <p>{hotel.description}</p>

                  <p className="text-success fw-bold">
                    {hotel.price}
                  </p>

                  <button
                    className="btn btn-danger w-100"
                    onClick={() =>
                      deleteHotel(hotel._id)
                    }
                  >
                    Delete Hotel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageHotels;