import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new one.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (newPassword.length < 8) {
      return setError("Password must be at least 8 characters.");
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/auth/reset-password`, { token, newPassword });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body text-center space-y-4">
            <div className="text-6xl">🎉</div>
            <h2 className="text-2xl font-bold text-success">Password Reset!</h2>
            <p className="text-gray-500">
              Your password has been updated successfully.
            </p>
            <button
              className="btn btn-primary w-full"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Reset Password 🔒</h2>
          <p className="text-center text-gray-500 text-sm mt-1">
            Enter your new password below.
          </p>

          {error && (
            <div className="alert alert-error mt-4">
              <span>❌ {error}</span>
            </div>
          )}

          {token && (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {/* New Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="input input-bordered w-full pr-12"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {/* Confirm Password */}
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                className="input input-bordered w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <p className="text-xs text-gray-400">
                Must be at least 8 characters with uppercase, lowercase, number, and special character.
              </p>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Resetting…
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}

          <p
            className="text-center mt-4 text-primary cursor-pointer hover:underline text-sm"
            onClick={() => navigate("/login")}
          >
            ← Back to Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
