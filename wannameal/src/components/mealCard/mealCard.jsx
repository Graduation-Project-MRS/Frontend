import React from "react";
import styles from "./mealcard.module.css";
import { IoTime } from "react-icons/io5";
import { BsFire } from "react-icons/bs";
import { GiCookingPot } from "react-icons/gi";
import { CiBookmark } from "react-icons/ci";
function MealCard() {
  return (
    <>
      <div className={`${styles.mealCard}`}>
        <div className={`${styles.imageContainer}`}>
          <img
            src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600"
            objectFit="cover"
            alt="meal"
          />
        </div>
        <div className={`${styles.bookmark}`}>
          <CiBookmark size={35} color="#fff" />
        </div>
        <div className={`${styles.mealInfo}`}>
          <div className={`${styles.mealRates}`}>
            <div className={`${styles.time}`}>
              <IoTime size={25} color="#4CAF50" />
              <span>60</span>Minutes
            </div>
            <div className={`${styles.interacts}`}>
              <BsFire size={25} color="#4CAF50" />
              <span>600</span>
            </div>
            <div className={`${styles.components}`}>
              <GiCookingPot size={25} color="#4CAF50" /> <span>9</span>{" "}
              Components
            </div>
          </div>
          <h4 className={`${styles.description}`}>لحم بقطع البطاطس والبصل</h4>
        </div>
      </div>
    </>
  );
}

export default MealCard;
