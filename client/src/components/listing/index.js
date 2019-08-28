import React, { Component } from "react";
import SearchBar from "./SearchBar";
import Listings from "./Listings";
import { graphql } from "react-apollo";
import { PropertiesQuery } from "../../queries/Property";

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
  }
  updatePage = page => {
    this.setState({ page });
  };
  render() {
    return (
      <div>
        <SearchBar updatePage={this.updatePage} />
        <Listings
          Properties={this.props.data}
          page={this.state.page}
          updatePage={this.updatePage}
        />
      </div>
    );
  }
}

export default graphql(PropertiesQuery, {
  options: props => {
    return {
      variables: {
        city: props.match.params.city,
        start_date: parseInt(props.match.params.start),
        end_date: parseInt(props.match.params.end)
      }
    };
  }
})(Listing);
