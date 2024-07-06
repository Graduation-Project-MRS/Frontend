import React from "react";
import styles from "../Home/page.module.css";
import { getTheme } from "../../redux/slices/systemModeSlice";
import { useSelector } from "react-redux";
import FoodIngreientSlider from "../../components/FoodIngreientSlider/FoodIngreientSlider";
import MealsSlider from "../../components/mealsSlider/mealsSlider";
import { useTranslation } from "react-i18next";
export default function MakeMeal() {
  const theme = useSelector(getTheme);
  const { t } = useTranslation();
  const {
    make,
    meal,
  } = t('make');
  return (
    <div
      className={
        theme === "dark" ? `py-5 w-100 ${styles.darkmodeChanges}` : "py-5 w-100"
      }
    >
      <div className="" style={{ height: "100vh" }}>
        <h1 className={`w-100 mx-auto text-center  ${styles.mainTitle}`}>
          {make} <span>{meal}</span>
        </h1>
        <FoodIngreientSlider />
        <MealsSlider />
      </div>
    </div>
  );
}
