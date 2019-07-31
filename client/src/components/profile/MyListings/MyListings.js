import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { graphql } from "react-apollo";
import { MyPropertiesQuery } from "../../../queries/Property.js";
import _ from "lodash";
import Property from "./Property";

class MyListings extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
  }
  LoadMore() {
    this.props.data.fetchMore({
      variables: { page: this.state.page },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          MyProperties: [...prev.MyProperties, ...fetchMoreResult.MyProperties]
        });
      }
    });
    this.setState({ page: this.state.page + 1 });
  }
  renderProperties() {
    if (!this.props.data.MyProperties) {
      return (
        <div className="propertyinfo" style={{ textAlign: "center" }}>
          <Spinner animation="grow" />
        </div>
      );
    }
    return _.map(this.props.data.MyProperties, property => {
      return <Property key={property._id} property={property} />;
    });
  }
  render() {
    return (
      <div className="mylistings">
        <div className="title">
          <h1>My Listing</h1>
        </div>
        <div className="content">
          <Row className="header">
            <Col xs={2}>Thumbnail</Col>
            <Col xs={3}>Address</Col>
            <Col xs={2}>Type</Col>
            <Col xs={2}>Price</Col>
            <Col xs={3}>Actions</Col>
          </Row>
          {this.renderProperties()}
        </div>
        <div className="loadmore">
          <button className="btn-red" onClick={() => this.LoadMore()}>
            Load More
          </button>
        </div>
      </div>
    );
  }
}
export default graphql(MyPropertiesQuery)(MyListings);
