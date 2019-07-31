import React, { Component } from "react";
import SearchBar from "./SearchBar";
import Listings from "./Listings";
import { graphql } from "react-apollo";
import { PropertiesQuery } from "../../queries/Property";

class Listing extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <Listings Properties={this.props.data} />
      </div>
    );
  }
}

export default graphql(PropertiesQuery)(Listing);
