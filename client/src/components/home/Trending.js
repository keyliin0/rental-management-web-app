import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class Trending extends Component {
  render() {
    return (
      <section className="trending">
        <Container>
          <div className="title">
            <h2>Trending Destinations</h2>
          </div>
          <Row style={{ textAlign: "center" }}>
            <Col md={6}>
              <div
                className="image-hover-effect"
                onClick={() =>
                  this.props.history.push("/listing/Los Angeles/NaN/NaN")
                }
              >
                <img src="https://demo01.gethomey.io/wp-content/uploads/2018/10/los-angeles-2-555x360.png" />
                <div class="title">Los Angeles</div>
              </div>
            </Col>
            <Col md={6}>
              <div
                className="image-hover-effect"
                onClick={() =>
                  this.props.history.push("/listing/Miami/NaN/NaN")
                }
              >
                <img src="https://demo01.gethomey.io/wp-content/uploads/2018/10/miami-beach-3-555x360.png" />
                <div class="title">Miami</div>
              </div>
            </Col>{" "}
            <Col md={6}>
              <div
                className="image-hover-effect"
                onClick={() =>
                  this.props.history.push("/listing/New York/NaN/NaN")
                }
              >
                <img src="https://demo01.gethomey.io/wp-content/uploads/2018/10/new-york-2-555x360.png" />
                <div class="title">New York</div>
              </div>
            </Col>{" "}
            <Col md={6}>
              <div
                className="image-hover-effect"
                onClick={() =>
                  this.props.history.push("/listing/San Francisco/NaN/NaN")
                }
              >
                <img src="https://demo01.gethomey.io/wp-content/uploads/2018/10/san-fracisco-2-555x360.jpg" />
                <div class="title">San Francisco</div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default withRouter(Trending);
