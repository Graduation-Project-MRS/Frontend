import React, { useState } from "react";
import style from "./postContent.module.css";
import profile from "../../assets/man-user.svg";
import dish2 from "../../assets/Rectangle 9.png";
import { AiFillHeart, AiFillMessage } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  likePost,
  commentPost,
  getPostError,
  getPostStatus,
  getlikkk,
} from "../../redux/slices/postsSLlce";
import { getDecodedToken } from "../../redux/slices/authSlice";
import { getuser } from "../../redux/slices/authSlice";
import { useTranslation } from "react-i18next";

export default function PostContent({ post }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewPhotos, setPreviewPhotos] = useState([post?.img]);
  const [previewVideos, setPreviewVideos] = useState([post?.video]);

  let decodedToken = useSelector(getDecodedToken);
  let availableUser = useSelector(getuser);
  const isPostLiked = () => {
    return post?.likes.some((like) => like === decodedToken.id);
  };
  const [likedPost, setLikedPost] = useState(isPostLiked());
  const [likes, setLikes] = useState(post?.likes);
  const [commentText, setCommentText] = useState("");
  let dispatch = useDispatch();
  let postError = useSelector(getPostError);
  let postStatue = useSelector(getPostStatus);
  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleVideoClick = (src) => {
    setSelectedVideo(src);
  };

  const handleLikeClick = async () => {
    try {
      await dispatch(
        likePost({ postId: post._id, token: availableUser?.token })
      );

      if (postError === null) {
        const newLikedPost = !likedPost;
        setLikedPost(newLikedPost);

        if (newLikedPost) {
          setLikes([...likes, decodedToken.id]);
        } else {
          setLikes(likes.filter((like) => like !== decodedToken.id));
        }

        console.log("Post liked/unliked successfully");
      } else {
        console.error(`Failed to like ${post._id}`);
      }
    } catch (error) {
      console.error(`Failed to like ${post._id}`, error);
    }
  };

  const handleCommentClick = () => {
    console.log("first comment");
    // let text = "اي حاجه دلوقتي";
    // dispatch(commentPost({ postId, token, text }));
  };

  const handleShareClick = () => {
    console.log("first share");
  };

  const { t } = useTranslation()
  const { comment, sharee, like } = t('community', {
    fullname: 'mahmoud khairy402',
    email: 'mahmoudkhairy402@gmail.com'
  })
  return (
    <div className={`${style.post} w-100 d-flex align-items-start`}>
      <div className={`${style.profileImage} col-1 me-1`}>
        <img src={profile} alt="profileImage" />
      </div>
      <div className={`col-11 d-flex flex-column gap-2 ${style.postInfo}`}>
        <div className={`${style.userInfo} col-12`}>
          <div className={style.text}>
            <div className={style.name}>mahmoud</div>
            <div className={style.email}>khairy402</div>
          </div>
        </div>
        <div className={`${style.postText} col-12`}>{post?.text}</div>
        <div
          className={`${style.preview} col-12 d-flex justify-content-center flex-wrap g-1`}
        >
          {previewPhotos &&
            previewPhotos.map((img, index) => (
              <div
                className={`${style.imgContainer}`}
                key={img?.id}
                data-bs-toggle="modal"
                data-bs-target={`#staticBackdrop${img?.id}`}
                onClick={() => handleImageClick(img?.url)}
              >
                {img === undefined ? (
                  ""
                ) : (
                  <img src={img?.url} alt={`Preview ${index}`} />
                )}
                {/* modal */}
                <div
                  className={`modal fade ${style.modalview}`}
                  id={`staticBackdrop${img?.id}`}
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className={`modal-content ${style.modalContent}`}>
                      <div className="modal-header border-bottom-0">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div
                        className={`modal-body w-100 p-1 ${style.modalBody}`}
                      >
                        <img src={selectedImage} alt="Selected" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {previewVideos &&
            previewVideos.map((video, index) => (
              <div
                className={`${style.videoContainer}`}
                key={video?.url}
                data-bs-toggle="modal"
                data-bs-target={`#staticBackdrop${video?.url}`}
                onClick={() => handleVideoClick(video?.url)}
              >
                {video === undefined ? "" : <video src={video?.url} controls />}
                {/* modal */}
                <div
                  className={`modal fade ${style.modalview}`}
                  id={`staticBackdrop${video?.url}`}
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className={`modal-content ${style.modalContent}`}>
                      <div className="modal-header border-bottom-0">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div
                        className={`modal-body w-100 p-1 ${style.modalBody}`}
                      >
                        <video src={selectedVideo} controls />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className={style.reactsNum}>
          <p className={style.likes}>
            <AiFillHeart size={16} color="#699bf7" className="me-1" />
            {likes?.length >= 1000 ? `${likes?.length / 1000}k` : likes?.length}
          </p>
          <p className={style.comments}>{post?.replies?.length} {comment}</p>
        </div>
        <div className={style.reacts}>
          <div
            className={`${likedPost ? `${style.like} ${style.likedPost}` : style.like
              }`}
            onClick={handleLikeClick}
          >
            <AiFillHeart size={23} className={style.likeIcon} /> {like}
          </div>
          <div
            className={style.comment}
            onClick={handleCommentClick}
            data-bs-toggle="modal"
            data-bs-target="#commentmodal"
          >
            <AiFillMessage size={23} color="#699bf7" />
            {comment}
          </div>

          <div className={style.share} onClick={handleShareClick}>
            <IoIosShareAlt size={23} color="#699bf7" />
            {sharee}
          </div>
        </div>
      </div>
    </div>
  );
}
