import "./movie.scss";
import Rating from "@mui/material/Rating";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import HighQualityIcon from "@mui/icons-material/HighQuality";
import InfoIcon from "@mui/icons-material/Info";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import storage from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { NavLink } from "react-router-dom";
import Cast from "./Cast";
import Comment from "./Comment";
import { ToastContainer } from "react-toastify";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { notify } from "../../utils/Toaster";
import { auth } from "../../authContext/apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
export default function Movie() {
  const location = useParams().id;
  const [isComments, setIsComments] = useState(false);
  const [movie, setMovie] = useState({});
  const [comment, setComment] = useState({
    score: 0,
    user: JSON.parse(localStorage.getItem("user")).username,
    profilePic: JSON.parse(localStorage.getItem("user")).profilePic,
  });
  const [isLiked, setIsLiked] = useState(
    JSON.parse(localStorage.getItem("user")).liked.includes(location)
  );
  const [popup, setPopup] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(`${API_URL}movies/find/` + location, {
          headers: {
            token:
              `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [location, isComments]);

  const copy = () => {
    navigator.clipboard.writeText(window.location);
    notify("copied to clipboard", "success", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setComment({ ...comment, [e.target.name]: value });
  };

  const handleCheck = (e) => {
    const value = e.target.checked;
    setComment({ ...comment, [e.target.name]: value });
  };

  const createComment = async () => {
    if (!comment.topic && !comment.content) {
      notify("comment should contain at least 1 word", "error", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      await axios.post(`${API_URL}comments/${movie._id}`, comment, {
        headers: {
          token:
            `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });

      setIsComments(true);
    }
  };

  const liked = async () => {
    try {
      const res = await axios.put(
        `${API_URL}users/${
          JSON.parse(localStorage.getItem("user"))._id
        }?type=liked`,
        { liked: movie._id },
        {
          headers: {
            token:
              `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      setIsLiked(res && true);
      auth(dispatch);
    } catch (err) {
      console.log(err);
    }
  };
  const unliked = async () => {
    try {
      const res = await axios.put(
        `${API_URL}users/${
          JSON.parse(localStorage.getItem("user"))._id
        }?type=unliked`,
        { liked: movie._id },
        {
          headers: {
            token:
              `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      setIsLiked(res && false);
      auth(dispatch);
    } catch (err) {
      console.log(err);
    }
  };

  const save = () => {
    setShowProgress(true);
    getDownloadURL(ref(storage, `${movie.video}`))
      .then((url) => {
        axios({
          url: url,
          method: "GET",
          responseType: "blob",
          onDownloadProgress: (ProgressEvent) => {
            setProgress(
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
            );
          },
        })
          .then((response) => {
            let blob = response.data;
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = movie.title;
            document.body.appendChild(link);
            link.click();
            link.remove();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="infoContainer">
        <img src={movie.img} alt="" className="backgroundImage" />
        <div className="infoPopUp">
          <Link to="/" className="back">
            <ArrowBackIcon />
            Back to Menu
          </Link>
          <div className="infoTop">
            <div className="infoTopImg">
              <img src={movie.img} alt="" />
            </div>
            <div className="infoTopAbout">
              <h1>{movie.title}</h1>
              <div className="infoTopAboutCredentials">
                <p>
                  <HighQualityIcon
                    style={{
                      color: "red",
                      marginRight: "4px",
                      marginLeft: "4px",
                    }}
                  />{" "}
                  {movie.quality}px
                </p>
                <div className="divider"></div>
                <p>
                  <InfoIcon
                    style={{
                      color: "red",
                      marginRight: "4px",
                      marginLeft: "4px",
                    }}
                  />{" "}
                  {movie.genre}
                </p>
                <div className="divider"></div>
                <p>
                  <CalendarMonthIcon
                    style={{
                      color: "red",
                      marginRight: "4px",
                      marginLeft: "4px",
                    }}
                  />{" "}
                  {movie.year}
                </p>
                <div className="divider"></div>
                <p>
                  <TimelapseIcon
                    style={{
                      color: "red",
                      marginRight: "4px",
                      marginLeft: "4px",
                    }}
                  />{" "}
                  {movie.duration}
                </p>
              </div>
              <p className="infoTopAboutDesc">
                {movie.desc && movie.desc.slice(0, 250)}
              </p>
              <div className="infoTopAboutActions">
                {!isLiked ? (
                  <button className="infoActionsItemCircle" onClick={liked}>
                    <FavoriteBorderIcon style={{ color: "white" }} />
                  </button>
                ) : (
                  <button className="infoActionsItemCircle" onClick={unliked}>
                    <FavoriteIcon style={{ color: "red" }} />
                  </button>
                )}
                <div className="divider"></div>
                <button
                  className="infoActionsItem"
                  onClick={() => setPopup(true)}
                >
                  <ShareIcon style={{ marginRight: "8px" }} /> Share
                </button>
                <button className="infoActionsItem" onClick={() => save()}>
                  <DownloadIcon style={{ marginRight: "8px" }} /> Download
                </button>
                <NavLink className="link" to={`/watch/${movie._id}`}>
                  <button
                    className="infoActionsItem"
                    style={{ border: "1px solid red" }}
                  >
                    <PlayCircleIcon style={{ marginRight: "8px" }} /> watch
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="infoCredentials">
            <h1>Movie Info:</h1>
            <div className="infoCredentialsAll">
              <div className="infoCredentialsLeft">
                <div className="credentialItem">
                  <b>Year</b>: <p>{movie.year}</p>
                </div>
                <div className="credentialItem">
                  <b>Company</b>: <p>{movie.company} Netflix</p>
                </div>
                <div className="credentialItem">
                  <b>type</b>
                  <p>
                    {movie.isSeries == "true" ? "TV series" : "Movie"}
                    {movie.isSeries == "true" ? movie.availableSeries : ""}
                  </p>
                </div>
              </div>
              <div className="infoCredentialsRight">
                <div className="credentialItem">
                  <b>Limit</b>: <p>{movie.limit}</p>
                </div>
                <div className="credentialItem">
                  <b>Genre</b>: <p>{movie.genre}</p>
                </div>
                <div className="credentialItem">
                  <b>Duration</b>: <p>{movie.duration}</p>
                </div>
              </div>
            </div>
            <div className="infoCredentialsScore">
              <Rating
                style={{ fontSize: "35px" }}
                name="read-only"
                value={Math.round(movie.overall * 2) / 2}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarOutlineIcon
                    style={{ fontSize: "35px" }}
                    className="staroutline"
                  ></StarOutlineIcon>
                }
              />
              <h2>{Math.round(movie.overall * 2) / 2}</h2>
            </div>
          </div>
          <div className="infoCasts">
            <h1>Casts</h1>
            {movie.casts?.length > 0 ? (
              <div className="insoCastsItemWrapper">
                {movie.casts?.map((item, index) => (
                  <Cast item={item} key={index} />
                ))}
              </div>
            ) : (
              <div className="noInfoCasts">there is no cast informations</div>
            )}
          </div>

          <ul className="infoComment">
            <li className="infoCommentNav">
              <span onClick={() => setIsComments(false)}>Comment</span>
            </li>
            <li className="infoCommentNav">
              <span onClick={() => setIsComments(true)}>See all comments</span>
            </li>
          </ul>
          {!isComments ? (
            <div className="infoCommentWrite">
              <div className="infoCommentInput">
                <div className="infoCommentInputItem">
                  <label htmlFor="topic">
                    type here topic of your comment:
                  </label>
                  <input
                    type="text"
                    placeholder="type here topic"
                    id="topic"
                    name="topic"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="infoCommentInputItem">
                  <label htmlFor="topic">type here your comment:</label>
                  <textarea
                    placeholder="write your comment..."
                    name="content"
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="divider"></div>

              <div className="infoCommentSubmit">
                <div className="infoCommentScore">
                  set your rating:
                  <Rating
                    style={{ fontSize: "35px" }}
                    name="read-only"
                    value={comment.score}
                    onChange={(event, newValue) => {
                      setComment((prev) => {
                        return { ...prev, ["score"]: newValue };
                      });
                    }}
                    emptyIcon={
                      <StarOutlineIcon
                        style={{ fontSize: "35px" }}
                        className="staroutline"
                      ></StarOutlineIcon>
                    }
                  />
                </div>
                <div className="tab opt1">
                  <label htmlFor="#switch">Spoiler ?</label>
                  <input
                    type="checkbox"
                    id="switch"
                    name="spoiler"
                    onChange={handleCheck}
                  />
                </div>

                <button className="infoCommentButton" onClick={createComment}>
                  Submit
                </button>
              </div>
            </div>
          ) : movie.comments?.length > 0 ? (
            <div className="infoComments">
              {movie.comments.map((item, index) => (
                <Comment
                  commentId={item}
                  movieId={movie._id}
                  key={index}
                  setIsComments={setIsComments}
                />
              ))}
            </div>
          ) : (
            <div className="noInfoComment">there is no comment yet</div>
          )}
        </div>
      </div>

      {popup ? (
        <div className="popup" onClick={() => setPopup(false)}>
          <div className="popup__content" onClick={(e) => e.stopPropagation()}>
            <div className="popup__header">
              <div className="popup__title">share</div>
              <button className="popup__close" onClick={() => setPopup(false)}>
                X
              </button>
            </div>
            <div className="popup_main">
              <button onClick={copy} className="copyButton">
                copy link
              </button>
              <FacebookShareButton url={window.location}>
                <FacebookIcon style={{ fontSize: "40px" }} />
              </FacebookShareButton>
              <TwitterShareButton url={window.location}>
                  
                <TwitterIcon style={{ fontSize: "40px" }} />
              </TwitterShareButton>
              <TelegramShareButton url={window.location}>
                  
                <TelegramIcon style={{ fontSize: "40px" }} />
              </TelegramShareButton>
              <WhatsappShareButton url={window.location}>
                  
                <WhatsAppIcon style={{ fontSize: "40px" }} />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {showProgress ? (
        <div className="uploader">
          <div className="uploader__header">
            <div className="uploader__titile">
              <CloudDownloadIcon /> Downloads
            </div>
            <button
              className="uploader__close"
              onClick={() => setShowProgress(false)}
            >
              X
            </button>
          </div>
          <div className="upload-file__progress-bar">
            <div
              className="upload-file__upload-bar"
              style={{ width: progress + "%" }}
            />
            <div className="upload-file__percent">{progress}%</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
