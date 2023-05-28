import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useEffect } from "react";
import { useState } from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { logout } from "../../authContext/apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";
import Rating from "@mui/material/Rating";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AvatarLogo from "../../assets/avatar.svg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [searchTimeout, setSearchTimeout] = useState(false);
  const [dataSearch, setDataSearch] = useState(null);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    const handleScroll = (event) => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    logout(dispatch);
    window.location = "/login";
  };
  const searchRes = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/movies/search?search=${query}`,
      {
        headers: {
          token:
            `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    setDataSearch(res.data);
  };
  const searchHandler = async (e) => {
    setQuery(e.target.value);
    if (searchTimeout != false) {
      clearTimeout(searchTimeout);
    }
    if (e.target.value != "") {
      setSearchTimeout(
        setTimeout(
          (value) => {
            searchRes();
          },
          500,
          e.target.value
        )
      );
    } else {
      console.log("err");
    }
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <NavLink to="/" className="link">
            <span>Homepage</span>
          </NavLink>
          <NavLink to="/series" className="link">
            <span>Series</span>
          </NavLink>
          <NavLink to="/movies" className="link">
            <span>Movies</span>
          </NavLink>
          <NavLink to="/liked" className="link">
            <span>My List</span>
          </NavLink>
        </div>
        <div className="right">
          {isSearchBarOpen && (
            <input
              type="text"
              placeholder="Search..."
              className="search-bar"
              onChange={searchHandler}
            />
          )}
          {dataSearch?.length > 0 && isSearchBarOpen ? (
            <div className="dropdownData">
              {dataSearch.map((movie) => {
                let overall = 0;
                let hasValue = 0;
                movie.score.forEach((element) => {
                  if (element.value) {
                    overall = overall + element.value;
                    hasValue = hasValue + 1;
                  }
                });
                movie.overall = overall / hasValue;
                return (
                  <NavLink to={`/movie/${movie._id}`} className="dropdownItem">
                    <img src={movie.img} alt={movie.title} />
                    <div className="itemCredentials">
                      <div>
                        <h1>{movie.title}</h1>
                        <p>prod:{movie.year}</p>
                      </div>
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
                    </div>
                  </NavLink>
                );
              })}
            </div>
          ) : (
            ""
          )}
          <span onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}>
            <Search className="icon" />
          </span>
          <span>{JSON.parse(localStorage.getItem("user")).username}</span>
          <Notifications className="icon" />
          <NavLink
            to={`/profile/${JSON.parse(localStorage.getItem("user"))._id}`}
          >
            <img
              src={`${
                JSON.parse(localStorage.getItem("user")).picture
                  ? JSON.parse(localStorage.getItem("user")).picture
                  : AvatarLogo
              }  `}
              alt=""
            />
          </NavLink>
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>
                <NavLink
                  to={`/settings`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Settings
                </NavLink>
              </span>
              <span onClick={handleLogout}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
