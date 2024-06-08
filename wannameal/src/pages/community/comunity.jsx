import React from "react";
import style from "./community.module.css";
import coverPhoto from "../../assets/Rectangle 2.png";
import profile from "../../assets/man-user.svg";
import { Link } from "react-router-dom";
import UserCard from "../../components/usercard/userCard";
export default function Comunity() {
  return (
    <div className={style.communityContainer}>
      <div className="container-lg ">
        <div className={style.Comunity}>
          <div className={`   ${style.leftAside}`}>
            <div className={style.userInfoCard}>
              <div className={style.userProfile}>
                <div className={style.coverPhoto}>
                  <img src={coverPhoto} alt="" srcset="" />
                </div>
                <div className={style.mainInfo}>
                  <div className={style.profileImage}>
                    <img src={profile} alt="profileImage" srcset="" />
                  </div>{" "}
                  <div className={style.name}>mahmoud khairy</div>{" "}
                  <div className={style.email}>mahmoudkhairy402</div>{" "}
                </div>
              </div>
              <div className={style.follwInfo}>
                <div className={style.follwing}>
                  <div className={style.followNum}>100</div>
                  <div className={style.followTitle}>following</div>
                </div>
                <div className={style.follwers}>
                  <div className={style.followNum}>100</div>
                  <div className={style.followTitle}>followers</div>
                </div>
              </div>
              <div className={style.profileLink}>
                <Link to="/profile">my profile</Link>
              </div>
            </div>
            <div className={style.followInfoCard}>
              <div className={style.title}>recommended for you</div>
              <div className={style.userCards}>
                <UserCard method="follow" />
                <UserCard method="follow" />
                <UserCard method="follow" />
                <UserCard method="follow" />
              </div>
              <div className={style.showMore}>
                <Link to="/community">Show more</Link>
              </div>
            </div>
          </div>
          <div className={`  ${style.mainContent}`}>
            <div className={style.uploadPost}>
              <div className={style.profileImage}>
                <img src={profile} alt="profileImage" srcset="" />
              </div>
              <form action="" className={style.postForm}>
                <input
                  type="text"
                  placeholder="Share what you want"
                  name="post"
                  value=""
                  id="post"
                />
              </form>
              <div className={style.btns}>
                <div className={style.upload}>photo</div>
                <div className={style.upload}>video</div>
              </div>
            </div>
          </div>
          <div className={`  ${style.rightAside}`}>
            {" "}
            <div className={style.followInfoCard}>
              <div className={style.title}>recommended for you</div>
              <div className={style.userCards}>
                <UserCard method="messge" />
                <UserCard method="messge" />
                <UserCard method="messge" />
                <UserCard method="messge" />
                <UserCard method="messge" />
                <UserCard method="messge" />
                <UserCard method="messge" />
              </div>
              <div className={style.showMore}>
                <Link to="/community">Show more</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
