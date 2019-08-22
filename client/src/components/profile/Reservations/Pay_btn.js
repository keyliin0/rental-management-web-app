import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { graphql } from "react-apollo";
import { CreateInvoice } from "../../../mutations/Invoice.js";

class Pay_btn extends Component {
  async handleToken(token) {
    this.props.mutate({
      variables: {
        reservation_id: this.props.reservation_id,
        token_id: token.id
      }
    });
  }
  render() {
    return (
      <StripeCheckout
        name="reservation"
        description={"reservation_id : " + this.props.reservation_id}
        amount={this.props.amount * 100}
        token={token => this.handleToken(token)}
        stripeKey={"pk_test_rxxms3Gl4YzAr4EJ7OSPKrOH"}
      >
        <div className="btn-icon">
          <i className="far fa-credit-card" />
        </div>
      </StripeCheckout>
    );
  }
}

export default graphql(CreateInvoice)(Pay_btn);
