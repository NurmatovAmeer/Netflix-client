import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../config";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import axios from "axios";
import "./cast.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListItem from "../../components/listItem/ListItem";

export default function AboutCast() {
  const location = useParams().id;
  const [cast, setCast] = useState([]);
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const listRef = useRef();
  useEffect(() => {
    const getCast = async () => {
      const res = await axios.get(`${API_URL}casts/find/` + location, {
        headers: {
          token:
            `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setCast(res.data);
    };
    getCast();
  }, [location]);
  console.log(cast);
  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${225 + distance}px)`;
    }
    if (
      direction === "right" &&
      slideNumber < Math.round(cast.movies?.length - 6)
    ) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-235 + distance}px)`;
    }
  };
  console.log(slideNumber);
  return (
    <>
      <div className="castContainer">
        <Link to="/" className="back">
          <ArrowBackIcon />
          Back to Menu
        </Link>
        <div className="castCredentials">
          <div className="castImage">
            <img src={`${cast.picture}`} alt={`${cast.fullname}`} />
          </div>
          <div className="castAbout">
            <h1>{cast.fullname}</h1>
            <p>{cast.about}</p>
          </div>
        </div>
        <div className="listCast">
          <p className="listTitleCast">
            acted in {cast.movies ? cast.movies.length : 0} movies
          </p>
          <div className="wrapperCast">
            <ArrowBackIosOutlined
              className="sliderArrow left"
              onClick={() => handleClick("left")}
              style={{ display: !isMoved && "none" }}
            />
            <div className="containerCast" ref={listRef}>
              {cast.movies?.length > 0 ? (
                cast.movies.map((item, index) => (
                  <>
                    <ListItem index={index} item={item} key={index} />
                  </>
                ))
              ) : (
                <div className="noMovies"> there is no movies </div>
              )}
            </div>
            <ArrowForwardIosOutlined
              className="sliderArrow right"
              onClick={() => handleClick("right")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
