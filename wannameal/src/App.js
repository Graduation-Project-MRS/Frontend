import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/contact/contact";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import AddProduct from "./pages/addProduct/addProduct";
import Dashboard from "./pages/dashboeard/dashboard";
import Profile from "./pages/profile/profile";
import EditProfile from "./pages/profile/edit/editProfile";
import Auth from "./pages/Auth/Auth";
import Chatting from "./pages/chatting/chatting";
import Community from "./pages/community/comunity";
import Navbar from "./components/navbar/navbar";
//!
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "./redux/slices/authSlice";
let authorized = false;
console.log("🚀 ~ authorized:", authorized);
function App() {
  const availableUser = useSelector(getuser);
  console.log("🚀 ~ App ~ availableUser:", availableUser);
  if (availableUser?.success) {
    authorized = true;
  } else authorized = false;

  return (
    <>
      <Navbar />
      <Routes>
        {["/", "home"].map((x, ind) => (
          <Route path={x} key={ind} element={<Home />} />
        ))}
        <Route
          path="/contact"
          element={authorized ? <ContactUs /> : <Auth />}
        />
        <Route
          path="/recipeDetails"
          element={authorized ? <RecipeDetails /> : <Auth />}
        />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route
          path="/dashboard/*"
          element={authorized ? <Dashboard /> : <Auth />}
        />
        <Route path="/auth/*" element={<Auth />} />
        <Route
          path="/profile/*"
          element={authorized ? <Profile /> : <Auth />}
        />
        <Route
          path="/profile/edit/"
          element={authorized ? <EditProfile /> : <Auth />}
        />
        <Route
          path="/community"
          element={authorized ? <Community /> : <Auth />}
        />
        <Route path="/community/chat" element={<Chatting />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
}

export default App;
