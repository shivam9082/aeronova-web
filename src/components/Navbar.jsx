import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const validCartItems = cartItems.filter((item) => item && item.product && item.product._id);
  const totalCartItems = validCartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });

      // Clear redux state after successful logout
      dispatch(logout());

      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);

      // Even if API fails, clear redux to be safe
      dispatch(logout());
      navigate("/login");
    }
  };

  const profileImage =
    user?.photoUrl ||
    "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";

  return (
    <div className="navbar bg-gray-900 shadow-md px-6 relative z-50">
      {/* Logo */}
      <div className="flex-1">
        <span
          className="text-xl font-bold cursor-pointer text-white"
          onClick={() => navigate("/")}
        >
          AeroNova 🚀
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <button
              className="btn btn-outline border-white text-white hover:bg-white hover:text-gray-900"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </>
        ) : (
          <>
            {/* Greeting */}
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-sm text-gray-300">Hi,</span>
              <span className="text-sm font-semibold text-white">
                {user.firstName}
              </span>
            </div>

            {/* Cart Button */}
            <button
              className="btn btn-ghost btn-circle mr-2 hover:bg-gray-800 transition"
              onClick={() => navigate("/cart")}
              title="View Cart"
            >
              <div className="indicator pt-1 pr-1">
                <span className="text-2xl">🛒</span>
                {totalCartItems > 0 && (
                  <span className="badge badge-sm indicator-item badge-primary border-none shadow-md font-bold">
                    {totalCartItems}
                  </span>
                )}
              </div>
            </button>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary transition"
              >
                <div className="w-10 rounded-full">
                  <img src={profileImage} alt="profile" />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="
                  dropdown-content
                  mt-4
                  w-56
                  rounded-xl
                  bg-gray-800
                  shadow-xl
                  border border-gray-700
                  p-3
                  space-y-1
                  z-[100]
                "
              >
                {/* Admin-only link */}
                {user.role === "admin" && (
                  <>
                    <li>
                      <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-yellow-900/30 text-yellow-400 font-semibold transition"
                      >
                        🛡️ Admin Dashboard
                      </button>
                    </li>
                    <div className="divider my-1 bg-gray-700" />
                  </>
                )}

                <li>
                  <button
                    onClick={() => navigate("/profile/view")}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-300 transition"
                  >
                    👤 View Profile
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => navigate("/profile/edit")}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-300 transition"
                  >
                    ✏️ Edit Profile
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => navigate("/profile/update-password")}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-300 transition"
                  >
                    🔒 Update Password
                  </button>
                </li>

                <div className="divider my-1 bg-gray-700" />

                <li>
                  <button
                    onClick={() => navigate("/about")}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-300 transition"
                  >
                    ℹ️ About Us
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => navigate("/contact")}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-300 transition"
                  >
                    📧 Contact Us
                  </button>
                </li>

                <div className="divider my-1 bg-gray-700" />

                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-900/20 transition"
                  >
                    🚪 Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
