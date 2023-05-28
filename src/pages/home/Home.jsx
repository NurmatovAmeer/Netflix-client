import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";

const Home = ({ type }) => {
  const [lists, setLists] = useState(null);
  const [genre, setGenre] = useState();

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `${API_URL}lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                `Bearer ` +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists != null
        ? lists.map((list) => <List list={list} key={list._id} />)
        : ""}
      <Footer />
    </div>
  );
};

export default Home;
