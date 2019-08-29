import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Property from "./Property";
import _ from "lodash";

class Properties extends Component {
  renderProperties() {
    const { Properties } = this.props;
    if (!Properties)
      return (
        <div style={{ textAlign: "center", margin: "auto" }}>
          <Spinner animation="grow" />
        </div>
      );
    return _.map(Properties, property => {
      return <Property property={property} key={property._id} />;
    });
  }
  render() {
    return <Row className="properties">{this.renderProperties()}</Row>;
  }
}

export default Properties;
