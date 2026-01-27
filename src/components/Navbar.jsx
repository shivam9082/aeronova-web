import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get user from redux
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
          AeroNova
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
            <div className="flex items-center gap-2">
              <img
                src={profileImage}
                alt="profile"
                className="w-10 h-10 rounded-full border"
              />
              <span className="font-medium">
                Hello, {user.firstName}
              </span>
            </div>

            <button
              className="btn btn-outline btn-error"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
