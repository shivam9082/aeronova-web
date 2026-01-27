import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";


const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    photoUrl: "",
    gender: "",
    age: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/signup",
        form,
        { withCredentials: true }
      );
      // 1️⃣ Dispatch user to redux
    dispatch(loginSuccess(res.data.data)); // <-- user data from backend

        // 2️⃣ Navigate to home
      navigate("/");


    } catch (err) {
      setError(err.response?.data || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>

          <form onSubmit={handleSignup} className="space-y-3 mt-4">
            <div className="flex gap-2">
              <input
                name="firstName"
                placeholder="First Name"
                className="input input-bordered w-full"
                onChange={handleChange}
                required
              />
              <input
                name="lastName"
                placeholder="Last Name"
                className="input input-bordered w-full"
                onChange={handleChange}
                required
              />
            </div>

            <input
              name="emailId"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              name="photoUrl"
              placeholder="Photo URL (optional)"
              className="input input-bordered w-full"
              onChange={handleChange}
            />

            <select
              name="gender"
              className="select select-bordered w-full"
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>

            <input
              name="age"
              type="number"
              placeholder="Age"
              className="input input-bordered w-full"
              onChange={handleChange}
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
              Signup
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-center mt-2">{error}</p>
          )}

          <p
            className="text-center mt-4 text-primary cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
