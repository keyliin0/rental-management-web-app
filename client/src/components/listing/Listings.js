import React from "react";
import Properties from "./Properties";
import { Container, Row, Col } from "react-bootstrap";

const Listings = () => {
  return (
    <section className="listings">
      <Container>
        <Row>
          <Col>
            <div className="title">
              <h1>Listing</h1>
            </div>
          </Col>
        </Row>
        <Properties />
        <Row>
          <Col>
            <div className="loadmore">
              <button class="btn-red">Load More</button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Listings;
