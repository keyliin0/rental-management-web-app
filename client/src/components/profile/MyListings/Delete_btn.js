import React, { Component } from "react";
import { graphql } from "react-apollo";
import { DeleteProperty } from "../../../mutations/Property";

class Delete_btn extends Component {
  constructor(props) {
    super(props);
    this.state = { deleted: false };
  }
  handleClick() {
    this.props.mutate({
      variables: {
        property_id: this.props.property_id
      }
    });
    this.setState({ deleted: true });
  }
  render() {
    if (this.state.deleted) return <div>Deleted</div>;
    return (
      <div className="btn-icon" onClick={() => this.handleClick()}>
        <i className="far fa-trash-alt" />
      </div>
    );
  }
}

export default graphql(DeleteProperty)(Delete_btn);
