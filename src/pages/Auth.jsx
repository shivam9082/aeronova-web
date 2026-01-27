import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  // common
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  // signup-only
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  // ---------------- LOGIN ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        { emailId, password },
        { withCredentials: true }
      );

      console.log("Login success", res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  // ---------------- SIGNUP ----------------
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
          photoUrl,
          gender,
          age,
        },
        { withCredentials: true }
      );

      console.log("Signup success", res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">
            {isLogin ? "Login" : "Create Account"}
          </h2>

          {/* ---------------- LOGIN FORM ---------------- */}
          {isLogin && (
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
                  hover:shadow-lg
                  hover:shadow-primary/40
                  transition-all duration-300
                "
              >
                Login
              </button>
            </form>
          )}

          {/* ---------------- SIGNUP FORM ---------------- */}
          {!isLogin && (
            <form onSubmit={handleSignup} className="space-y-3 mt-4">
              <div className="flex gap-2">
                <input
                  className="input input-bordered w-full"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  className="input input-bordered w-full"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

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

              <input
                placeholder="Photo URL (optional)"
                className="input input-bordered w-full"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />

              <select
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input
                type="number"
                placeholder="Age"
                className="input input-bordered w-full"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />

              <button
                type="submit"
                className="
                  btn btn-primary w-full
                  border-2 border-transparent
                  hover:border-primary
                  hover:shadow-lg
                  hover:shadow-primary/40
                  transition-all duration-300
                "
              >
                Signup
              </button>
            </form>
          )}

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <p
            className="text-center mt-4 cursor-pointer text-primary hover:underline"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin
              ? "New user? Create an account"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
