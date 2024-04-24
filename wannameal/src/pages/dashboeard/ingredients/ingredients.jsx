import React from "react";
import style from "./ingredients.module.css";
import Pagination from "../../../components/pagination/pagination";
export default function Ingredients() {
  const divs = Array.from({ length: 24 }, (_, index) => (
    <div
      key={index}
      className={`d-flex flex-column justify-content-center gap-3 ${style.ing_div}`}
    >
      <h1>🥩</h1>
      <p>Meat</p>
    </div>
  ));
  return (
    <div className="px-5 my-4">
      <div className={`${style.confirm_recipe}`}>
        <button className={style.confirm_btn}>add ingredient</button>
      </div>
      <div className="bg-body rounded-4 p-3">
        <div
          className="row m-3 pb-3 flex-wrap align-items-start justify-content-center"
          style={{ gap: "40px", borderBottom: "1px solid var(--text_black)" }}
        >
          {divs}
        </div>
        <Pagination />
      </div>
    </div>
  );
}
