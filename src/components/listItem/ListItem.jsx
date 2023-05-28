import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    let isMounted = true;

    const getMovieItem = async () => {
      try {
        const res = await axios.get(`${API_URL}movies/find/` + item, {
          headers: {
            token:
              `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        if (isMounted) {
          setMovie(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMovieItem();
    return () => {
      isMounted = false;
    };
  }, [item]);
  return (
    <Link to={`/movie/${movie._id}`}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt={movie.img} />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.title}</div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
