import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/contact/contact";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import AddProduct from "./pages/addProduct/addProduct";
import Dashboard from "./pages/dashboeard/dashboard";
import Profile from "./pages/profile/profile";
import EditProfile from "./pages/profile/edit/editProfile";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        {["/", "home"].map((x, ind) => (
          <Route path={x} key={ind} element={<Home />} />
        ))}
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/recipeDetails" element={<RecipeDetails />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit/" element={<EditProfile />} />
      </Routes>
    </>
  );
}

export default App;
