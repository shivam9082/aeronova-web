import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProfile } from "../redux/slices/profileSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);

  const [editData, setEditData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    gender: user.gender || "",
    age: user.age || "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://localhost:3001"}/profile/upload-photo`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(setProfile({ ...user, photoUrl: res.data.photoUrl }));
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://localhost:3001"}/profile/edit`,
        editData,
        { withCredentials: true },
      );
      dispatch(setProfile(res.data.data));
      setMessage(res.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile");
      setMessage("");
    }
  };

  const profileImage =
    user.photoUrl ||
    "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-lg rounded-xl border border-blue-200 p-6">
        {/* Profile Image & Upload */}
        <div className="flex flex-col items-center justify-center mb-6 gap-3">
          <img
            src={profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-400 p-1 shadow-md object-cover"
          />
          <label className="btn btn-sm btn-outline btn-primary rounded-full cursor-pointer relative z-10 hover:shadow-lg transition">
            {uploading ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Uploading...
              </>
            ) : (
              "📷 Change Photo"
            )}
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handlePhotoUpload} 
              disabled={uploading}
            />
          </label>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

        {message && (
          <p className="text-green-500 text-center mb-2">{message}</p>
        )}
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="label">
              <span className="label-text font-medium">First Name</span>
            </label>
            <input
              type="text"
              name="firstName"
              className="input input-bordered w-full"
              value={editData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Last Name</span>
            </label>
            <input
              type="text"
              name="lastName"
              className="input input-bordered w-full"
              value={editData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Age */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Age</span>
            </label>
            <input
              type="number"
              name="age"
              className="input input-bordered w-full"
              value={editData.age}
              onChange={handleChange}
              min={18}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Gender</span>
            </label>
            <select
              name="gender"
              className="select select-bordered w-full"
              value={editData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full border-2 border-transparent hover:border-primary transition-all mt-2"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
