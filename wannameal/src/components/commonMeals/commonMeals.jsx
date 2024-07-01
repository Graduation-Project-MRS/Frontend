import React, { useEffect } from "react";
import style from "./commonMeals.module.css";
import MealCard from "../mealCard/mealCard";
import noMeals from "../../assets/nosavedmeals.gif";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../loading/loading";

import {
  fetchCommonMeals,
  getCommonMeals,
  getMealsError,
  getMealsStatus,
} from "../../redux/slices/recomendedMealsSlice";
import { getuser } from "../../redux/slices/authSlice";

export default function CommonMeals() {
  const commonMeals = useSelector(getCommonMeals);
  const mealsError = useSelector(getMealsError);
  console.log("🚀 ~ CommonMeals ~ mealsError:", mealsError);
  const mealsStatus = useSelector(getMealsStatus);
  console.log("🚀 ~ CommonMeals ~ commonMeals:", commonMeals);
  const availableUser = useSelector(getuser);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMeals = async () => {
      await dispatch(fetchCommonMeals({ token: availableUser.token }));
    };

    fetchMeals();
  }, [dispatch, availableUser.token]);

  return (
    <>
      <h1 className={`w-100 my-3 mx-auto text-center ${style.mainTitle}`}>
        Latest <span>recipes</span>
      </h1>
      <div className="container-lg">
        <div
          className={`row p-0 my-3 d-flex flex-wrap w-100 justify-content-center justify-content-md-between align-items-center ${style.recipsContainer}`}
        >
          {mealsStatus === "loading" ? (
            <Loading />
          ) : commonMeals && commonMeals.length > 0 ? (
            commonMeals.map((meal) => (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={meal.id}>
                <MealCard meal={meal} />
              </div>
            ))
          ) : (
            <div className="text-center w-100">
              <img src={noMeals} alt="No meals available" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
