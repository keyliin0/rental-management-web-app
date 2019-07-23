import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Property from "./Property";

const Properties = () => {
  return (
    <Row className="properties">
      <Property />
      <Property />
      <Property />
      <Property />
      <Property />
    </Row>
  );
};

export default Properties;
