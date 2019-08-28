import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      startDate: null,
      endDate: null
    };
  }
  handleClick() {
    this.props.history.push(
      "/listing/" +
        this.state.city +
        "/" +
        Date.parse(this.state.startDate) +
        "/" +
        Date.parse(this.state.endDate)
    );
    // reset page number when making a new search
    this.props.updatePage(1);
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
                  placeholder="Where to go?"
                  value={this.state.city}
                  onChange={e => this.setState({ city: e.target.value })}
                />
              </div>
              <div className="full-input" style={{ marginLeft: "13px" }}>
                <i className="far fa-calendar-minus" />
                <DatePicker
                  selected={this.state.startDate}
                  placeholderText="Arrive"
                  onChange={date => this.setState({ startDate: date })}
                />
              </div>
              <div className="full-input" style={{ marginLeft: "13px" }}>
                <i className="far fa-calendar-minus" />
                <DatePicker
                  selected={this.state.endDate}
                  placeholderText="Depart"
                  onChange={date => this.setState({ endDate: date })}
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

export default withRouter(SearchBar);
