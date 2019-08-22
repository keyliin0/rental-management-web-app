import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";

const currentUserQuery = gql`
  query {
    User {
      _id
      googleId
      firstname
      lastname
      imgURL
    }
  }
`;

export default ComponentToExtend => {
  class CurrentUserHOC extends Component {
    render() {
      const { currentUserData } = this.props;
      if (currentUserData.loading) {
        return false;
      }

      return <ComponentToExtend {...this.props} user={currentUserData.User} />;
    }
  }

  return graphql(currentUserQuery, {
    name: "currentUserData"
  })(withRouter(CurrentUserHOC));
};
