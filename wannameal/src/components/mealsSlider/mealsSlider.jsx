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

function MealsSlider() {
  return (
    <div className="container">
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
        <SwiperSlide>
          <MealCard />
        </SwiperSlide>
        <SwiperSlide>
          <MealCard />
        </SwiperSlide>
        <SwiperSlide>
          <MealCard />
        </SwiperSlide>
        <SwiperSlide>
          <MealCard />
        </SwiperSlide>
        <SwiperSlide>
          <MealCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default MealsSlider;
