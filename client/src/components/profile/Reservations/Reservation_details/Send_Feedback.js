import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { graphql } from "react-apollo";
import { RateReservation } from "../../../../mutations/Reservation";

class SendFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = { rate: 0 };
  }
  renderStars() {
    return [...Array(5)].map((n, i) => (
      <li key={i} onClick={() => this.setState({ rate: i + 1 })}>
        <i
          style={{ cursor: "pointer" }}
          className={i < this.state.rate ? "fas fa-star yellow" : "far fa-star"}
        />
      </li>
    ));
  }
  handleSubmit() {
    if (this.state.rate != 0) {
      this.props.mutate({
        variables: {
          reservation_id: this.props.reservation_id,
          rate: this.state.rate
        }
      });
    }
  }
  render() {
    if (this.props.rated) return <div></div>;
    return (
      <div className="feedback">
        <div className="stars">
          <ul>{this.renderStars()}</ul>
        </div>
        <button
          type="submit"
          className="btn-red"
          onClick={() => this.handleSubmit()}
        >
          Send Feedback
        </button>
      </div>
    );
  }
}

export default graphql(RateReservation)(SendFeedback);
