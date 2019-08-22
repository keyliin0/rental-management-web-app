import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import moment from "moment";
import currentUser from "../../HOC/Current_user";
import Accept_btn from "./Accept_btn";
import Cancel_btn from "./Cancel_btn";
import Pay_btn from "./Pay_btn";

const RenderButtons = (reservation, user) => {
  // shows actions depending on the reservation status
  if (reservation.status == "paid" || reservation.status == "cancelled")
    return <div />;
  if (reservation.status == "pending") {
    if (user._id == reservation.owner._id)
      return (
        <div>
          <Accept_btn reservation_id={reservation._id} />
          <Cancel_btn reservation_id={reservation._id} />
        </div>
      );
    else
      return (
        <div>
          <Cancel_btn reservation_id={reservation._id} />
        </div>
      );
  }
  if (reservation.status == "confirmed") {
    if (user._id == reservation.owner._id) return <div />;
    else
      return (
        <div>
          <Pay_btn
            reservation_id={reservation._id}
            amount={reservation.total}
          />
        </div>
      );
  }
};

class Reservation extends Component {
  renderDate(date) {
    return moment(date).format("l");
  }
  render() {
    const { reservation } = this.props;
    return (
      <Row className="reservation">
        <Col xs={3}>
          <div className="outer">
            <div className="inner">{reservation._id}</div>
          </div>
        </Col>
        <Col xs={1}>
          <div className="outer">
            <div className="inner">
              <span className={"span-status span-" + reservation.status}>
                {reservation.status}
              </span>
            </div>
          </div>
        </Col>
        <Col xs={1}>
          <div className="outer">
            <div className="inner">{this.renderDate(reservation.date)}</div>
          </div>
        </Col>
        <Col xs={2}>
          <div className="outer">
            <div className="inner">{reservation.address}</div>
          </div>
        </Col>
        <Col xs={1}>
          <div className="outer">
            <div className="inner">{this.renderDate(reservation.checkin)}</div>
          </div>
        </Col>
        <Col xs={1}>
          <div className="outer">
            <div className="inner">{this.renderDate(reservation.checkout)}</div>
          </div>
        </Col>
        <Col xs={1}>
          <div className="outer">
            <div className="inner total">{reservation.total}$</div>
          </div>
        </Col>
        <Col xs={2}>
          <div className="outer">
            <div className="inner">
              {RenderButtons(reservation, this.props.user)}
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default currentUser(Reservation);
