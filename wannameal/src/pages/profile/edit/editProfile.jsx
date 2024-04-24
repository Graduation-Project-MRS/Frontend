"use client";

import React, { useState } from "react";
import styles from "./editProfile.module.css";

import { RiDeleteBinLine } from "react-icons/ri";
import { PiUploadSimple } from "react-icons/pi";
import Swal from "sweetalert2";
import profile from "../../../assets/man-user.svg";

function EditProfile() {
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
              <div className={styles.title}>Personal Setting</div>
              <div className={styles.semiTitle}>profile</div>
              <div className={styles.note}>
                This information will be displayed publicly so be careful what
                you share.
              </div>
              <form action="" onSubmit={handleSubmit} className={styles.form}>
                <div className={`${styles.name} mt-2 `}>
                  <div className={`${styles.firstname}  col-12 col-md-5`}>
                    <label htmlFor="firstName">first name</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="first name"
                    />
                  </div>
                  <div className={`${styles.lastname}  col-12 col-md-5`}>
                    <label htmlFor="lastName">last name</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="last name"
                    />
                  </div>
                </div>
                <div className={`${styles.email}`}>
                  <label htmlFor="email">email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email"
                  />
                </div>
                <hr />
                <div className={styles.semiTitle}>profile picture</div>
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
                      <PiUploadSimple size={22} className="mx-2" />
                      change picture
                    </label>
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
                      delete
                    </label>
                  </div>
                </div>
                <hr />
                <div className={styles.semiTitle}>change password</div>
                <div className={styles.note}>
                  This will be used to log into your account and complete high
                  severity actions.
                </div>
                <div className={`${styles.password} mt-2  `}>
                  <div className={styles.currentpassword}>
                    <label htmlFor="currentPassword">current password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      placeholder="current passwword"
                    />
                  </div>
                  <div className={styles.newpassword}>
                    <label htmlFor="newPassword">new password</label>
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="new password"
                    />
                  </div>
                  <div className={styles.confirmnewpassword}>
                    <label htmlFor="confirmNewPassword">
                      confirm new password
                    </label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      id="confirmNewPassword"
                      value={formData.confirmNewPassword}
                      onChange={handleInputChange}
                      placeholder="confirm new password"
                    />
                  </div>
                </div>

                <div className={`${styles.btns} ${styles.submitbtns}`}>
                  <button
                    type="submit"
                    className={` ${styles.change} col-12 col-md-5`}
                  >
                    save changes
                  </button>
                  <button
                    onClick={cancelChanges}
                    className={` ${styles.delete} col-12 col-md-5`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
              <hr />
              <div className={styles.semiTitle}>Deiete Personal Account</div>
              <div className={styles.note}>
                Don't need wecraft any longer? We understand, and appreciate you
                using our service!
              </div>

              <div
                className={styles.deleteAccount}
                onClick={handleDeleteAcount}
              >
                delete account?
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
