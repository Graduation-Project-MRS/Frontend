import React from "react";
import style from "./recipes.module.css";
import MealCard from "../../../components/mealCard/mealCard";
import Pagination from "../../../components/pagination/pagination";
import { Link } from "react-router-dom";
export default function Recipes() {
  const recipes = Array.from({ length: 6 }, (_, index) => (
    <div className="col-8 col-md-6 col-lg-4 col-lg-3 mb-4 d-flex flex-wrap justify-content-center align-items-center">
      <MealCard />
    </div>
  ));
  return (
    <div className="px-5 my-4">
      <div className={`${style.confirm_recipe}`}>
        <Link href={"/addProduct"}>
          <button className={style.confirm_btn}>add recipe</button>
        </Link>
      </div>
      <div
        className="row pb-3"
        style={{ borderBottom: "1px solid var(--text_black)" }}
      >
        {recipes}
      </div>
      <Pagination />
    </div>
  );
}
