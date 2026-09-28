import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = () => {
    if (username === "admin" && password === "admin123") {
      navigate("/admin-dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "450px" }}
      >
        <h2 className="text-center mb-4">
          Admin Login
        </h2>

        <input
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-dark w-100"
          onClick={loginAdmin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;