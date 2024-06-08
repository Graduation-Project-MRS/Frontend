import React from "react";
import style from "./usercard.module.css";
import profile from "../../assets/man-user.svg";
export default function UserCard({ method }) {
  return (
    <div className={style.cardContainer}>
      <div className={style.image}>
        <img src={profile} alt="profile photo" />
      </div>
      <div className={style.text}>
        <div className={style.name}>mahmoud</div>
        <div className={style.email}>khairy402</div>
      </div>
      <div className={`btn ${style.btn}`}>{method}</div>
    </div>
  );
}
