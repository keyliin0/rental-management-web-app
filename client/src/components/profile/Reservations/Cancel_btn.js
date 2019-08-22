import React, { Component } from "react";
import { graphql } from "react-apollo";
import { ChangeStatusReservation } from "../../../mutations/Reservation";

class Cancel_btn extends Component {
  handleClick() {
    this.props.mutate({
      variables: {
        reservation_id: this.props.reservation_id,
        status: "cancelled"
      }
    });
  }
  render() {
    return (
      <div className="btn-icon" onClick={() => this.handleClick()}>
        <i className="fas fa-ban" />
      </div>
    );
  }
}

export default graphql(ChangeStatusReservation)(Cancel_btn);
