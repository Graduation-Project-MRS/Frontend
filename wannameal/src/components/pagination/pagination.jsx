import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import style from "./pagination.module.css";
export default function Pagination() {
  return (
    <div
      className={`d-flex justify-content-between align-items-center ${style.pagination_div}`}
    >
      <p className="fw-bold m-0">
        Total users :<span className="ps-2">98</span>
      </p>
      <div className="d">
        <nav aria-label="Page navigation example">
          <ul className="pagination d-flex gap-2">
            <li className={style.number_btn}>
              <button className="" aria-label="Previous">
                <FaArrowLeft />
              </button>
            </li>
            <li className={style.number_btn}>
              <button className="">1</button>
            </li>
            <li className={style.number_btn}>
              <button className="">2</button>
            </li>
            <li className={style.number_btn}>
              <button className="">3</button>
            </li>
            <li className={style.number_btn}>
              <button className="" aria-label="Next">
                <FaArrowRight />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
