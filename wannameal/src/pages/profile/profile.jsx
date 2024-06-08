// import "bootstrap/dist/js/bootstrap.min.js";
import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import MealCard from "../../components/mealCard/mealCard";
import "animate.css";
import Swal from "sweetalert2";

import { IoSettingsOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { IoLinkOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { GiHotMeal } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

function Portfolio() {
  const [systemlanguage, setsystemlanguage] = useState("english");
  console.log("🚀 ~ Portfolio ~ systemlanguage:", systemlanguage);
  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(window.location.href);

    // Function to update link state on popstate event (back/forward button)
    const handlePopState = () => {
      setLink(window.location.href);
    };

    // Listen for the popstate event (back/forward button)
    window.addEventListener("popstate", handlePopState);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  function copyLink() {
    navigator.clipboard.writeText(link);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Copied Successfully",
    });
  }
  const dispatch = useDispatch();
  let handleLogout = () => {
    Swal.fire({
      toast: true,
      position: "top-end",
      title: "Are you Sure you want to log out ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(236, 52, 52)",
      cancelButtonColor: "#3ac568",
      confirmButtonText: "Log Out",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        let timerInterval;
        Swal.fire({
          title: "Logging Out!",
          html: "",
          timer: 3000,
          timerProgressBar: true,

          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
      }
    });
  };

  return (
    <>
      <div className={`py-5 ${styles.portfolioContainer} `}>
        <div className="container-lg">
          <div className="row">
            <div className={`col-12 col-lg-9 ${styles.userData}`}>
              <div className={`${styles.image}`}>
                <img
                  style={{
                    borderRadius: "50%",
                  }}
                  src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400"
                  width={180}
                  height={180}
                  objectFit="cover"
                  alt="meal"
                />
              </div>
              <div className={`${styles.info} `}>
                <div className={`${styles.personalData}`}>
                  <div>
                    <div className={`${styles.userName}`}>
                      Badr abd elheleem ali
                    </div>
                    <div className={`${styles.acountName}`}>@Badr_Jr</div>
                  </div>
                  <div className={`${styles.followData}`}>
                    <span className={`${styles.followers}`}>1 followers </span>
                    <span className={`${styles.following}`}>1 following </span>
                  </div>
                </div>
                <div className={`${styles.btns}`}>
                  <Link to="/profile/edit">
                    <div
                      className={`${styles.btn}`}
                      style={{ minWidth: "130px" }}
                    >
                      Edit profile
                    </div>
                  </Link>
                  <div
                    data-bs-target="#invite"
                    data-bs-toggle="modal"
                    className={`${styles.btn}`}
                    style={{ minWidth: "130px" }}
                  >
                    Share profile
                  </div>
                  <div
                    className={`${styles.settingIcon}`}
                    data-bs-target="#exampleModalToggle"
                    data-bs-toggle="modal"
                    // onClick={() => {
                    //   console.log("🚀 ~ Portfolio ~ showOverlay:", showOverlay);
                    // }}
                  >
                    <IoSettingsOutline size={29} />
                  </div>
                  <div
                    class="modal fade"
                    id="exampleModalToggle"
                    aria-hidden="true"
                    aria-labelledby="exampleModalToggleLabel"
                    tabindex="-1"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1
                            class="modal-title5"
                            id="exampleModalToggleLabel"
                          ></h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body p-0">
                          <ul className={`${styles.settingUl} `}>
                            <li>
                              WannaMeaL{" "}
                              <span className={` ${styles.premium} `}>
                                premium
                              </span>
                            </li>
                            <li
                              data-bs-target="#country"
                              data-bs-toggle="modal"
                            >
                              Country
                            </li>
                            <li
                              data-bs-target="#language"
                              data-bs-toggle="modal"
                            >
                              language
                            </li>
                            <li data-bs-target="#invite" data-bs-toggle="modal">
                              Invite your friends to WannaMeaL{" "}
                            </li>
                            <li className="p-0">
                              <Link
                                to="/contact"
                                style={{
                                  padding: "15px",
                                  display: "block",
                                }}
                              >
                                contact us
                              </Link>
                            </li>
                            <li
                              data-bs-target="#logout"
                              data-bs-toggle="modal"
                              onClick={handleLogout}
                            >
                              log out
                            </li>
                          </ul>
                        </div>
                        <div class="modal-footer p-0 ">
                          <div
                            class="btn btn-danger w-100 h-0 m-0 rounded-0 "
                            data-bs-dismiss="modal"
                          >
                            Cancel
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="modal fade"
                    id="country"
                    aria-hidden="true"
                    aria-labelledby="exampleModalToggleLabel2"
                    tabindex="-1"
                  >
                    {/* start country modal  */}
                    <div class="modal-dialog modal-dialog-centered ">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1
                            class="modal-title fs-5"
                            id="exampleModalToggleLabel2"
                          >
                            مصر ام الدنيا
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body p-0"></div>
                        <div>
                          <button
                            class="btn btn-dark rounded-0 w-100"
                            data-bs-target="#exampleModalToggle"
                            data-bs-toggle="modal"
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* end country modal  */}
                  </div>
                  <div
                    class="modal fade"
                    id="language"
                    aria-hidden="true"
                    aria-labelledby="exampleModalToggleLabel2"
                    tabindex="-1"
                  >
                    {/* start country modal  */}
                    <div class="modal-dialog modal-dialog-centered ">
                      <div class="modal-content">
                        <button
                          type="button"
                          class="btn-close m-3 ms-auto "
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                        <div class="modal-body p-5 w-100  ">
                          <div className={`${styles.input} mb-3 `}>
                            <input
                              className={`${styles.checkbox}`}
                              type="checkbox"
                              id={`CheckboxEnglish`}
                              value="english"
                              checked
                              onChange={() => {
                                setsystemlanguage("english");
                              }}
                            />
                            <label
                              className={
                                systemlanguage === "english"
                                  ? `${styles.checkboxlabel} ${styles.checked}`
                                  : `${styles.checkboxlabel} `
                              }
                              htmlFor="CheckboxEnglish"
                            >
                              <div className="d-flex">
                                english
                                <FaCheckCircle
                                  className={`${styles.icon}`}
                                  size={25}
                                  style={{ marginLeft: "auto" }}
                                />
                              </div>
                            </label>
                          </div>
                          <div className={`${styles.input} mb-1 `}>
                            <input
                              className={`${styles.checkbox}`}
                              type="checkbox"
                              id={`CheckboxArabic`}
                              value="arabic"
                              checked
                              onChange={() => {
                                setsystemlanguage("arabic");
                              }}
                            />
                            <label
                              className={
                                systemlanguage === "arabic"
                                  ? `${styles.checkboxlabel} ${styles.checked}`
                                  : `${styles.checkboxlabel} `
                              }
                              htmlFor="CheckboxArabic"
                            >
                              <div className="d-flex">
                                arabic
                                <FaCheckCircle
                                  className={`${styles.icon}`}
                                  size={25}
                                  style={{ marginLeft: "auto" }}
                                />
                              </div>
                            </label>
                          </div>
                        </div>
                        <div>
                          <button
                            class="btn btn-dark rounded-0 w-100"
                            data-bs-target="#exampleModalToggle"
                            data-bs-toggle="modal"
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="modal fade"
                    id="invite"
                    aria-hidden="true"
                    aria-labelledby="exampleModalToggleLabel2"
                    tabindex="-1"
                  >
                    <div class="modal-dialog modal-dialog-centered ">
                      <div class="modal-content">
                        <button
                          type="button"
                          className="btn-close m-3 ms-auto mb-0"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                        <div className={` ${styles.inviteBody} `}>
                          <h6>
                            Send your personal page to your family and friends
                          </h6>
                          <div className={`${styles.links}`}>
                            <label htmlFor="linkField">
                              <IoLinkOutline size={26} />
                            </label>

                            <div className={`${styles.linkField}`}>
                              <input
                                type="text"
                                className={`${styles.linkField}`}
                                placeholder=""
                                value={link}
                                // onChange={(e) => setLink(e.target.value)}
                                id="linkField"
                              />
                            </div>
                            <div
                              className={`btn btn-primary ${styles.copy}`}
                              onClick={copyLink}
                            >
                              Copy
                            </div>
                          </div>
                        </div>
                        <div>
                          <button
                            class="btn btn-dark rounded-0 w-100"
                            data-bs-target="#exampleModalToggle"
                            data-bs-toggle="modal"
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={` ${styles.recipsContainer} `}>
            <div className={`  ${styles.labels}  `}>
              <div className={` ${styles.saved} ${styles.active} `}>
                <CiBookmark size={25} className={`${styles.icon}`} /> saved
                recipes{" "}
              </div>
              <div className={` ${styles.mine} `}>
                <GiHotMeal size={25} className={`${styles.icon}`} /> my recipes
              </div>
            </div>
            <div
              className={`row justify-content-center justify-content-md-between g-2 align-items-center ${styles.recipsContainer} `}
            >
              <MealCard className=" col-12 col-lg-3" />
              <MealCard className=" col-12 col-lg-3" />
              <MealCard className=" col-12 col-lg-3" />
              <MealCard className=" col-12 col-lg-3" />
              <MealCard className=" col-12 col-lg-3" />
              <MealCard className=" col-12 col-lg-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Portfolio;
