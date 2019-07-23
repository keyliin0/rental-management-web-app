import React from "react";
import { Col } from "react-bootstrap";

const Property = () => {
  return (
    <Col md={4}>
      <div className="property">
        <div className="thumbnail image-hover-effect">
          <img src="//89239-660555-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2018/10/27-450x300.jpg" />
          <div class="title">185$/night</div>
        </div>
        <div className="info">
          <div className="name">
            <h2>Modern Apartment With Ocean View</h2>
          </div>
          <div className="address">
            <address>4725 Collins Ave, Miami Beach, FL 33140</address>
          </div>
          <div className="amenities">
            <ul>
              <li>
                <i className="fas fa-bed" /> 4 Bedrooms
              </li>
              <li>
                <i className="fas fa-shower" /> 2 Baths
              </li>
              <li>
                <i className="fas fa-shower" /> 6 Guests
              </li>
            </ul>
          </div>
          <div className="type">House</div>
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
      </div>
    </Col>
  );
};

export default Property;
