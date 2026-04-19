import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetUrl, setResetUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResetUrl("");

    try {
      const res = await axios.post(`${API_URL}/auth/forgot-password`, { emailId });
      if (res.data.resetUrl) {
        setResetUrl(res.data.resetUrl);
      } else {
        // Email not found — show generic message (security)
        setResetUrl("none");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Forgot Password 🔑</h2>
          <p className="text-center text-gray-500 text-sm mt-1">
            Enter your registered email to get a password reset link.
          </p>

          {/* Success — show reset link */}
          {resetUrl && resetUrl !== "none" && (
            <div className="mt-4 space-y-3">
              <div className="alert alert-success">
                <span>✅ Reset link generated! Click below to reset your password.</span>
              </div>
              <a
                href={resetUrl}
                className="btn btn-primary w-full"
              >
                🔒 Reset My Password
              </a>
              <p className="text-xs text-gray-400 text-center">
                This link expires in 1 hour.
              </p>
            </div>
          )}

          {/* Email not found — generic message */}
          {resetUrl === "none" && (
            <div className="alert alert-info mt-4">
              <span>📧 If this email is registered, a reset link has been generated.</span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="alert alert-error mt-4">
              <span>❌ {error}</span>
            </div>
          )}

          {/* Form — hide after success */}
          {!resetUrl && (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <input
                type="email"
                placeholder="Your registered email"
                className="input input-bordered w-full"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Generating link…
                  </>
                ) : (
                  "Get Reset Link"
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

export default ForgotPassword;
