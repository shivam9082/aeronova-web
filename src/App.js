import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// Profile components
import ViewProfile from "./components/ViewProfile";
import EditProfile from "./components/EditProfile";
import UpdatePassword from "./components/UpdatePassword";


function App() {
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
