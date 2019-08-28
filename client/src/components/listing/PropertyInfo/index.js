import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ImageViewer from "./ImageViewer";
import Book from "./Book";
import { graphql } from "react-apollo";
import { PropertyQuery } from "../../../queries/Property";

class propertyinfo extends Component {
  RenderRating(sum, count) {
    var stars = 0;
    if (count) stars = parseInt(sum / count);
    var arr = [];
    for (var i = 1; i <= stars; i++)
      arr.push(
        <li key={i}>
          <i className="fas fa-star yellow" />
        </li>
      );
    for (var i = stars + 1; i <= 5; i++)
      arr.push(
        <li key={i}>
          <i className="far fa-star " />
        </li>
      );
    return arr;
  }
  render() {
    const { Property } = this.props.data;
    if (this.props.data.loading)
      return (
        <div className="propertyinfo" style={{ textAlign: "center" }}>
          <Spinner animation="grow" />
        </div>
      );
    return (
      <div className="propertyinfo">
        <div className="header-image">
          <img src="//89239-660555-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2018/10/14.jpg" />
        </div>
        <Container>
          <Row>
            <Col md={8}>
              <div className="content">
                <div className="top-title">
                  <h1 className="name float-left"> {Property.name}</h1>
                  <div className="host-avatar float-right">
                    <img width={60} height={60} src={Property.owner.imgURL} />
                  </div>
                  <div className="clearfix" />
                  <address>
                    <i className="fas fa-map-marker-alt" />
                    {Property.address}
                  </address>
                  <div className="stars">
                    <ul>
                      {this.RenderRating(
                        Property.rating.sum,
                        Property.rating.count
                      )}
                    </ul>
                  </div>
                </div>
                <div className="about">
                  <div className="block">
                    <div className="icon">
                      <i className="fa fa-home" />
                    </div>
                    <div>Type</div>
                    <div>
                      <strong>{Property.type}</strong>
                    </div>
                  </div>
                  <div className="block">
                    <div className="icon">
                      <i className="fa fa-user" />
                    </div>
                    <div>Accomodation</div>
                    <div>
                      <strong>{Property.guests} Guests</strong>
                    </div>
                  </div>
                  <div className="block">
                    <div className="icon">
                      <i className="fa fa-bed" />
                    </div>
                    <div>Bedrooms</div>
                    <div>
                      <strong>{Property.bedrooms} Bedrooms </strong>
                    </div>
                  </div>
                  <div className="block">
                    <div className="icon">
                      <i className="fa fa-shower" />
                    </div>
                    <div>Bathrooms</div>
                    <div>
                      <strong>{Property.bathrooms} Full</strong>
                    </div>
                  </div>
                </div>
                <div className="description">
                  <h1 className="title">Description</h1>
                  {Property.description}
                </div>
                <ImageViewer images={Property.images} />
                <div className="availability">
                  <div className="title">
                    <h3 className="title">Availability</h3>
                  </div>
                  <ul>
                    <li>
                      <i className="far fa-calendar" />
                      The minimum stay is <strong>2 nights</strong>
                    </li>

                    <li>
                      <i className="far fa-calendar" />
                      The maximum stay is <strong>15 nights</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Book Property={Property} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default graphql(PropertyQuery, {
  options: props => {
    return { variables: { id: props.match.params.id } };
  }
})(propertyinfo);
