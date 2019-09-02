import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import CurrentUser from "./HOC/Current_user";

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
                {!this.props.user ? (
                  <li>
                    <a href="/auth/google">Login</a>
                  </li>
                ) : (
                  <li
                    onClick={() => this.props.history.push("/profile/listings")}
                  >
                    Profile
                  </li>
                )}
              </ul>
            </Col>
          </Row>
        </Container>
      </header>
    );
  }
}

export default withRouter(CurrentUser(Header));
