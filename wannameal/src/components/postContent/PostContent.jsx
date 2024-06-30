import React, { useState } from "react";
import style from "./postContent.module.css";
import profile from "../../assets/man-user.svg";
import dish2 from "../../assets/Rectangle 9.png";
import { AiFillHeart, AiFillMessage } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { likePost, commentPost } from "../../redux/slices/postsSLlce";
import { getDecodedToken } from "../../redux/slices/authSlice";
import { getuser } from "../../redux/slices/authSlice";
import { useTranslation } from "react-i18next";

export default function PostContent() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewPhotos, setPreviewPhotos] = useState([dish2, dish2]);
  const [previewVideos, setPreviewVideos] = useState([]);
  const [likedPost, setLikedPost] = useState(false);
  const [commentText, setCommentText] = useState("");
  let { token } = useSelector(getuser);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleVideoClick = (src) => {
    setSelectedVideo(src);
  };

  const handleLikeClick = () => {
    setLikedPost(!likedPost);
    console.log("first like");
    // dispatch(likePost({ postId, token }));
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
        <div className={`${style.postText} col-12`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
          reprehenderit ea maiores sunt ipsam est quis similique labore iste.
          Iusto sed fuga cumque at qui optio, labore non officia quidem.
        </div>
        <div
          className={`${style.preview} col-12 d-flex justify-content-center flex-wrap g-1`}
        >
          {previewPhotos &&
            previewPhotos.map((src, index) => (
              <div
                className={`${style.imgContainer}`}
                key={index}
                data-bs-toggle="modal"
                data-bs-target={`#staticBackdrop${index}`}
                onClick={() => handleImageClick(src)}
              >
                <img src={src} alt={`Preview ${index}`} />
                {/* modal */}
                <div
                  className={`modal fade ${style.modalview}`}
                  id={`staticBackdrop${index}`}
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
          {previewVideos.map((src, index) => (
            <div
              className={`${style.videoContainer}`}
              key={index}
              data-bs-toggle="modal"
              data-bs-target={`#staticBackdrop${index}000`}
              onClick={() => handleVideoClick(src)}
            >
              <video src={src} controls />
              {/* modal */}
              <div
                className={`modal fade ${style.modalview}`}
                id={`staticBackdrop${index}000`}
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
                    <div className={`modal-body w-100 p-1 ${style.modalBody}`}>
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
            2k
          </p>
          <p className={style.comments}>3 {comment}</p>
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
