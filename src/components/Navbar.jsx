import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const profileImage =
    user?.photoUrl ||
    "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";

  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      {/* Logo */}
      <div className="flex-1">
        <span
          className="text-xl font-bold cursor-pointer"
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
              className="btn btn-outline btn-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </>
        ) : (
          <>
            {/* Greeting */}
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-sm text-gray-500">Hi,</span>
              <span className="text-sm font-semibold text-gray-800">
                {user.firstName}
              </span>
            </div>

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
                  bg-base-100
                  shadow-xl
                  border border-base-200
                  p-3
                  space-y-1
                "
              >
                <li>
                  <button
                    onClick={() => navigate("/profile/view")}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200 transition"
                  >
                    👤 View Profile
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => navigate("/profile/edit")}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200 transition"
                  >
                    ✏️ Edit Profile
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => navigate("/profile/update-password")}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200 transition"
                  >
                    🔒 Update Password
                  </button>
                </li>

                <div className="divider my-1" />

                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-error hover:bg-error/10 transition"
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
