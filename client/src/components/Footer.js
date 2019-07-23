import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col md={6}>
            <div className="copyright">
              COPYRIGHT © 2019. ALL RIGHTS RESERVED
            </div>
          </Col>{" "}
          <Col md={6}>
            <div className="icons">
              <div className="icon">
                <i className="fab fa-facebook-f" />
              </div>
              <div className="icon">
                {" "}
                <i className="fab fa-twitter" />
              </div>
              <div className="icon">
                {" "}
                <i className="fab fa-linkedin-in" />
              </div>
              <div className="icon">
                {" "}
                <i className="fab fa-google-plus-g" />
              </div>
              <div className="icon">
                {" "}
                <i className="fab fa-instagram" />
              </div>
              <div className="icon">
                {" "}
                <i className="fab fa-pinterest-p" />
              </div>
              <div className="icon">
                {" "}
                <i className="fab fa-yelp" />
              </div>
              <div className="icon">
                {" "}
                <i className="fab fa-youtube" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
