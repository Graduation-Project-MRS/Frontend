// import { jwtDecode } from "jwt-decode";
import { curve, menuSlide, slide } from "./Animate";
import { AnimatePresence, motion } from "framer-motion";
import userImage from "../../assets/man-user.svg";
import Swal from "sweetalert2";
import React, { useMemo, useState } from "react";
import style from "./page.module.css";
import { Link, useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getuser, logout } from "../../redux/slices/authSlice";
import { IoNotificationsOutline } from "react-icons/io5";
import { getTheme, toggleTheme } from "../../redux/slices/systemModeSlice";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";

function Navbar() {
  const availableUser = useSelector(getuser);

  console.log("🚀 ~ Navbar ~ availableUser:", availableUser);
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  console.log("🚀 ~ Navbar ~ theme:", theme);

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

  // let decodedUser = null;
  // try {
  //   decodedUser = jwtDecode(availableUser.result);
  //   console.log("Decoded User:", decodedUser);
  // } catch (error) {
  //   console.error("Error decoding JWT token:", error);
  // }

  const location = useLocation();
  const path = location.pathname;

  const hide = useMemo(() => {
    if (
      path === "/accounting" ||
      path === "/verification" ||
      path === "/forgotPassword" ||
      path === "/reset" ||
      path.startsWith("/dashboard")
    ) {
      return true;
    } else {
      return false;
    }
  }, [path]);

  const [clicked, setClicked] = useState(false);

  const navItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Community",
      href: "/",
    },
    {
      title: "Demo",
      href: "/",
    },
    {
      title: "Contact",
      href: "/",
    },
  ];

  const toggletheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <>
      {!hide && (
        <nav className={`${style.nav} navbar navbar-expand-lg sticky-lg-top `}>
          <div className="container">
            <button
              class={style.leftBars}
              type=""
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRouting"
              aria-controls="offcanvasWithBothOptions"
            >
              <HiBars3 size={22} />
            </button>

            <Link className="" to="/">
              {theme === "light" ? (
                <div className={style.logoContainer}>
                  <img
                    src={require("../../assets/logoLight.png")}
                    alt=""
                    srcset=""
                  />
                </div>
              ) : (
                <div className={style.logoContainer}>
                  <img
                    src={require("../../assets/logoDark.png")}
                    alt=""
                    srcset=""
                  />
                </div>
              )}
            </Link>
            <button
              className={`${style.toggler} navbar-toggler`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className={` ${style.dragMenu} collapse navbar-collapse`}
              id="navbarSupportedContent"
            >
              <form className={`d-flex mx-auto ${style.navForm}`} role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search recipes"
                  aria-label="Search"
                />
                <div className={`${style.searchIcon}`}>
                  {" "}
                  <IoIosSearch size={20} />
                </div>
                {theme === "light" ? (
                  <div className={style.moon} onClick={toggletheme}>
                    <IoMoonOutline size={22} color="#fff" />
                  </div>
                ) : (
                  <div className={style.sun} onClick={toggletheme}>
                    <IoSunnyOutline size={22} color="#fff" />
                  </div>
                )}
              </form>

              <div className={` ${style.authBtns}`}>
                {availableUser ? (
                  <>
                    <div className={style.userData}>
                      <Link
                        className={` ${style.notification}`}
                        to="/community"
                      >
                        <IoNotificationsOutline
                          size={25}
                          className={style.icon}
                        />
                      </Link>
                      <Link
                        className={` ${style.userName}`}
                        title={availableUser?.data.userName}
                        to="/"
                      >
                        {availableUser?.data.userName}
                      </Link>
                      <Link className={` ${style.userImage}`} to="/profile">
                        <img
                          // src={userImage}
                          src={availableUser?.data.profileImage.url}
                          title={availableUser?.data.userName}
                          alt="user"
                          srcset=""
                        />
                      </Link>
                    </div>
                    {/* <div onClick={handleLogout} className={` ${style.logout}`}>
                      logout
                    </div> */}
                  </>
                ) : (
                  <>
                    <Link className={` ${style.register}`} to="/auth">
                      sign up
                    </Link>
                    <Link className={` ${style.login}`} to="/auth">
                      log in
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}

      {/*left aside  offcanvas */}
      <div
        className={`offcanvas offcanvas-start ${style.Aside}`}
        tabIndex={-1}
        id="offcanvasRouting"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          {theme === "light" ? (
            <div className={style.logoContainer}>
              <img
                src={require("../../assets/logoLight.png")}
                alt=""
                srcset=""
              />
            </div>
          ) : (
            <div className={style.logoContainer}>
              <img
                src={require("../../assets/logoDark.png")}
                alt=""
                srcset=""
              />
            </div>
          )}
        </div>
        <div className="offcanvas-body p-0">
          <div>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/community"}>Community</Link>
              </li>
              <li>
                <Link to={"/makeMeal"}>Make Meal</Link>
              </li>
              <li>
                <Link to={"/profile"}>My Profile</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact Us</Link>
              </li>
            </ul>

            <div className={style.logout} onClick={handleLogout}>
              logout
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
