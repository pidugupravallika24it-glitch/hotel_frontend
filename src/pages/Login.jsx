import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const loginUser = async () => {
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(response.data.user)
    );

    alert(response.data.message);

    navigate("/hotels");
  } catch (error) {
    alert("Invalid Email or Password");
  }
};

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <h2 className="text-center text-primary mb-2">
          BookMyStay
        </h2>

        <p className="text-center text-muted mb-4">
          Book your dream stay with ease 🏨
        </p>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={loginUser}
        >
          Login
        </button>

        <p className="text-center mt-3">
          New User? <Link to="/register">Register</Link>
        </p>

        <p className="text-center mt-2">
          <Link to="/admin">
            Login as Admin
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;