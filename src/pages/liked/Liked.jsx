import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { API_URL } from "../../config";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import "./liked.scss";
import { Link } from "react-router-dom";

export default function Liked() {
  const [movies, setMovies] = useState([]);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          `${API_URL}movies/liked/${
            JSON.parse(localStorage.getItem("user"))._id
          }`,
          {
            headers: {
              token:
                `Bearer ` +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [refetch]);
  console.log(movies);
  const unliked = async (movieId, e) => {
    try {
      await axios.put(
        `${API_URL}users/${
          JSON.parse(localStorage.getItem("user"))._id
        }?type=unliked`,
        { liked: movieId },
        {
          headers: {
            token:
              `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      setRefetch(refetch + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="likedContainer">
        <div className="column">
          {movies.length > 0 ? (
            movies.map((movie) => {
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
                    <div className="itemActions">
                      <button
                        className="itemActionsItemCircle"
                        onClick={() => unliked(movie._id)}
                      >
                        <FavoriteIcon style={{ color: "red" }} />
                      </button>
                    </div>

                    <div className="divider"></div>

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
      <Footer />
    </>
  );
}
