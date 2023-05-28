import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import SideNavigation from "../../components/sidebar/SideBar";
import AvatarLogo from "../../assets/avatar.svg";
import "./settings.scss";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import { notify } from "../../utils/Toaster";
import { ToastContainer } from "react-toastify";

const Settings = () => {
  const location = JSON.parse(localStorage.getItem("user"))._id;
  const [userData, setUserData] = useState([]);
  const [permissions, setPermissions] = useState({
    settings: JSON.parse(localStorage.getItem("user"))._id == location,
    fordevs: JSON.parse(localStorage.getItem("user")).isAdmin,
  });
  const [uploaded, setUploaded] = useState(0);
  const [img, setImg] = useState(null);
  const [newUser, setNewUser] = useState(null);
  const [fetch, reFetch] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${API_URL}users/find/` + location, {
        headers: {
          token:
            `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setUserData(res.data);
    };
    getUser();
  }, [fetch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setNewUser({ ...newUser, [e.target.name]: value });
  };

  const upload = (item) => {
    const fileName = new Date().getTime() + "img" + item.name;
    const storageRef = ref(storage, `/items/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, item);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setNewUser((prev) => {
            return { ...prev, profilePic: url };
          });
        });
        setUploaded((prev) => prev + 1);
      }
    );
  };

  const handleSubmit = async (user) => {
    if (!newUser?.username && !newUser?.email && newUser.profilePic) {
      notify("type your changings in text areas", "error", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      await axios.put(`http://localhost:8080/api/users/` + location, user, {
        headers: {
          token:
            `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      reFetch(!fetch);
      setNewUser(null);
      notify("user has changed", "success", {
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
    <>
      <ToastContainer />
      <SideNavigation
        permissions={permissions}
        location={location}
        active="settings"
      />
      <div className="settingsContainer">
        <div className="mainSettings">
          <div className="settingsUser">
            <div className="settingsImage">
              <img
                src={
                  userData.profilePic ? `${userData.profilePic}` : AvatarLogo
                }
                alt={userData.username}
              />
              <label htmlFor="setImg">
                <CameraAltOutlinedIcon
                  style={{ color: "white" }}
                ></CameraAltOutlinedIcon>
              </label>
            </div>
            <input
              type="file"
              id="setImg"
              style={{ display: "none" }}
              name="img"
              onChange={(e) => setImg(e.target.files[0])}
            />
            <div className="settingsCredentials">
              <input
                type="text"
                name="username"
                placeholder={`${userData.username}`}
                onChange={handleChange}
              />
              <input
                type="text"
                name="email"
                placeholder={`${userData.email}`}
                onChange={handleChange}
              />
            </div>
            <div className="settingsUpd">
              {uploaded === 1 || !img ? (
                <button
                  className="settingsButton"
                  onClick={() => handleSubmit(newUser)}
                >
                  Update
                </button>
              ) : (
                <button className="settingsButton" onClick={() => upload(img)}>
                  Upload
                </button>
              )}
              <button
                className="settingsButton"
                onClick={() =>
                  handleSubmit({
                    profilePic: "",
                    username: userData.username,
                    email: userData.email,
                  })
                }
              >
                delete Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Settings;
