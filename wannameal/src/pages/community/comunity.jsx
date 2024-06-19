import React, { useEffect, useState } from "react";
import style from "./community.module.css";
import coverPhoto from "../../assets/Rectangle 2.png";
import defaultProfile from "../../assets/man-user.svg"; // Renamed import to avoid conflict with the profile variable
import Loading from "../../components/loading/loading";
import { Link } from "react-router-dom";
import UserCard from "../../components/usercard/userCard";
import { HiPhoto } from "react-icons/hi2";
import { IoVideocam } from "react-icons/io5";
import Post from "../../components/post/post";
import { VscSend } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { getuser, getDecodedToken } from "../../redux/slices/authSlice";
import { createPost } from "../../redux/slices/postsSLlce";
import {
  getSuggestedUsers,
  fetchSuggestedUsers,
  getProfileById,
  getProfile,
} from "../../redux/slices/communityUserSlice";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

export default function Community() {
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [previewVideos, setPreviewVideos] = useState([]);
  const { t } = useTranslation()
  const { Fname, email, edit, mine, recommend, Norecommend, more, follow, msg, share, followers, following, photo, video, who } = t('community', {
    fullname: 'mahmoud khairy402',
    email: 'mahmoudkhairy402@gmail.com'
  })
  // Use selectors to get state values
  const { suggestedUsers } = useSelector(getSuggestedUsers);
  const profile = useSelector(getProfile); // Ensure profile is fetched properly
  console.log("🚀 ~ Community ~ profile:", profile);
  const availableUser = useSelector(getuser);
  const posts = useSelector((state) => state.posts.posts);
  console.log("🚀 ~ Community ~ posts:", posts);
  const postError = useSelector((state) => state.posts.error);
  const postStatus = useSelector((state) => state.posts.status);
  const profileError = useSelector((state) => state.communityUser.error);
  const profileStatus = useSelector((state) => state.communityUser.status);
  const decodedToken = useSelector(getDecodedToken);

  const dispatch = useDispatch();

  // Handle text input change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handle photo input change
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
    setPreviewPhotos(files.map((file) => URL.createObjectURL(file)));
  };

  // Handle video input change
  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setVideos(files);
    setPreviewVideos(files.map((file) => URL.createObjectURL(file)));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("postedBy", decodedToken.id);
    formData.append("text", text);

    photos.forEach((photo) => {
      formData.append("img", photo);
    });
    videos.forEach((video) => {
      formData.append("video", video);
    });

    await dispatch(createPost({ formData, token: availableUser?.token }));
    if (postError) {
      Swal.fire({
        icon: "error",
        title: `${postError}`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Post created successfully",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }

    setText("");
    setPreviewPhotos([]);
    setPreviewVideos([]);
  };

  const fetchSuggested = async () => {
    try {
      await dispatch(fetchSuggestedUsers(availableUser.token));
    } catch (error) {
      console.error("Failed to fetch suggested users:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      dispatch(
        getProfileById({
          userId: decodedToken.id,
          token: availableUser.token,
        })
      );
    } catch (error) {
      console.error("Failed to fetch profile:", profileError);
    }
  };
  useEffect(() => {
    if (availableUser.token && decodedToken.id) {
      fetchSuggested();
      fetchProfile();
    }
  }, [dispatch, availableUser.token, decodedToken.id, profileError]);

  return (
    <div className={style.communityContainer}>
      <div className="container-lg">
        <div className={style.Comunity}>
          <div className={style.leftAside}>
            {profile ? (
              <div className={style.userInfoCard}>
                <div className={style.userProfile}>
                  <div className={style.coverPhoto}>
                    <img
                      src={profile.user?.coverImages[0] || coverPhoto} // Use defaultProfile if URL is not available
                      alt="Cover"
                    />
                  </div>
                  <div className={style.mainInfo}>
                    <div className={style.profileImage}>
                      <img
                        src={profile.user?.profileImage?.url || defaultProfile} // Use defaultProfile if URL is not available
                        alt="Profile"
                      />
                    </div>
                    <div className={style.name}>{profile.user?.userName}</div>
                    <div className={style.email}>{profile.user?.email}</div>
                  </div>
                </div>
                <div className={style.follwInfo}>
                  <div className={style.follwing}>
                    <div className={style.followNum}>
                      {profile.user.following?.length || 0}{" "}
                    </div>
                    <div className={style.followTitle}>{following}</div>
                  </div>
                  <div className={style.follwers}>
                    <div className={style.followNum}>
                      {profile.user.followers?.length || 0}{" "}
                    </div>
                    <div className={style.followTitle}>{followers}</div>
                  </div>
                </div>
                <div className={style.profileLink}>
                  <Link to="/profile">{mine}</Link>
                </div>
              </div>
            ) : (
              <Loading width="150px" height="150px" />
            )}

            {suggestedUsers ? (
              <div className={style.followInfoCard}>
                <div className={style.title}>{recommend}</div>
                <div className={style.userCards}>
                  {suggestedUsers && suggestedUsers?.length > 0 ? (
                    suggestedUsers.map((user) => (
                      <UserCard
                        key={user.id}
                        method={follow}
                        user={user}
                      // suggestedUsers={suggestedUsers}
                      /> // Ensure unique key for each UserCard
                    ))
                  ) : (
                    <p>{Norecommend}</p>
                  )}
                </div>
                {suggestedUsers && suggestedUsers?.length > 3 && (
                  <div className={style.showMore}>
                    <Link to="/community">{more}</Link>
                  </div>
                )}
              </div>
            ) : (
              <Loading width="150px" height="150px" />
            )}
          </div>
          <div className={`${style.mainContent} d-flex flex-column gap-2`}>
            <div
              className={`${style.uploadPost} w-100 d-flex align-items-start flex-wrap`}
            >
              <div className={`${style.profileImage} col-1 me-1`}>
                <img
                  src={profile?.user?.profileImage?.url || defaultProfile}
                  alt="Profile"
                />
              </div>
              <form
                onSubmit={handleSubmit}
                className={`${style.postForm} col-11 d-flex flex-wrap justify-content-between row-gap-3`}
              >
                <div className={`${style.textInput} col-12`}>
                  <input
                    type="text"
                    placeholder={`${share}`}
                    name="post"
                    value={text}
                    id="post"
                    className="w-100"
                    onChange={handleTextChange}
                    required
                  />
                  <button
                    type="submit"
                    className={style.sendIcon}
                    disabled={postStatus === "loading"}
                  >
                    <VscSend size={25} className={style.postIcon} />
                  </button>
                </div>
                <input
                  type="file"
                  name="photoInput"
                  id="photoInput"
                  accept="image/*"
                  className="d-none"
                  onChange={handlePhotoChange}
                  multiple
                />
                <label htmlFor="photoInput">
                  <HiPhoto size={23} color="#1976d2" className="me-1" />
                  {photo}
                </label>
                <input
                  type="file"
                  name="videoInput"
                  id="videoInput"
                  accept="video/*"
                  className="d-none"
                  onChange={handleVideoChange}
                />
                <label htmlFor="videoInput">
                  <IoVideocam size={23} color="#1976d2" className="me-1" />
                  {video}
                </label>
              </form>
              <div
                className={`${style.preview} col-12 d-flex flex-column justify-content-center flex-wrap g-2`}
              >
                {previewPhotos.map((src, index) => (
                  <div key={index} className={style.imgContainer}>
                    <img src={src} alt={`Preview ${index}`} />
                  </div>
                ))}
                {previewVideos.map((src, index) => (
                  <div key={index} className={style.videoContainer}>
                    <video src={src} controls />
                  </div>
                ))}
              </div>
            </div>
            {posts ? (
              posts.map((post) => <Post key={post.id} post={post} />)
            ) : (
              <Loading width="100px" height="100px" />
            )}
            <Post />
          </div>
          <div className={`  ${style.rightAside}`}>
            <div className={style.followInfoCard}>
              <div className={style.title}>{who}</div>
              <div className={style.userCards}>
                <UserCard method={msg} user="" />
              </div>
              <div className={style.showMore}>
                <Link to="/community">{more}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
