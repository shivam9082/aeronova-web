import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice"; // <-- import action

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_URL}/login`,
        { emailId, password },
        { withCredentials: true },
      );

      // 🔥 IMPORTANT: use backend user directly
      const userData = res.data.data;

      dispatch(loginSuccess(userData));

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button
              type="submit"
              className="
                btn btn-primary w-full
                border-2 border-transparent
                hover:border-primary
                transition-all
              "
            >
              Login
            </button>
          </form>

          {error && (
            <div className="mt-2 text-center">
              <p className="text-red-500">{error}</p>
              <p
                className="text-sm text-primary cursor-pointer hover:underline mt-1"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot your password?
              </p>
            </div>
          )}

          <p
            className="text-center mt-4 text-primary cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            New user? Create an account
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
