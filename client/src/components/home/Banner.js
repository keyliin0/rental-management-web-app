import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from "react-router-dom";

class Banner extends Component {
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
  }
  render() {
    return (
      <div className="banner">
        <div className="bg-image" />
        <div className="overlay" />
        <div className="banner-caption">
          <h2 className="banner-title">Book & Experience Amazing Places</h2>
          <p className="banner-subtitle">Try Our Booking Service</p>
          <div>
            <div className="full-input" style={{ width: "300px" }}>
              <i class="fas fa-map-marker-alt" />
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
              style={{ marginLeft: "13px", marginBottom: "5px" }}
              onClick={() => this.handleClick()}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Banner);
