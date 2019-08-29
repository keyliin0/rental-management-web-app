import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header className="home_nav">
        <Container>
          <Row>
            <Col>
              <ul className="float-right">
                <li onClick={() => this.props.history.push("/")}>Home</li>
                <li onClick={() => this.props.history.push("/listing")}>
                  Listing
                </li>
                <li onClick={() => this.props.history.push("/nearby")}>
                  Nearby
                </li>
                <li>
                  <a href="/auth/google">Login</a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </header>
    );
  }
}

export default withRouter(Header);
