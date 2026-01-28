import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/slices/authSlice";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// Profile components
import ViewProfile from "./components/ViewProfile";
import EditProfile from "./components/EditProfile";
import UpdatePassword from "./components/UpdatePassword";
import CreateProduct from "./pages/CreateProduct";
import ViewAllProducts from "./pages/ViewAllProducts";
import SingleProduct from "./pages/SingleProduct";
import UpdateProduct from "./pages/UpdateProduct";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch current user from backend on app load
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/profile/view", {
          withCredentials: true,
        });
        dispatch(loginSuccess(res.data));
      } catch (err) {
        // User not logged in or session expired - no action needed
        console.log("Not logged in");
      }
    };

    fetchCurrentUser();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Profile routes */}
        <Route path="/profile/view" element={<ViewProfile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/profile/update-password" element={<UpdatePassword />} />

        {/* ADMIN */}
        <Route path="/admin/products/create" element={<CreateProduct />} />
        <Route
          path="/admin/products/update/:productId"
          element={<UpdateProduct />}
        />

        <Route path="/products" element={<ViewAllProducts />} />
        <Route path="/products/:productId" element={<SingleProduct />} />

        {/* Info pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
