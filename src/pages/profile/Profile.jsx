import React, { useEffect, useState } from "react";
import "./profile.scss";
import AvatarLogo from "../../assets/avatar.svg";
import SideNavigation from "../../components/sidebar/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import Rating from "@mui/material/Rating";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const Profile = () => {
  const location = useParams().id;
  const [userData, setUserData] = useState([]);
  const [movies, setMovies] = useState([]);
  const [img, setImg] = useState(null);
  const [permissions, setPermissions] = useState({
    settings: JSON.parse(localStorage.getItem("user"))._id == location,
    fordevs: JSON.parse(localStorage.getItem("user")).isAdmin,
  });
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${API_URL}users/find/` + location, {
        headers: {
          token:
            `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setUserData(res.data);
    };

    const getMovie = async () => {
      try {
        const res = await axios.get(`${API_URL}movies/liked/` + location, {
          headers: {
            token:
              `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
    getUser();
  }, []);

  return (
    <>
      <SideNavigation
        permissions={permissions}
        location={location}
        active="profile"
      />
      <div className="profile-container">
        <div
          className="profile-header"
          style={{
            backgroundImage: `url(${userData?.profilePic})`,
          }}
        ></div>
        <img
          src={userData.profilePic ? `${userData.profilePic}` : AvatarLogo}
          alt={userData.username}
        />

        <div className="profile-main">
          <div className="profile-user">
            <span>ID:{userData._id}</span>
            <span>
              username:<b>{userData.username}</b>
            </span>
            <span>
              email: <b>{userData.email}</b>
            </span>
            <span>
              status: <b>premium</b>
            </span>
          </div>
          <h1>favorite movies:</h1>

          <div className="column">
            {movies.length > 0 ? (
              movies.map((movie) => {
                console.log(movie);
                return (
                  <div
                    className="columnItem"
                    key={movie._id}
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(19, 18, 18, 0.10) 88%, rgba(19, 18, 18, 0.900) 12%),url(${movie.img})`,
                    }}
                  >
                    <Link to={`/movie/${movie._id}`}>
                      <div className="itemOnHover">
                        <h2>watch this movie</h2>
                      </div>
                    </Link>

                    <div className="itemsMain">
                      <div className="itemCredentials">
                        <p>{movie.title}</p>
                        <span>
                          <Rating
                            style={{ fontSize: "25px" }}
                            name="read-only"
                            value={Math.round(movie.overall * 2) / 2}
                            readOnly
                            precision={0.5}
                            emptyIcon={
                              <StarOutlineIcon
                                style={{ fontSize: "25px", color: "white" }}
                                className="staroutline"
                              ></StarOutlineIcon>
                            }
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="nofavourite">
                <div>there is no movies that you liked</div>
                <Link to="/">Find Favourite Movies</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
