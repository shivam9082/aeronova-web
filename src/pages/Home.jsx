import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../redux/slices/authSlice";
import { setProfile } from "../redux/slices/profileSlice";

const Home = () => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.user);
  const profileUser = useSelector((state) => state.profile.user);

  useEffect(() => {
    const fetchUserOnRefresh = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/profile/view",
          { withCredentials: true }
        );

        // store user in redux
        dispatch(loginSuccess(res.data));
        dispatch(setProfile(res.data));
      } catch (err) {
        console.log("User not logged in");
      }
    };

    if (!authUser || !profileUser) {
      fetchUserOnRefresh();
    }
  }, [authUser, profileUser, dispatch]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">Welcome to AeroNova 🚀</h1>
      <p className="mt-2 text-gray-500">
        Products will be displayed here
      </p>
    </div>
  );
};

export default Home;
