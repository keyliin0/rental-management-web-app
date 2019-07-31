import React, { Component } from "react";
import Properties from "./Properties";
import { Container, Row, Col } from "react-bootstrap";

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
  }
  LoadMore() {
    const { Properties } = this.props;
    Properties.fetchMore({
      variables: { page: this.state.page },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          Properties: [...prev.Properties, ...fetchMoreResult.Properties]
        });
      }
    });
    this.setState({ page: this.state.page + 1 });
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
          <Properties Properties={this.props.Properties} />
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
