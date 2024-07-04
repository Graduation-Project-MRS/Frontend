import React from "react";
import styles from "../Home/page.module.css";
import { getTheme } from "../../redux/slices/systemModeSlice";
import { useSelector } from "react-redux";
import FoodIngreientSlider from "../../components/FoodIngreientSlider/FoodIngreientSlider";
import MealsSlider from "../../components/mealsSlider/mealsSlider";
export default function MakeMeal() {
  const theme = useSelector(getTheme);
  return (
    <div
      className={
        theme === "dark" ? `py-5 w-100 ${styles.darkmodeChanges}` : "py-5 w-100"
      }
    >
      <div className="" style={{ height: "100vh" }}>
        <h1 className={`w-100 mx-auto text-center  ${styles.mainTitle}`}>
          Make Your <span>Own Meal</span>
        </h1>
        <FoodIngreientSlider />
        <MealsSlider />
      </div>
    </div>
  );
}
