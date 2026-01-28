import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/slices/authSlice";
import Body from "./components/Body";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
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

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch current user from backend on app load
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/profile/view`, {
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
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Layout routes with Navbar and Footer */}
          <Route element={<Body />}>
            <Route path="/" element={<Home />} />

            {/* Protected Profile routes */}
            <Route
              path="/profile/view"
              element={
                <ProtectedRoute>
                  <ViewProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/update-password"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />

            {/* Protected ADMIN Routes */}
            <Route
              path="/admin/products/create"
              element={
                <ProtectedRoute requiredRole="admin">
                  <CreateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/update/:productId"
              element={
                <ProtectedRoute requiredRole="admin">
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />

            <Route path="/products" element={<ViewAllProducts />} />
            <Route path="/products/:productId" element={<SingleProduct />} />

            {/* Info pages */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Route>

          {/* Auth routes without layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
