import React, { useState } from "react";
import PostContent from "../postContent/PostContent";
import style from "./post.module.css";
import { VscSend } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import defaultProfile from "../../assets/man-user.svg"; // Renamed import to avoid conflict with the profile variable
import { getProfile } from "../../redux/slices/communityUserSlice";
import Loading from "../loading/loading";
import { getDecodedToken, getuser } from "../../redux/slices/authSlice";

export default function Post({ post }) {
  const [commentText, setCommentText] = useState("");
  const commentstatus = useSelector((state) => state.posts.status);
  const profile = useSelector(getProfile); // Ensure profile is fetched properly
  // const comments = useSelector((state)=>state.posts.comments); // Ensure profile is fetched properly

  let dispatch = useDispatch();
  let { token } = useSelector(getuser);
  let decodedToken = useSelector(getDecodedToken);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("Comment submitted: ", commentText);
    // dispatch(commentPost({ postId: post.id, token, text: commentText }));
  };

  return (
    <>
      <PostContent post={post} />
      {/* Comment modal */}
      <div
        className="modal fade rounded-2"
        id="commentmodal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg rounded-2 ">
          <div className="modal-content position-relative ">
            <button
              type="button"
              className={` ${style.btnClose}`}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                color: "#699bf7",
                zIndex: "100",
              }}
              data-bs-dismiss="modal"
              aria-label="Close"
            />
            <div className={`modal-body p-0 ${style.modalBody} rounded-2`}>
              {/* Display the same post content */}
              <PostContent post={post} />
              {/* Form to add a comment */}
              <div className={`${style.comments}`}>
                {/* {comments?.data?.replies ? (
                  <div className={style.comment}>
                    <div className={`${style.profileImage} col-1 me-1`}>
                      <img
                        src={
                          comments?.data?.replies?.userProfilePic ||
                          defaultProfile
                        }
                        alt="Profile"
                      />
                    </div>
                    <div className={style.commentBody}>
                      <div className={style.name}>
                        {comments?.data?.replies?.userName}
                      </div>
                      <div className={style.text}>
                        {comments?.data?.replies?.text}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Loading width="50px" height="50px" />
                )} */}

                {/* //!temp comment  */}
                <div className={style.comment}>
                  <div className={`${style.profileImage} col-2 me-1`}>
                    <img src={defaultProfile} alt="Profile" />
                  </div>
                  <div className={style.commentBody}>
                    <div className={style.name}>Mahmoud Khairy</div>
                    <div className={style.text}>
                      welcome bro, you have a good jop welcome bro, you have a
                      good jop welcome bro, you have a good jop welcome bro, you
                      have a good jop{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${style.uploadComment} d-flex p-`}>
                <div className={`${style.profileImage} col-1 me-1`}>
                  <img
                    src={profile?.user?.profileImage?.url || defaultProfile}
                    alt="Profile"
                  />
                </div>
                <form onSubmit={handleCommentSubmit} className=" col-11 ">
                  <div className={`${style.textInput} col-12`}>
                    <label htmlFor="comment">{profile?.user?.userName}</label>
                    <input
                      type="text"
                      name="comment"
                      id="comment"
                      className="w-100"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className={style.sendIcon}
                      disabled={commentstatus === "loading"}
                    >
                      <VscSend size={25} className={style.postIcon} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
