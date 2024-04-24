import React from "react";
import styles from "./contactUS.module.css";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { TiSocialLinkedin } from "react-icons/ti";
import "animate.css";
function ContactUs() {
  return (
    <div className={` ${styles.contactContainer} `}>
      <div
        className={`${styles.contact} animate__animated animate__backInRight container-lg`}
      >
        <div className={styles.title}>
          get in touch
        </div>
        <div
          className={`${styles.box} row justify-content-between align-items-center px-5`}
        >
          <div className={`${styles.form} col-7`}>
            <form>
              <div className={`py-5 px-4 ${styles.inputs}`}>
                <div>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${styles.input}`}
                    id="exampleFormControlInput1"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    className={`form-control  ${styles.input}`}
                    id="exampleFormControlInput1"
                    placeholder="Your Email "
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    className={`form-control text-white ${styles.input}`}
                    placeholder="Enter Your Message"
                    id="exampleFormControlTextarea1"
                    rows={3}
                    defaultValue={""}
                  />
                </div>

                <div className={`${styles.submit}  w-100  py-3`}>send</div>
                {/* {message && <div className={`${style.message}`}>{message}</div>} */}
                {/* {!isLoading ? (
                  <div
                    style={{ background: "#912b22" }}
                    className="btn w-25 text-white align-self-end py-3"
                    onClick={submitSend}
                  >
                    send message
                  </div>
                ) : (
                  <div
                    style={{ background: "#912b22" }}
                    className=" w-25 justify-content-center rounded-3 align-self-end py-2"
                  >
                    <div
                      class="spinner-border text-white mx-auto d-block"
                      role="status"
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                )} */}
              </div>
            </form>
          </div>
          <div className={`${styles.information} col-5`}>
            <div className={`${styles.location}`}>
              <MdOutlineLocationOn color="#3AC568" size={22} className="me-2" />
              Suez Canal University
            </div>
            <div className={`${styles.phone}`}>
              <FiPhone color="#3AC568" size={22} className="me-2" />
              010-11-0101010-14-52
            </div>
            <div className={`${styles.email}`}>
              <MdOutlineEmail color="#3AC568" size={22} className="me-2" />
              Teem-ala-alaah@gmail.com
            </div>
            <div className={`${styles.socialIcons}`}>
              <TiSocialFacebook size={22} /> <FaXTwitter size={22} />{" "}
              <TiSocialLinkedin size={22} />
            </div>
            <div className={`${styles.map}`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13733.628296224533!2d32.25787244438766!3d30.622483212361008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f8597f201556e7%3A0x9bd6053867337ff3!2z2KzYp9mF2LnYqSDZgtmG2KfYqSDYp9mE2LPZiNmK2LM!5e0!3m2!1sar!2seg!4v1707680694332!5m2!1sar!2seg"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="iframe"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
