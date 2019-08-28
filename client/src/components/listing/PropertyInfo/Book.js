import React, { Component } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateReservation } from "../../../mutations/Reservation";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import _ from "lodash";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: undefined,
      startDate: null,
      endDate: null,
      loading: false,
      errors: []
    };
  }
  RenderErrors() {
    return _.map(this.state.errors, error => {
      return (
        <Alert key={error} variant="danger">
          {error}
        </Alert>
      );
    });
  }
  handleClick() {
    this.setState({ loading: true });
    this.props
      .mutate({
        variables: {
          checkin: Date.parse(this.state.startDate),
          checkout: Date.parse(this.state.endDate),
          guests: this.state.guests,
          pets: true,
          property_id: this.props.Property._id
        }
      })
      .then(() => {
        this.props.history.push("/profile/reservations");
        this.setState({ loading: false });
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors, loading: false });
      });
  }
  render() {
    return (
      <Col md={4}>
        <div className="book">
          <div className="price">{this.props.Property.price}$/night</div>
          <div className="errors">{this.RenderErrors()}</div>
          <div className="date">
            <div className="full-input">
              <i className="far fa-calendar-minus" />
              <DatePicker
                selected={this.state.startDate}
                placeholderText="Arrive"
                onChange={date => this.setState({ startDate: date })}
              />
            </div>

            <div className="full-input">
              <i className="far fa-calendar-minus" />
              <DatePicker
                selected={this.state.endDate}
                placeholderText="Depart"
                onChange={date => this.setState({ endDate: date })}
              />
            </div>
          </div>
          <div className="guests">
            <div className="full-input">
              <i className="far fa-user" />
              <input
                type="number"
                placeholder="Guests"
                value={this.state.guests}
                onChange={e =>
                  this.setState({ guests: parseInt(e.target.value) })
                }
              />
            </div>
          </div>
          {!this.state.loading ? (
            <button className="btn-red" onClick={() => this.handleClick()}>
              Send a request
            </button>
          ) : (
            <div style={{ textAlign: "center" }}>
              <Spinner animation="border" />
            </div>
          )}
        </div>
      </Col>
    );
  }
}

export default graphql(CreateReservation)(withRouter(Book));
