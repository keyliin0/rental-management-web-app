import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { graphql } from "react-apollo";
import { ReservationQuery } from "../../../queries/Reservation";
import Reservation from "./Reservation";
import _ from "lodash";

class Reservations extends Component {
  renderReservations() {
    return _.map(this.props.data.Reservations, reservation => {
      return <Reservation key={reservation._id} reservation={reservation} />;
    });
  }
  render() {
    console.log(this.props.data.Reservations);
    return (
      <div className="reservations">
        <div className="title">
          <h1>Reservations</h1>
        </div>
        <div>
          <h5>My Reservations</h5>
          <div className="content">
            <Row className="header">
              <Col xs={3}>ID</Col>
              <Col xs={2}>Status</Col>
              <Col xs={1}>Date</Col>
              <Col xs={2}>Address</Col>
              <Col xs={1}>Check-in</Col>
              <Col xs={1}>Check-out</Col>
              <Col xs={1}>Total</Col>
              <Col xs={1}>Actions</Col>
            </Row>
            {this.renderReservations()}
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(ReservationQuery)(Reservations);
