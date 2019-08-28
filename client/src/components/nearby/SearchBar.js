import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }
  handleClick() {
    this.props.data.refetch({ address: this.state.address });
  }
  render() {
    return (
      <div className="searchbar">
        <Container>
          <Row>
            <div className="wrapper">
              <div className="full-input" style={{ width: "300px" }}>
                <i className="fas fa-map-marker-alt" />
                <input
                  type="text"
                  placeholder="Address"
                  onChange={e => this.setState({ address: e.target.value })}
                />
              </div>

              <button
                className="btn-red"
                style={{ marginLeft: "13px", marginBottom: "8px" }}
                onClick={() => this.handleClick()}
              >
                Search
              </button>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SearchBar;
