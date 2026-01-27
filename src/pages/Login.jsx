import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice"; // <-- import action

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "http://localhost:3000/login",
      { emailId, password },
      { withCredentials: true }
    );

    // Check if backend returns user info
    const userData = res.data.data;

    // Ensure it has required fields for Navbar
    const userForRedux = {
      firstName: userData.firstName || "User",
      lastName: userData.lastName || "",
      email: userData.email || emailId,
      photoUrl: userData.photoUrl || "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff",
      // add other fields if needed
    };

    // Dispatch user info to redux
    dispatch(loginSuccess(userForRedux));

    // Navigate to home after dispatch
    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
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

            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

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
            <p className="text-red-500 text-center mt-2">{error}</p>
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
