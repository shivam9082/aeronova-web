import { useState } from "react";
import axios from "axios";

const UpdatePassword = () => {
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/profile/update-password",
        passwordData,
        { withCredentials: true }
      );
      setMessage(res.data.message);
      setError("");
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (err) {
      setError(err.response?.data || "Failed to update password");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-lg">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Update Password</h2>

          {message && <p className="text-green-500 text-center mb-2">{message}</p>}
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              className="input input-bordered w-full"
              value={passwordData.oldPassword}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              className="input input-bordered w-full"
              value={passwordData.newPassword}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="btn btn-primary w-full border-2 border-transparent hover:border-primary transition-all"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
