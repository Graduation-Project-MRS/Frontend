import React, { useEffect, useState } from "react";

import styles from "./FoodIngreientSlider.module.css";
import { ingredients } from "./ingredients";
import "animate.css";
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

import { TiDelete } from "react-icons/ti";
import { RiDeleteBin2Line } from "react-icons/ri";

function FoodIngreientSlider() {
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState(ingredients);

  const handleCheckboxChange = (ingredient) => {
    setCheckedIngredients((prevIngredients) => {
      const isIngredientChecked = prevIngredients.some(
        (item) => item.id === ingredient.id
      );

      if (isIngredientChecked) {
        return prevIngredients.filter((item) => item.id !== ingredient.id);
      } else {
        return [...prevIngredients, ingredient];
      }
    });
    console.log(
      "🚀 ~ setCheckedIngredients ~ prevIngredients:",
      checkedIngredients
    );
  };

  useEffect(() => {
    const filtered = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredIngredients(filtered);
  }, [searchQuery, ingredients]);

  return (
    <>
      <div className="container my-4">
        <div className="row w-100 d-flex justify-content-between ">
          <form>
            <label
              className={`col-4 ${styles.label}`}
              htmlFor="ingredientSearch"
            >
              Choose your ingredients
            </label>
            <input
              className={`col-8 ${styles.searchinput}`}
              type="search"
              id="ingredientSearch"
              name="ingredientSearch"
              placeholder="search for your ingredients"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <div className={`${styles.checkedIngredients} my-2`}>
          {checkedIngredients.length !== 0 && (
            <div
              className={`${styles.deleteAllChecked} `}
              onClick={() => {
                setCheckedIngredients([]);
              }}
            >
              Reset({checkedIngredients.length}){" "}
              <RiDeleteBin2Line className="ms-1 " size={25} />
            </div>
          )}
          {checkedIngredients &&
            checkedIngredients.map((ingredient) => {
              return (
                <div
                  key={ingredient.id}
                  className={`${styles.checkedIngredient} animate__animated animate__bounceIn`}
                >
                  {ingredient.name}

                  <TiDelete
                    onClick={() => {
                      setCheckedIngredients(
                        checkedIngredients.filter(
                          (item) => item.id !== ingredient.id
                        )
                      );

                      console.log("deleted");
                      console.log(checkedIngredients);
                    }}
                    size={25}
                    className={`${styles.delete} rounded-1`}
                  />
                </div>
              );
            })}
        </div>

        <div className={`${styles.ingredients}`}>
          {filteredIngredients.length !== 0 ? (
            <Swiper
              modules={[FreeMode]}
              grabCursor={true}
              freeMode={true}
              spaceBetween={2}
              slidesPerView={8.5}
              breakpoints={{
                0: {
                  spaceBetween: 0,
                  slidesPerView: 3.2,
                },

                768: {
                  spaceBetween: 2,
                  slidesPerView: 4.2,
                },
                912: {
                  spaceBetween: 10,
                  slidesPerView: 5.4,
                },
                1024: {
                  spaceBetween: 10,
                  slidesPerView: 8.5,
                },
              }}
            >
              {filteredIngredients.map((ingredient) => (
                <SwiperSlide key={ingredient.id}>
                  <div className={styles.parentcheckbox}>
                    <input
                      type="checkbox"
                      id={`ingredientCheckbox_${ingredient.id}`}
                      checked={checkedIngredients.some(
                        (ele) => ele.id === ingredient.id
                      )}
                      onChange={() => handleCheckboxChange(ingredient)}
                    />
                    <label
                      className={
                        checkedIngredients.some(
                          (ele) => ele.id === ingredient.id
                        )
                          ? `${styles.ingredient} ${styles.checked}`
                          : `${styles.ingredient}`
                      }
                      htmlFor={`ingredientCheckbox_${ingredient.id}`}
                    >
                      <div className={styles.symbol}>
                        {String.fromCodePoint(parseInt(ingredient.hex, 16))}
                      </div>{" "}
                      <div className={styles.name}>{ingredient.name}</div>
                    </label>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <h1 className={styles.noMatch}>no matching ingredients ..!</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default FoodIngreientSlider;
