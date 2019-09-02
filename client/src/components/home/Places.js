import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class Places extends Component {
  render() {
    return (
      <section className="places">
        <Container>
          <div className="title">
            <h2>Find a Place That Fits Your Comfort</h2>
          </div>
          <Row style={{ textAlign: "center" }}>
            <Col md={6}>
              <div className="image-hover-effect">
                <img src="https://demo01.gethomey.io/wp-content/uploads/2018/10/39-2-555x262.jpg" />
                <div class="title">Apartment</div>
              </div>
            </Col>
            <Col md={6}>
              <div className="image-hover-effect">
                <img src="https://demo01.gethomey.io/wp-content/uploads/2018/10/16-4-360x360.jpg" />
                <div class="title">Bed & Breakfast</div>
              </div>
            </Col>{" "}
            <Col md={6}>
              <div className="image-hover-effect">
                <img src="https://demo01.gethomey.io/wp-content/uploads/2018/10/33-360x360.jpg" />
                <div class="title">Condo</div>
              </div>
            </Col>{" "}
            <Col md={6}>
              <div className="image-hover-effect">
                <img src="https://demo01.gethomey.io/wp-content/uploads/2018/10/10-7-360x360.jpg" />
                <div class="title">House</div>
              </div>
            </Col>
            <Col md={6}>
              <div className="image-hover-effect">
                <img src="https://demo01.gethomey.io/wp-content/uploads/2018/10/20-360x360.jpg" />
                <div class="title">Loft</div>
              </div>
            </Col>
            <Col md={6}>
              <div className="image-hover-effect">
                <img src="https://demo01.gethomey.io/wp-content/uploads/2018/10/15-555x262.jpg" />
                <div class="title">Studio</div>
              </div>
            </Col>
          </Row>
          <button
            className="btn-red"
            style={{ marginBottom: "22px" }}
            onClick={() => this.props.history.push("/listing")}
          >
            Find More Places To Rent
          </button>
        </Container>
      </section>
    );
  }
}

export default withRouter(Places);
