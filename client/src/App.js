import React from "react";
import "./App.css";
import Home from "./components/home";
import Listing from "./components/listing";
import PropertyInfo from "./components/listing/PropertyInfo/";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/listing" component={Listing} />
      <Route exact path="/listing/:id" component={PropertyInfo} />
      <Footer />
    </Router>
  );
}

export default App;
