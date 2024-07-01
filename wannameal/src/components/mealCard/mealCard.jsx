import React from "react";
import styles from "./mealcard.module.css";
import { IoTime } from "react-icons/io5";
import { BsFire } from "react-icons/bs";
import { GiCookingPot } from "react-icons/gi";
import { CiBookmark } from "react-icons/ci";
import { Link } from "react-router-dom";
function MealCard({ meal }) {
  return (
    <>
      <Link to={`/recipeDetails/${meal?.index}`}>
        <div className={`${styles.mealCard}`}>
          <div className={`${styles.imageContainer}`}>
            <img
              src={meal?.image?.url}
              id={meal?.image.id}
              objectFit="cover"
              alt={`meal ${meal?.name}`}
              loading="lazy"
            />
          </div>
          <div className={`${styles.bookmark}`}>
            <CiBookmark size={35} color="#fff" />
          </div>
          <div className={`${styles.mealInfo}`}>
            <div className={`${styles.mealRates}`}>
              <div className={`${styles.time}`}>
                <IoTime size={25} color="#4CAF50" />
                <span>{meal?.prep_time}</span>Minutes
              </div>
              <div className={`${styles.interacts}`}>
                <BsFire size={25} color="#4CAF50" />
                <span>{meal?.calories}</span>
              </div>
              <div className={`${styles.components}`}>
                <GiCookingPot size={25} color="#4CAF50" />{" "}
                <span>{meal?.ingredients?.split(",").length}</span> Components
              </div>
            </div>
            <h4 className={`${styles.description}`}>{meal?.recipeName}</h4>
          </div>
        </div>
      </Link>
    </>
  );
}

export default MealCard;
