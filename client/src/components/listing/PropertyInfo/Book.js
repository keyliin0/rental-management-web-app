import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ImageViewer from "./ImageViewer";

const propertyinfo = () => {
  return (
    <Col md={4}>
      <div className="book">
        <div className="price">$70/night</div>
        <div className="date">
          <div className="full-input">
            <i className="far fa-calendar-minus" />
            <input type="text" placeholder="Arrive" />
          </div>

          <div className="full-input">
            <i className="far fa-calendar-minus" />
            <input type="text" placeholder="Depart" />
          </div>
        </div>
        <div className="guests">
          <div className="full-input">
            <i className="far fa-user" />
            <input type="text" placeholder="Guests" />
          </div>
        </div>
        <button className="btn-red">Send a request</button>
      </div>
    </Col>
  );
};

export default propertyinfo;
