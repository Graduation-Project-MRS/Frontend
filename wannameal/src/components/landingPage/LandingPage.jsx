import React from "react";
import rec2 from "../../assets/Rectangle 2.png";
import rec3 from "../../assets/Rectangle 3.png";
import rec4 from "../../assets/Rectangle 4.png";
import rec5 from "../../assets/Rectangle 5.png";
import rec6 from "../../assets/Rectangle 6.png";
import rec7 from "../../assets/Rectangle 7.png";
import rec8 from "../../assets/Rectangle 8.png";
import rec9 from "../../assets/Rectangle 9.png";
import rec10 from "../../assets/Rectangle 10.png";
import { motion } from "framer-motion";
import styles from "./landing.module.css";
import { Link } from "react-router-dom";
export default function landingPage() {
  return (
    <div className={styles.homeContainer}>
      <div className={`container-lg m-0 p-0 `}>
        <div className="row ">
          <motion.div
            initial={{ x: -200, opacity: 0.3 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={`col-12 col-lg-6  ${styles.info}`}
          >
            <div className={styles.mainTitle}>
              <h1>Health Requires Healthy food</h1>
              <h3>Manage your recipes the easy way</h3>
            </div>
            <div className={styles.description}>
              <p>share recipes with your friends and discover new ones</p>
              <p>
                Know the parts of the meal and what it consists of and the
                components that each molecule contains.
              </p>
            </div>
            <Link to={"/makeMeal"} className={`btn ${styles.button}`}>
              Make a meal
            </Link>
          </motion.div>
          <div className={` col-lg-6 ${styles.images}`}>
            <motion.div
              initial={{ x: 600, scale: 0.5 }}
              animate={{ x: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className={` ${styles.imageCol}`}
            >
              <img
                src={rec10}
                width="100"
                height="100"
                alt="rectangle10"
                className={styles.image}
                objectFit="cover"
              />
            </motion.div>
            <motion.div
              initial={{ x: 600, scale: 0.5 }}
              animate={{ x: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              className={` ${styles.imageCol}`}
            >
              <img
                src={rec9}
                width="110"
                height="110"
                alt="rectangle10"
                className={styles.image}
                objectFit="cover"
              />
              <img
                src={rec8}
                width="110"
                height="110"
                alt="rectangle10"
                className={styles.image}
                objectFit="cover"
              />
            </motion.div>
            <motion.div
              initial={{ x: 600, scale: 0.5 }}
              animate={{ x: 0, scale: 1 }}
              transition={{ duration: 1 }}
              className={` ${styles.imageCol}`}
            >
              <img
                src={rec7}
                width="130"
                height="130"
                alt="rectangle10"
                className={styles.image}
                objectFit="cover"
              />{" "}
              <img
                src={rec6}
                width="130"
                height="130"
                alt="rectangle10"
                className={styles.image}
                objectFit="cover"
              />{" "}
              <img
                src={rec5}
                width="130"
                height="130"
                alt="rectangle10"
                className={styles.image}
                objectFit="cover"
              />
            </motion.div>
            <motion.div
              initial={{ x: 600, scale: 0.5 }}
              animate={{ x: 0, scale: 1 }}
              transition={{ duration: 1.2 }}
              className={` ${styles.imageCol}`}
            >
              <img
                src={rec4}
                width="150"
                height="150"
                alt="rectangle10"
                className={styles.image}
                objectFit="cover"
              />
              <img
                src={rec3}
                width="150"
                height="150"
                alt="rectangle10"
                className={styles.image}
                objectFit="cover"
              />
              <img
                src={rec2}
                width="150"
                height="150"
                alt="rectangle10"
                className={styles.image}
                objectFit="cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
