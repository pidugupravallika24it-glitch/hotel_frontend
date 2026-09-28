import { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users"
      );

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        Registered Users
      </h2>

      {users.length === 0 ? (
        <div className="alert alert-warning">
          No Users Registered Yet
        </div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;