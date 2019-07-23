import React from "react";
import Header from "../Header";
import Banner from "./Banner";
import Trending from "./Trending";
import Places from "./Places";
import Footer from "../Footer";

const Home = () => {
  return (
    <div>
      <Banner />
      <Trending />
      <Places />
    </div>
  );
};

export default Home;
