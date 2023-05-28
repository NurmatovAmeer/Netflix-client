import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import avatarLogo from "../../assets/avatar.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import Rating from "@mui/material/Rating";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { notify } from "../../utils/Toaster";
import { Link } from "react-router-dom";

export default function Comment({ commentId, movieId, setIsComments }) {
  const [comment, setComment] = useState({});
  const [showSpoiler, setShowSpoiler] = useState(false);
  useEffect(() => {
    const getComment = async () => {
      try {
        const res = await axios.get(`${API_URL}comments/find/` + commentId, {
          headers: {
            token:
              `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setComment(res.data);
        setShowSpoiler(res.data.spoiler);
      } catch (err) {
        console.log(err);
      }
    };
    getComment();
  }, [commentId]);
  const deleteComment = async () => {
    try {
      await axios.delete(`${API_URL}comments/${commentId}/${movieId}`, {
        headers: {
          token:
            `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      notify("comment has been deleted", "success", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      setIsComments(false);
    } catch (err) {
      console.log(err);
    }
  };
  return !showSpoiler ? (
    <div
      className={`infoCommentsItem ${
        JSON.parse(localStorage.getItem("user")).username == comment.user
          ? "active"
          : ""
      }`}
    >
      <div className="commentsItemProfile">
        <Link to={`/profile/${comment.userId}`} className="commentsItemUser">
          <img
            src={comment.profilePic ? comment.profilePic : avatarLogo}
            alt=""
          />
          <b>{comment.user}</b>
        </Link>
        <div className="topic">
          <b>{comment.topic}</b>
        </div>
      </div>
      <div className="commentsContent">{comment.content}</div>
      {JSON.parse(localStorage.getItem("user")).username == comment.user ? (
        <span onClick={deleteComment} style={{ cursor: "pointer" }}>
          <DeleteIcon style={{ color: "red" }} />
        </span>
      ) : (
        ""
      )}
      <Rating
        style={{ fontSize: "20px" }}
        name="read-only"
        value={Math.round(comment.score, 0.5)}
        readOnly
        precision={0.5}
        emptyIcon={
          <StarOutlineIcon
            style={{ fontSize: "20px" }}
            className="staroutline"
          ></StarOutlineIcon>
        }
      />
    </div>
  ) : (
    <div
      className={`infoCommentsItem ${
        JSON.parse(localStorage.getItem("user")).username == comment.user
          ? "active"
          : ""
      }`}
      style={{ height: "100px", padding: "40px", cursor: "pointer" }}
      onClick={() => setShowSpoiler(!showSpoiler)}
    >
      this comment contains spoilers to movie <br /> tap to view
    </div>
  );
}
