import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ImageViewer from "./ImageViewer";
import Book from "./Book";

const propertyinfo = () => {
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
                <h1 className="name float-left">Confortable Room</h1>
                <div className="host-avatar float-right">
                  <img
                    width={60}
                    height={60}
                    src="//89239-660555-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2018/10/HomeyHost02_a-150x150.jpg"
                  />
                </div>
                <div className="clearfix" />
                <address>
                  <i className="fas fa-map-marker-alt" />
                  3700 Pine Tree Dr, Miami Beach, FL 33140
                </address>
                <div className="stars">
                  <ul>
                    <li>
                      <i className="fas fa-star yellow" />
                    </li>
                    <li>
                      <i className="fas fa-star yellow" />
                    </li>
                    <li>
                      <i className="fas fa-star yellow" />
                    </li>
                    <li>
                      <i className="far fa-star " />
                    </li>
                    <li>
                      <i className="far fa-star" />
                    </li>
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
                    <strong>Private Room / Bed Breakfast</strong>
                  </div>
                </div>
                <div className="block">
                  <div className="icon">
                    <i className="fa fa-user" />
                  </div>
                  <div>Accomodation</div>
                  <div>
                    <strong>2 Guests</strong>
                  </div>
                </div>
                <div className="block">
                  <div className="icon">
                    <i className="fa fa-bed" />
                  </div>
                  <div>Bedrooms</div>
                  <div>
                    <strong>1 Bedrooms / 1 Beds</strong>
                  </div>
                </div>
                <div className="block">
                  <div className="icon">
                    <i className="fa fa-shower" />
                  </div>
                  <div>Bathrooms</div>
                  <div>
                    <strong>1 Full</strong>
                  </div>
                </div>
              </div>
              <div className="description">
                <h1 className="title">Description</h1>Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Morbi est quam, volutpat et
                arcu eu, pharetra congue augue. Integer vel nibh eu eros
                interdum commodo. Vivamus finibus fringilla libero, id
                consectetur purus sollicitudin vel. Proin dapibus ante et
                pharetra luctus. Ut lacinia ante ut nunc pellentesque auctor.
                Proin laoreet erat sed ornare molestie. Fusce vehicula ut nulla
                facilisis vulputate. Quisque vel purus ac lectus tempus viverra.
                Maecenas at sem at erat pellentesque hendrerit nec in massa.
                Vestibulum nec lacinia dui, a congue ex. Vivamus ac ultricies
                mauris. Suspendisse commodo tempus suscipit. Nunc malesuada eu
                tortor in hendrerit.
              </div>
              <ImageViewer />
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
          <Book />
        </Row>
      </Container>
    </div>
  );
};

export default propertyinfo;
