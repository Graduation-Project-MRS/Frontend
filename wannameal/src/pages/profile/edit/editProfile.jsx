"use client";

import React, { useState } from "react";
import styles from "./editProfile.module.css";

import { RiDeleteBinLine } from "react-icons/ri";
import { PiUploadSimple } from "react-icons/pi";
import Swal from "sweetalert2";
import profile from "../../../assets/man-user.svg";
import { useTranslation } from "react-i18next";

function EditProfile() {
  const { t } = useTranslation()
  const { setting, Profile, info, fname, lname, Email, image, change, delte, changePass, info2, CurrentPass, NewPass, ConfirmPass, savedCH, cancel, deltePers, info3, delteAcc } = t('editprofile')
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    profilePicture: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };
  const cancelChanges = (e) => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      profilePicture: null,
    });
    console.log(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("🚀 ~ handleImageChange ~ file:", file);
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: file,
    }));
  };

  const handleDeletePhoto = () => {
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: null,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    fetch("", {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  let handleDeleteAcount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(236, 52, 52)",
      cancelButtonColor: "#3ac568",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval;
        Swal.fire({
          title: "Deleting Account!",
          html: "Your Account will be Deleted in <b></b> second.",
          timer: 5000,
          timerProgressBar: true,

          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${parseInt(Swal.getTimerLeft() / 1000)}`;
            }, 1000);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            //روح علي الهوم بقا
          }
        });
      }
    });
  };
  return (
    <>
      <div className={`py-5 ${styles.editportfolioContainer} `}>
        <div className="container-lg">
          <div className="row">
            <div className={`${styles.content} col-12 col-md-10`}>
              <div className={styles.title}>{setting}</div>
              <div className={styles.semiTitle}>{Profile}</div>
              <div className={styles.note}>{info}</div>
              <form action="" onSubmit={handleSubmit} className={styles.form}>
                <div className={`${styles.name} mt-2 `}>
                  <div className={`${styles.firstname}  col-12 col-md-5`}>
                    <label htmlFor="firstName">{fname}</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder={fname}
                    />
                  </div>
                  <div className={`${styles.lastname}  col-12 col-md-5`}>
                    <label htmlFor="lastName">{lname}</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder={lname}
                    />
                  </div>
                </div>
                <div className={`${styles.email}`}>
                  <label htmlFor="email">{Email}</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={Email}
                  />
                </div>
                <hr />
                <div className={styles.semiTitle}>{image}</div>
                <div className={styles.imageProfile}>
                  <div className={styles.image}>
                    {formData.profilePicture ? (
                      <img
                        alt="user profile "
                        src={URL.createObjectURL(formData.profilePicture)}
                      />
                    ) : (
                      <img src={profile} alt="" objectFit="cover" fill="true" />
                    )}
                  </div>
                  <div className={styles.btns}>
                    <label htmlFor="change" className={styles.change}>
                      <PiUploadSimple size={22} className="mx-2" />{change}</label>
                    <input
                      id="change"
                      type="file"
                      accept="image/jpeg, image/png, , image/svg+xml"
                      onChange={handleImageChange}
                    />
                    <label className={` ${styles.delete}`}>
                      <RiDeleteBinLine
                        size={22}
                        className="mx-2"
                        on
                        onClick={handleDeletePhoto}
                      />
                      {delte}
                    </label>
                  </div>
                </div>
                <hr />
                <div className={styles.semiTitle}>{changePass}</div>
                <div className={styles.note}>{info2}</div>
                <div className={`${styles.password} mt-2  `}>
                  <div className={styles.currentpassword}>
                    <label htmlFor="currentPassword">{CurrentPass}</label>
                    <input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      placeholder={CurrentPass}
                    />
                  </div>
                  <div className={styles.newpassword}>
                    <label htmlFor="newPassword">{NewPass}</label>
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder={NewPass}
                    />
                  </div>
                  <div className={styles.confirmnewpassword}>
                    <label htmlFor="confirmNewPassword">{ConfirmPass}</label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      id="confirmNewPassword"
                      value={formData.confirmNewPassword}
                      onChange={handleInputChange}
                      placeholder={ConfirmPass}
                    />
                  </div>
                </div>

                <div className={`${styles.btns} ${styles.submitbtns}`}>
                  <button
                    type="submit"
                    className={` ${styles.change} col-12 col-md-5`}
                  >{savedCH}</button>
                  <button
                    onClick={cancelChanges}
                    className={` ${styles.delete} col-12 col-md-5`}
                  >{cancel}</button>
                </div>
              </form>
              <hr />
              <div className={styles.semiTitle}>{deltePers}</div>
              <div className={styles.note}>{info3}</div>

              <div
                className={styles.deleteAccount}
                onClick={handleDeleteAcount}
              >{delteAcc}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
