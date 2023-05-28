import { useState } from "react";
import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";

export default function Featured({ type, setGenre }) {
  const [movie, setMovie] = useState({});
  const [isScrolledArrow, setIsScrolledArrow] = useState(false);

  useEffect(() => {
    const getRandomMovie = async () => {
      try {
        const res = await axios.get(`${API_URL}movies/random?type=${type}`, {
          headers: {
            token:
              `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomMovie();
    const handleScroll = (event) => {
      setIsScrolledArrow(window.pageYOffset === 0 ? false : true);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={movie.img} alt={movie.img} />
      <div className="info">
        <img src={movie.imgTitle} alt={movie.imgTItle} />
        <span className="desc">{movie.desc}</span>
        <div className="buttons">
          <Link to={`/movie/${movie._id}`}>
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
      <svg className={isScrolledArrow ? " scrolledarrow" : "arrows"}>
        <path className="a1" d="M0 0 L30 32 L60 0"></path>
        <path className="a2" d="M0 20 L30 52 L60 20"></path>
        <path className="a3" d="M0 40 L30 72 L60 40"></path>
      </svg>
    </div>
  );
}
