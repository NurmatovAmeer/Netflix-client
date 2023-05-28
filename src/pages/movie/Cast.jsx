import axios from "axios";
import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Cast({ item }) {
  const [cast, setCast] = useState({});
  useEffect(() => {
    const getCast = async () => {
      try {
        const res = await axios.get(`${API_URL}casts/find/` + item, {
          headers: {
            token:
              `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setCast(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCast();
  }, [item]);
  return (
    <NavLink to={`/cast/${cast._id}`}>
      <div className="infoCastsItem">
        <div className="infoCastImage">
          <img src={cast.picture} alt={cast.picture} />
        </div>
        <p className="infoCastAbout">{cast.fullname}</p>
      </div>
    </NavLink>
  );
}
