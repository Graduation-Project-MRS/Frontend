import React, { useMemo, useState } from "react";
import style from "./page.module.css";
import { Link, useLocation } from "react-router-dom";
import { curve, menuSlide, slide } from "./Animate";
import { AnimatePresence, motion } from "framer-motion";

function Navbar() {
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

  return (
    <>
      {!hide && (
        <AnimatePresence mode="wait" initial={false}>
          <div className="d-flex align-items-center w-100 justify-content-between" id={style.Header}>
            <Link to={'/'}>Fast Plat</Link>
            {/* burger menu  */}
            <div
              onClick={() => setClicked(!clicked)}
              className={`${style.toggle} ${clicked ? style.toggled : ""}`}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            {/* nav menu  */}
            {clicked ? (
              <motion.div
                animate='enter'
                exit='exit'
                initial='initial'
                variants={menuSlide}
                className={style.menu}>
                <div className={style.body}>
                  <div className={style.nav}>
                    <div className={style.header}>
                      <p>Navigation</p>
                    </div>
                    {navItems.map((data, index) => {
                      return (
                        <motion.div
                          key={index}
                          variants={slide}
                          custom={index}
                          initial="initial"
                          animate="enter"
                          exit="exit"
                          className={style.link}
                        >
                          <div

                            className={style.indicator}
                          ></div>
                          <Link data={{ ...data, index }} key={index} href={data.href}>{data.title}</Link>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className={style.footer}>
                    <Link href={''}>Github</Link>
                    <Link href={''}>Instagram</Link>
                    <Link href={''}>Dribble</Link>
                    <Link href={''}>LinkedIn</Link>
                  </div>
                </div>
                <svg className={style.svgCurve}>
                  <motion.path
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    variants={curve}
                    d="..."
                  ></motion.path>
                </svg>

              </motion.div>
            ) : (
              ""
            )}
          </div >
        </AnimatePresence>
      )
      }
    </>
  );
}

export default Navbar;
