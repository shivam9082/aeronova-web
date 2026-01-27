import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProfile } from "../redux/slices/profileSlice";

const ViewProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/profile/view", {
          withCredentials: true,
        });
        dispatch(setProfile(res.data));
      } catch (err) {
        setError(err.response?.data || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [dispatch]);

  if (loading)
    return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500 text-lg font-medium">{error}</p>
    );

  const profileImage =
    user.photoUrl ||
    "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-lg rounded-xl border border-blue-200 p-6">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-400 p-1 shadow-md"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">My Profile</h2>

        {/* Profile Details */}
        <div className="space-y-4">
          <div className="flex justify-between px-2 py-1 bg-blue-50 rounded-md">
            <span className="font-semibold text-blue-700">First Name:</span>
            <span>{user.firstName}</span>
          </div>
          <div className="flex justify-between px-2 py-1 bg-blue-50 rounded-md">
            <span className="font-semibold text-blue-700">Last Name:</span>
            <span>{user.lastName || "-"}</span>
          </div>
          <div className="flex justify-between px-2 py-1 bg-blue-50 rounded-md">
            <span className="font-semibold text-blue-700">Email:</span>
            <span>{user.emailId}</span>
          </div>
          <div className="flex justify-between px-2 py-1 bg-blue-50 rounded-md">
            <span className="font-semibold text-blue-700">Gender:</span>
            <span>{user.gender}</span>
          </div>
          {user.age && (
            <div className="flex justify-between px-2 py-1 bg-blue-50 rounded-md">
              <span className="font-semibold text-blue-700">Age:</span>
              <span>{user.age}</span>
            </div>
          )}
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="btn btn-outline btn-primary w-full mt-6 border-2 border-transparent hover:border-primary transition-all"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewProfile;
