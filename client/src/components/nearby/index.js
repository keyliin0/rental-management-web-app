import React, { Component } from "react";
import OsmMap from "./OsmMap";
import SearchBar from "./SearchBar";
import Listings from "./Listings";
import { PropertiesQuery } from "../../queries/Property";
import { graphql } from "react-apollo";
import { Col, Row } from "react-bootstrap";

class Nearby extends Component {
  render() {
    return (
      <Row className="nearby">
        <Col md={5} className="col">
          {" "}
          <OsmMap Properties={this.props.data.Properties} />{" "}
        </Col>
        <Col md={7} className="col">
          <Row className="listing_wrapper">
            <Col xs={12}>
              <SearchBar data={this.props.data} />
            </Col>
            <Col xs={12}>
              <Listings data={this.props.data} />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default graphql(PropertiesQuery)(Nearby);
