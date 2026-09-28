import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    if (!name || !email || !phone || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          phone,
          password,
        }
      );

      alert(response.data.message);
      navigate("/");
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="text-center text-success mb-2">
          Create Account
        </h2>

        <p className="text-center text-muted mb-4">
          Join us and start booking your perfect stay ✨
        </p>

        <input
          className="form-control mb-3"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="tel"
          className="form-control mb-3"
          placeholder="Phone Number"
          maxLength="10"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-success w-100"
          onClick={registerUser}
        >
          Register
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;