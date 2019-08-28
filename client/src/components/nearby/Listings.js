import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Properties from "../listing/Properties";

class Listings extends Component {
  renderContent() {
    if (this.props.data.loading)
      return (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" />
        </div>
      );
    return <Properties Properties={this.props.data.Properties} />;
  }
  render() {
    return (
      <section className="listings" style={{ minHeight: "85vh" }}>
        <Container>
          <Row>
            <Col>
              <div className="title">
                <h1>Listing</h1>
              </div>
            </Col>
          </Row>
          {this.renderContent()}
        </Container>
      </section>
    );
  }
}

export default Listings;
