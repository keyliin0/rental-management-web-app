import React, { Component } from "react";
import Properties from "./Properties";
import { Container, Row, Col } from "react-bootstrap";

class Listings extends Component {
  LoadMore() {
    const { Properties } = this.props;
    Properties.fetchMore({
      variables: { page: this.props.page },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          Properties: [...prev.Properties, ...fetchMoreResult.Properties]
        });
      }
    });
    this.props.updatePage(this.props.page + 1);
  }
  render() {
    return (
      <section className="listings">
        <Container>
          <Row>
            <Col>
              <div className="title">
                <h1>Listing</h1>
              </div>
            </Col>
          </Row>
          <Properties Properties={this.props.Properties.Properties} />
          <Row>
            <Col>
              <div className="loadmore">
                <button className="btn-red" onClick={() => this.LoadMore()}>
                  Load More
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Listings;
