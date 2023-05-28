import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const app = initializeApp({
  apiKey: "AIzaSyCosuWnROV2eq4lzRhhK6XTQbelx2z23WQ",
  authDomain: "netflix-27f44.firebaseapp.com",
  projectId: "netflix-27f44",
  storageBucket: "netflix-27f44.appspot.com",
  messagingSenderId: "64927495608",
  appId: "1:64927495608:web:44a8041e1151db51064b4d",
  measurementId: "G-N260N382N3",
});
const storage = getStorage(app);
export default storage;
