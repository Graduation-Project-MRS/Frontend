import React from "react";
import style from "./aboutUs.module.css";

import { PiUsersThreeDuotone } from "react-icons/pi";
import { GiMeal } from "react-icons/gi";
import { MdDashboardCustomize } from "react-icons/md";
import { MdMoreTime } from "react-icons/md";
import { TbHealthRecognition } from "react-icons/tb";

export default function AboutUs() {
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column align-items-center
      justify-content-center"
    >
      <h1 className={`w-100 my-3 mx-auto text-center ${style.mainTitle}`}>
        About <span>Us</span>
      </h1>
      <div className="container-lg">
        <div
          className={`row p-0 my-3 d-flex flex-wrap w-100 justify-content-center justify-content-md-between align-items-center g-5`}
        >
          <div className=" col-12 col-md-6 d-flex">
            <div className={`${style.icon} col-1 me-4`}>
              <TbHealthRecognition color="#4ECB71" size={40} />
            </div>
            <div
              className={`${style.text} d-flex flex-column gap-2 align-content-center justify-content-start`}
            >
              <div className={style.title}>Healthy and Balanced Options</div>
              <div className={style.desc}>
                Our meals are crafted by nutritionists and chefs to ensure a
                perfect balance of taste and nutrition, helping you maintain a
                healthy lifestyle effortlessly.
              </div>
            </div>
          </div>
          <div className=" col-12 col-md-6 d-flex">
            <div className={`${style.icon} col-1 me-4`}>
              <TbHealthRecognition color="#4ECB71" size={40} />
            </div>
            <div
              className={`${style.text} d-flex flex-column gap-2 align-content-center justify-content-start`}
            >
              <div className={style.title}>Convenience</div>
              <div className={style.desc}>
                Enjoy the convenience of having gourmet, chef-prepared meals
              </div>
            </div>
          </div>
          <div className=" col-12 col-md-6 d-flex">
            <div className={`${style.icon} col-1 me-4`}>
              <MdMoreTime color="#4ECB71" size={40} />
            </div>
            <div
              className={`${style.text} d-flex flex-column gap-2 align-content-center justify-content-start`}
            >
              <div className={style.title}>Save time and eat well</div>
              <div className={style.desc}>
                Save your time thinking about what to make for food Enter for us
                what you own and we give the best healthy choices{" "}
              </div>
            </div>
          </div>
          <div className=" col-12 col-md-6 d-flex">
            <div className={`${style.icon} col-1 me-4`}>
              <MdDashboardCustomize color="#4ECB71" size={40} />
            </div>
            <div
              className={`${style.text} d-flex flex-column gap-2 align-content-center justify-content-start`}
            >
              <div className={style.title}>Customizable Meal Plans</div>
              <div className={style.desc}>
                Customizable Meal PlansWith a variety of meal plans tailored to
                different dietary needs and preferences, you can easily find the
                perfect plan that fits your lifestyle.
              </div>
            </div>
          </div>
          <div className=" col-12 col-md-6 d-flex">
            <div className={`${style.icon} col-1 me-4`}>
              <GiMeal color="#4ECB71" size={40} />
            </div>
            <div
              className={`${style.text} d-flex flex-column gap-2 align-content-center justify-content-start`}
            >
              <div className={style.title}>Expertly Crafted Recipes</div>
              <div className={style.desc}>
                Our professional chefs use their culinary expertise to create a
                diverse menu of flavorful meals that will keep your taste buds
                excited
              </div>
            </div>
          </div>
          <div className=" col-12 col-md-6 d-flex">
            <div className={`${style.icon} col-1 me-4`}>
              <PiUsersThreeDuotone color="#4ECB71" size={40} />
            </div>
            <div
              className={`${style.text} d-flex flex-column gap-2 align-content-center justify-content-start`}
            >
              <div className={style.title}>Community Focused</div>
              <div className={style.desc}>
                We have a community for users to share meals they made
                themselves and can like their posts and chat with each other
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
