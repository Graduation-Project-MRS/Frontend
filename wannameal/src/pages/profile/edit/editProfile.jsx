import React, { useEffect, useState } from "react";
import styles from "./editProfile.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { PiUploadSimple } from "react-icons/pi";
import Swal from "sweetalert2";
import defaultProfile from "../../../assets/man-user.svg";
import { useNavigate } from "react-router-dom";
import {
  getDecodedToken,
  getuser,
  logout,
} from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../../components/loading/loading";

import {
  fetchUser,
  getLoggoedUser,
  updateUser,
  deleteAccount,
} from "../../../redux/slices/userSLice";
import { getUpdatedUser } from "../../../redux/slices/userSLice";

function EditProfile() {
  const navigate = useNavigate();
  const user = useSelector(getLoggoedUser); // Ensure profile is fetched properly
  const [formData, setFormData] = useState({
    firstName: user?.userName?.split(" ")[0],
    lastName: user?.userName?.split(" ")[1],
    email: user?.email,
    phone: user?.phone || "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    imageProfile: user?.profileImage?.url,
    removeProfileImage: false,
  });

  const [passwordValidity, setPasswordValidity] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
    match: false,
  });

  const availableUser = useSelector(getuser);
  const decodedToken = useSelector(getDecodedToken);

  const userError = useSelector((state) => state.user.error);
  console.log("🚀 ~ EditProfile ~ userError:", userError);
  const userStatus = useSelector((state) => state.user.status);
  console.log("🚀 ~ EditProfile ~ userStatus:", userStatus);
  const dispatch = useDispatch();

  const updatedUser = useSelector(getUpdatedUser);
  console.log("🚀 ~ EditProfile ~ updatedUser:", updatedUser);

  useEffect(() => {
    const fetchProfileData = async () => {
      await dispatch(fetchUser());
    };
    fetchProfileData();
  }, [dispatch]);

  const validatePassword = (password) => {
    setPasswordValidity({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
      match: password === formData.newPassword,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "newPassword" || name === "confirmNewPassword") {
      validatePassword(value);
    }
  };

  const cancelChanges = (e) => {
    e.preventDefault()
    setFormData({
      firstName: user?.userName?.split(" ")[0],
      lastName: user?.userName?.split(" ")[1],
      email: user?.email,
      phone: user?.phone || "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      imageProfile: user?.profileImage?.url,
      removeProfileImage: false,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      imageProfile: file,
      removeProfileImage: false,
    }));
  };

  const handleDeletePhoto = () => {
    setFormData((prevData) => ({
      ...prevData,
      imageProfile: null,
      removeProfileImage: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.newPassword === "") {
      if (!Object.values(passwordValidity).every(Boolean)) {
        Swal.fire({
          icon: "error",
          title: "Password does not meet all requirments",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }
    }

    if (
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.email == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "please fill all required fields",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    const formDataToSend = new FormData();

    formDataToSend.append(
      "userName",
      formData.firstName + " " + formData.lastName
    );
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.newPassword);
    formDataToSend.append("confirmPassword", formData.confirmNewPassword);
    if (
      typeof formData.imageProfile !== "string" ||
      formData.imageProfile !== null
    ) {
      formDataToSend.append("img", formData.imageProfile);
    }
    if (formData.removeProfileImage == true) {
      formDataToSend.append("removeProfileImage", formData.removeProfileImage);
    }
    formDataToSend.append("phone", formData.phone);

    await dispatch(
      updateUser({
        formData: formDataToSend,
        userId: decodedToken.id,
        token: availableUser.token,
      })
    );

    if (userError) {
      Swal.fire({
        icon: "error",
        title: `${userError?.msgError}`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Profile updated successfully",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      navigate("/profile");
    }
  };

  let handleDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(236, 52, 52)",
      cancelButtonColor: "#3ac568",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let timerInterval;
        await dispatch(
          deleteAccount({
            userId: decodedToken.id,
            token: availableUser.token,
          })
        );

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
            dispatch(logout());
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
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={`${styles.name} mt-2 `}>
                  <div className={`${styles.firstname}  col-12 col-md-5`}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                    />
                  </div>
                  <div className={`${styles.lastname}  col-12 col-md-5`}>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>
                <div className={`${styles.email}`}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className={`${styles.email}`}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="phone"
                    minLength="11"
                    maxLength="11"
                  />
                </div>
                <hr />
                <div className={styles.semiTitle}>Profile Picture</div>
                <div className={styles.imageProfile}>
                  <div className={styles.image}>
                    {formData.imageProfile ? (
                      <img
                        alt="User Profile"
                        src={
                          typeof formData.imageProfile === "string"
                            ? formData.imageProfile
                            : URL.createObjectURL(formData.imageProfile)
                        }
                      />
                    ) : (
                      <img
                        src={defaultProfile}
                        alt="Default Profile"
                        objectFit="cover"
                        fill="true"
                      />
                    )}
                  </div>
                  <div className={styles.btns}>
                    <label htmlFor="change" className={styles.change}>
                      <PiUploadSimple size={22} className="mx-2" />
                      Change Picture
                    </label>
                    <input
                      id="change"
                      type="file"
                      accept="image/jpeg, image/png, image/svg+xml"
                      onChange={handleImageChange}
                    />
                    <label className={styles.delete}>
                      <RiDeleteBinLine
                        size={22}
                        className="mx-2"
                        onClick={handleDeletePhoto}
                      />
                      Delete
                    </label>
                  </div>
                </div>
                <hr />
                <div className={styles.semiTitle}>Change Password</div>
                <div className={styles.note}>
                  This will be used to log into your account and complete high
                  severity actions.
                </div>
                <div className={`${styles.password} mt-2  `}>
                  <div className={styles.currentpassword}>
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      placeholder="Current Password"
                    />
                  </div>
                  <div className={styles.newpassword}>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="New Password"
                    />
                    <div className={styles.passwordCriteria}>
                      <ul>
                        <li
                          className={
                            passwordValidity.length ? styles.green : styles.red
                          }
                        >
                          Minimum 8 characters
                        </li>
                        <li
                          className={
                            passwordValidity.uppercase
                              ? styles.green
                              : styles.red
                          }
                        >
                          At least one uppercase letter
                        </li>
                        <li
                          className={
                            passwordValidity.lowercase
                              ? styles.green
                              : styles.red
                          }
                        >
                          At least one lowercase letter
                        </li>
                        <li
                          className={
                            passwordValidity.digit ? styles.green : styles.red
                          }
                        >
                          At least one digit
                        </li>
                        <li
                          className={
                            passwordValidity.specialChar
                              ? styles.green
                              : styles.red
                          }
                        >
                          At least one special character (!@#$%^&*)
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.confirmnewpassword}>
                    <label htmlFor="confirmNewPassword">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      id="confirmNewPassword"
                      value={formData.confirmNewPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm New Password"
                    />
                    {formData.newPassword === formData.confirmNewPassword ? (
                      ""
                    ) : (
                      <p className={styles.red}>Passwords don`t match</p>
                    )}
                  </div>
                </div>
                <div className={`${styles.btns} ${styles.submitbtns}`}>
                  <button
                    type="submit"
                    className={`${styles.change} col-12 col-md-5`}
                  >
                    {userStatus === "loading" ? (
                      <Loading width="60px" height="40px" />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    onClick={cancelChanges}
                    className={`${styles.delete} col-12 col-md-5`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
              <hr />
              <div className={styles.semiTitle}>Delete Personal Account</div>
              <div className={styles.note}>
                Don't need wecraft any longer? We understand, and appreciate you
                using our service!
              </div>
              <div
                className={styles.deleteAccount}
                onClick={handleDeleteAccount}
              >
                Delete Account?
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
