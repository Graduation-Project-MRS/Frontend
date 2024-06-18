import React from "react";
import styles from "./mealsslider.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  FreeMode,
} from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import MealCard from "../mealCard/mealCard";

import { useSelector } from "react-redux";
import { getRecommendMeals } from "../../redux/slices/recomendedMealsSlice";
import Loading from "../loading/loading";

function MealsSlider() {
  const recomendedMeals = useSelector(getRecommendMeals);
  console.log("🚀 ~ MealsSlider ~ recomendedMeals:", recomendedMeals);
  const loading = useSelector((state) => state.meals.loading);
  const error = useSelector((state) => state.meals.error);

  if (loading)
    return (
      <div className="w-100 d-flex justify-content-center align-items-center">
        <Loading />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mb-3">
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={2.75}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },

          768: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          912: {
            slidesPerView: 1.7,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2.75,
            spaceBetween: 40,
          },
        }}
      >
        {recomendedMeals?.map((meal, index) => (
          <SwiperSlide key={index}>
            <MealCard meal={meal} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MealsSlider;
