import { ArrowBackOutlined } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../config";
import "./watch.scss";

export default function Watch() {
  const [movie, setMovie] = useState({});
  const location = useParams().id;
  console.log(location);
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
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [location]);
  console.log(movie)
  return (
    <>
      <div className="watch">
        <Link to={`/movie/${location}`}>
          <div className="back">
            <ArrowBackOutlined />
            Home
          </div>
        </Link>
        <video className="video" autoPlay controls progress src={movie.video} />
      </div>
    </>
  );
}
