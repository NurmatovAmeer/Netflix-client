import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart,
} from "./AuthActions";
import { API_URL } from "../config";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${API_URL}auth/login`, user);
    res && dispatch(loginSuccess(res.data));

    localStorage.setItem("user", JSON.stringify(res.data));
    console.log(res.data);
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const auth = async (dispatch) => {
  if (JSON.parse(localStorage.getItem("user"))?.accessToken.length > 1) {
    try {
      const res = await axios.get(`${API_URL}auth/auth`, {
        headers: {
          token:
            `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(loginSuccess(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
    }
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutStart());
  localStorage.removeItem("user");
};
