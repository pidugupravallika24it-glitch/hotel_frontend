import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import hotel1 from "../assets/hotel1.jpg";
import hotel2 from "../assets/hotel2.jpg";
import hotel3 from "../assets/hotel3.jpg";
import hotel4 from "../assets/hotel4.jpg";
import hotel5 from "../assets/hotel5.jpg";

function Hotels() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [hotels, setHotels] = useState([]);

  const hotelImages = [
    hotel1,
    hotel2,
    hotel3,
    hotel4,
    hotel5,
  ];

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/hotels"
      );

      const hotelsWithImages =
        response.data.map((hotel, index) => ({
          ...hotel,
          image:
            hotelImages[
              index % hotelImages.length
            ],
        }));

      setHotels(hotelsWithImages);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const viewHotel = (hotel) => {
    navigate("/hotel-details", {
      state: hotel,
    });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link
            className="navbar-brand fw-bold"
            to="/hotels"
          >
            BookMyStay
          </Link>

          <div>
            <Link
              to="/my-bookings"
              className="btn btn-light me-2"
            >
              My Bookings
            </Link>

            <Link
              to="/"
              className="btn btn-warning"
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* Heading */}
      <div className="container mt-5">
        <h1 className="text-center fw-bold mb-4">
          Available Hotels
        </h1>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search Hotels"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* Hotel Cards */}
        <div className="row g-4">
          {filteredHotels.map((hotel) => (
            <div
              className="col-md-4"
              key={hotel._id}
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={hotel.image}
                  className="card-img-top"
                  alt={hotel.name}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">
                  <h4>{hotel.name}</h4>

                  <p>
                    ⭐ {hotel.rating}
                  </p>

                  <p className="fw-bold text-success">
                    ₹{hotel.price} / Night
                  </p>

                  <p>
                    {hotel.description}
                  </p>

                  <button
                    className="btn btn-primary w-100"
                    onClick={() =>
                      viewHotel(hotel)
                    }
                  >
                    View Hotel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-3 mt-5">
        © 2026 BookMyStay
      </footer>
    </>
  );
}

export default Hotels;