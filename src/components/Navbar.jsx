import { useState, useRef, useEffect } from "react";
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

  // Custom Dropdown State Handling
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (path) => {
    setIsDropdownOpen(false);
    navigate(path);
  };

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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary transition"
              >
                <div className="w-10 rounded-full">
                  <img src={profileImage} alt="profile" />
                </div>
              </button>

              {isDropdownOpen && (
                <ul
                  className="
                    absolute
                    right-0
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
                          onClick={() => handleNavClick("/admin/dashboard")}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-yellow-900/30 text-yellow-400 font-semibold transition w-full text-left"
                        >
                          🛡️ Admin Dashboard
                        </button>
                      </li>
                      <div className="divider my-1 bg-gray-700" />
                    </>
                  )}

                  <li>
                    <button
                      onClick={() => handleNavClick("/profile/view")}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-300 transition w-full text-left"
                    >
                      👤 View Profile
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => handleNavClick("/profile/edit")}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-300 transition w-full text-left"
                    >
                      ✏️ Edit Profile
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => handleNavClick("/profile/update-password")}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-300 transition w-full text-left"
                    >
                      🔒 Update Password
                    </button>
                  </li>

                  <div className="divider my-1 bg-gray-700" />

                  <li>
                    <button
                      onClick={() => handleNavClick("/about")}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-300 transition w-full text-left"
                    >
                      ℹ️ About Us
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => handleNavClick("/contact")}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-300 transition w-full text-left"
                    >
                      📧 Contact Us
                    </button>
                  </li>

                  <div className="divider my-1 bg-gray-700" />

                  <li>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-900/20 transition w-full text-left"
                    >
                      🚪 Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
