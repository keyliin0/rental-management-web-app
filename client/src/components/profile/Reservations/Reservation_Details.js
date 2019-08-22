import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { graphql } from "react-apollo";
import { ReservationQuery } from "../../../queries/Reservation";
import moment from "moment";

class Reservation_Details extends Component {
  render() {
    const reservation = this.props.data.Reservation;
    if (!reservation)
      return (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="grow" />
        </div>
      );
    return (
      <div className="reservation_details section-to-print">
        <Row>
          <Col xs={12}>
            <div className="header">
              <h1>Reservation #{reservation._id}</h1>
              <span className={"span-status span-" + reservation.status}>
                {reservation.status}
              </span>
              <div className="btn-icon" onClick={() => window.print()}>
                <i className="fas fa-print" />
              </div>
            </div>
          </Col>
        </Row>
        <Container>
          <Row className="content">
            <Col xs={4}>
              <div>
                <b>Date : </b>
              </div>
              <div>{moment(reservation.date).format("MMMM Do YYYY h:mma")}</div>
            </Col>
            <Col xs={4}>
              <div>
                <b>From : </b>
                {reservation.owner.firstname + " " + reservation.owner.lastname}
              </div>
              <div>{reservation.address}</div>
            </Col>
            <Col xs={4}>
              <div>
                <img
                  width={60}
                  height={60}
                  src={reservation.user.imgURL}
                  className="rounded-circle"
                />
              </div>
              <div>
                {reservation.user.firstname + " " + reservation.user.lastname}
              </div>
            </Col>
          </Row>
          <Row className="content">
            <Col xs={4}>
              <h5>
                <b>Details</b>
              </h5>
            </Col>
            <Col xs={4}>
              <div>
                Check In : <b>{moment(reservation.checkin).format("l")}</b>
              </div>
              <div>
                Check Out : <b>{moment(reservation.checkout).format("l")}</b>
              </div>
            </Col>
            <Col xs={4}>
              <div>
                Night : <b>0</b>
              </div>
              <div>
                Guest : <b>0</b>
              </div>
              <div>
                Total : <b>{reservation.total}$</b>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default graphql(ReservationQuery, {
  options: props => {
    return { variables: { id: props.match.params.id } };
  }
})(Reservation_Details);
