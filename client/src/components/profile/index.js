import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./Navbar";
import AddListing from "./AddListing";
import MyListings from "./MyListings/MyListings";
import Reservations from "./Reservations/Reservations";
import Invoices from "./Invoices";
import Reservation_Details from "./Reservations/Reservation_details/Reservation_Details";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Profile = () => {
  return (
    <Router>
      <div className="profile">
        <Navbar />
        <div className="wrapper">
          <Container>
            <Route exact path="/profile/listings" component={MyListings} />
            <Route exact path="/profile/addlisting" component={AddListing} />
            <Route
              exact
              path="/profile/reservations"
              component={Reservations}
            />
            <Route
              exact
              path="/profile/reservation/:id"
              component={Reservation_Details}
            />
            <Route exact path="/profile/invoices" component={Invoices} />
          </Container>
        </div>
      </div>
    </Router>
  );
};

export default Profile;
