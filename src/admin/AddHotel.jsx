import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddHotel() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const addHotel = async () => {
    if (!name || !price || !description || !image) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/hotels",
        {
          name,
          rating: "⭐⭐⭐⭐ 4.5",
          price: `₹${price} / Night`,
          description,
          image,
        }
      );

      alert(response.data.message);

      navigate("/manage-hotels");
    } catch (error) {
      console.log(error);
      alert("Failed to Add Hotel");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card p-4 shadow mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <h2 className="text-center mb-4">
          Add Hotel
        </h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Hotel Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Price Per Night"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <textarea
          className="form-control mb-3"
          placeholder="Hotel Description"
          rows="3"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        ></textarea>

        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={handleImage}
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            className="img-fluid rounded mb-3"
            style={{
              height: "200px",
              objectFit: "cover",
            }}
          />
        )}

        <button
          className="btn btn-success"
          onClick={addHotel}
        >
          Add Hotel
        </button>
      </div>
    </div>
  );
}

export default AddHotel;