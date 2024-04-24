import DefaultDash from "./defaultDash/defaultDash";
import Ingredients from "./ingredients/ingredients";
import Users from "./users/users";
import Recipes from "./recipes/recipes";
import DashNav from "../../components/dashNav/dashNav";
import Sidebar from "../../components/sidebar/sidebar";
import { Route, Routes } from "react-router-dom";
import React from "react";

export default function Dashboard() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="d-flex flex-column w-100"
        style={{ background: "var(--body)" }}
      >
        <DashNav />
        <Routes>
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<DefaultDash />} />
        </Routes>
      </div>
    </div>
  );
}
