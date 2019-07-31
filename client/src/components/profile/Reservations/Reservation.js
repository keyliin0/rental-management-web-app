import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import moment from "moment";

const renderDate = date => {
  return moment(date).format("l");
};

const Reservation = ({ reservation }) => {
  return (
    <Row className="reservation">
      <Col xs={3}>
        <div className="inner">{reservation._id}</div>
      </Col>
      <Col xs={2}>
        <div className="inner">{reservation.status}</div>
      </Col>
      <Col xs={1}>
        <div className="inner">{renderDate(reservation.date)}</div>
      </Col>
      <Col xs={2}>
        <div className="inner">{reservation.address}</div>
      </Col>
      <Col xs={1}>
        <div className="inner">{renderDate(reservation.checkin)}</div>
      </Col>
      <Col xs={1}>
        <div className="inner">{renderDate(reservation.checkout)}</div>
      </Col>
      <Col xs={1}>
        <div className="inner">{reservation.total}$</div>
      </Col>
      <Col xs={1}>Actions</Col>
    </Row>
  );
};

export default Reservation;
