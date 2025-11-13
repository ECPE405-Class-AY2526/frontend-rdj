import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import "./styles/UserManagement.css";
import { API_BASE_URL } from "../config.js";
import BackgroundImage from "./images/background_img.png";

function UserManagement() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect if not admin
    if (!isAdmin) {
      navigate("/dashboard");
      return;
    }

    fetchUsers();
  }, [isAdmin, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/auth/users`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
      } else {
        setError(data.message || "Failed to fetch users");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
          const response = await fetch(`${API_BASE_URL}/api/auth/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update local state
        setUsers(
          users.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      } else {
        alert(data.message || "Failed to update role");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
          const response = await fetch(`${API_BASE_URL}/api/auth/users/${userId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setUsers(users.filter((u) => u._id !== userId));
      } else {
        alert(data.message || "Failed to delete user");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div
      className="user-management-wrapper"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="user-management-container">
        <header className="navbar">
          <div className="navbar-logo">RDJ</div>
          <nav className="navbar-links">
            <a href="/dashboard" className="navbar-link">
              Dashboard
            </a>
            <a href="/user-management" className="navbar-link active">
              User Management
            </a>
            <span className="navbar-user">Admin: {user?.email}</span>
          </nav>
        </header>

        <main className="user-management-content">
          <h1>User Management</h1>
          <p className="subtitle">Manage user accounts and roles</p>

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading">Loading users...</div>
          ) : (
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.email}</td>
                      <td>
                        <select
                          value={u.role}
                          onChange={(e) =>
                            handleRoleChange(u._id, e.target.value)
                          }
                          className="role-select"
                          disabled={u._id === user?.id}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td>
                        {u._id !== user?.id && (
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default UserManagement;
