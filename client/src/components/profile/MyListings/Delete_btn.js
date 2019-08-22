import React, { Component } from "react";
import { graphql } from "react-apollo";
import { DeleteProperty } from "../../../mutations/Property";

class Delete_btn extends Component {
  handleClick() {
    this.props.mutate({
      variables: {
        property_id: this.props.property_id
      }
    });
  }
  render() {
    return (
      <div className="btn-icon" onClick={() => this.handleClick()}>
        <i className="far fa-trash-alt" />
      </div>
    );
  }
}

export default graphql(DeleteProperty)(Delete_btn);
