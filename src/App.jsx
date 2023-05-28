import "./app.scss";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy, useContext, useEffect } from "react";
import { auth } from "./authContext/apiCalls";
import { AuthContext } from "./authContext/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { HomeSkeleton } from "./components/skeleton/HomeSkeleton";
import { AboutSkeleton } from "./components/skeleton/AboutSkeleton";

const Home = lazy(() => import("./pages/home/Home"));
const Movie = lazy(() => import("./pages/movie/Movie"));
const Watch = lazy(() => import("./pages/watch/Watch"));
const Register = lazy(() => import("./pages/register/Register"));
const Login = lazy(() => import("./pages/login/Login"));
const Liked = lazy(() => import("./pages/liked/Liked"));
const AboutCast = lazy(() => import("./pages/cast/AboutCast"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Settings = lazy(() => import("./pages/settings/Settings"));
const Faq = lazy(() => import("./pages/fq/Faq"));

const App = () => {
  const { isAuth, dispatch } = useContext(AuthContext);

  useEffect(() => {
    auth(dispatch);
  }, []);

  return (
    <BrowserRouter>
      {isAuth ? (
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<HomeSkeleton />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/liked"
            element={
              <Suspense fallback={<HomeSkeleton />}>
                <Liked />
              </Suspense>
            }
          />
          <Route
            path="/movies"
            element={
              <Suspense fallback={<HomeSkeleton />}>
                <Home type="movie" />
              </Suspense>
            }
          />
          <Route
            path="/cast/:id"
            element={
              <Suspense fallback={<AboutSkeleton />}>
                <AboutCast />
              </Suspense>
            }
          />
          <Route
            path="/series"
            element={
              <Suspense fallback={<HomeSkeleton />}>
                <Home type="series" />
              </Suspense>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <Suspense fallback={<AboutSkeleton />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/faq/:id"
            element={
              <Suspense fallback={<AboutSkeleton />}>
                <Faq />
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense fallback={<AboutSkeleton />}>
                <Settings />
              </Suspense>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <Suspense fallback={<AboutSkeleton />}>
                <Movie />
              </Suspense>
            }
          />
          <Route
            path="/watch/:id"
            element={
              <Suspense fallback={<div>loading</div>}>
                <Watch />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={
              <Suspense fallback={<HomeSkeleton />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/registration"
            element={
              <Suspense fallback={<HomeSkeleton />}>
                <Register />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
