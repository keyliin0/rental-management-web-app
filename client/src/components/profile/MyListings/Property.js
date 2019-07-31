import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

class Property extends Component {
  render() {
    const { property } = this.props;
    return (
      <Row className="property">
        <Col xs={2}>
          <div className="outer">
            <div className="inner">
              <Image src={property.images[0]} fluid />
            </div>
          </div>
        </Col>
        <Col xs={3}>
          <div className="outer">
            <div className="inner">
              <div className="name">{property.name}</div>
              <div className="address">{property.address}</div>
            </div>
          </div>
        </Col>
        <Col xs={2}>
          <div className="outer">
            <div className="inner">Type</div>
          </div>
        </Col>
        <Col xs={2}>
          <div className="outer">
            <div className="inner">
              <div className="price">{property.price}$/night</div>{" "}
            </div>
          </div>
        </Col>
        <Col xs={3}>
          <div className="outer">
            <div className="inner">
              <div className="btn-icon">
                <i className="fas fa-pen" />
              </div>
              <div className="btn-icon">
                <i className="far fa-trash-alt" />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
export default Property;
