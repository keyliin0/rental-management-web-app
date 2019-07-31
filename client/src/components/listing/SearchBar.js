import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const SearchBar = () => {
  return (
    <div className="searchbar">
      <Container>
        <Row>
          <div className="wrapper">
            <div className="full-input" style={{ width: "300px" }}>
              <i className="fas fa-map-marker-alt" />
              <input type="text" placeholder="Where to go?" />
            </div>
            <div className="full-input" style={{ marginLeft: "13px" }}>
              <i className="far fa-calendar-minus" />
              <input type="text" placeholder="Arrive" />
            </div>
            <div className="full-input" style={{ marginLeft: "13px" }}>
              <i className="far fa-calendar-minus" />
              <input type="text" placeholder="Depart" />
            </div>
            <button
              className="btn-red"
              style={{ marginLeft: "13px", marginBottom: "8px" }}
            >
              Search
            </button>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default SearchBar;
