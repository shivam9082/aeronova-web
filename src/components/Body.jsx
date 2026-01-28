import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { loginSuccess } from "../redux/slices/authSlice";
import { setProfile } from "../redux/slices/profileSlice";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Body = () => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.user);
  const profileUser = useSelector((state) => state.profile.user);

  useEffect(() => {
    const fetchUserOnRefresh = async () => {
      try {
        const res = await axios.get("http://localhost:3000/profile/view", {
          withCredentials: true,
        });

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
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
