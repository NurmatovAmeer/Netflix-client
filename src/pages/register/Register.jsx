import { useRef } from "react";
import { useState } from "react";
import "./register.scss";
import axios from "axios";
import { API_URL } from "../../config";
import { NavLink } from "react-router-dom";
import { notify } from "../../utils/Toaster";
import { ToastContainer } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  console.log(email, username, password);
  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      await axios.post(`${API_URL}auth/register`, {
        email,
        username,
        password,
      });
      window.location = "/login";
    } catch (err) {
      notify("user with this email or username has already exists", "error", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <div className="register">
      <ToastContainer />
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <NavLink to="/login">
            <b className="loginButton">Sign In</b>
          </NavLink>
          <button
            className="loginButton"
            style={{ marginTop: "100px" }}
            onClick={() => setEmail("")}
          >
            Rewrite email
          </button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="text" placeholder="username" ref={usernameRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
