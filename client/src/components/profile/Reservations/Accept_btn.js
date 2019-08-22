import React, { Component } from "react";
import { graphql } from "react-apollo";
import { ChangeStatusReservation } from "../../../mutations/Reservation";

class Accept_btn extends Component {
  handleClick() {
    this.props.mutate({
      variables: {
        reservation_id: this.props.reservation_id,
        status: "confirmed"
      }
    });
  }
  render() {
    return (
      <div className="btn-icon" onClick={() => this.handleClick()}>
        <i className="far fa-check-circle" />
      </div>
    );
  }
}

export default graphql(ChangeStatusReservation)(Accept_btn);
