import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Header = () => {
  return (
    <header className="home_nav">
      <Container>
        <Row>
          <Col>
            <ul className="float-right">
              <li>Home</li>
              <li>Listing</li>
              <li>Nearby</li>
              <li>Abous us</li>
              <li>Login</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
