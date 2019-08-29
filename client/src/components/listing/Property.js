import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RenderRating = (sum, count) => {
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
};
const Property = ({ property }) => {
  return (
    <Col md={4}>
      <div className="property">
        <Link to={"/listing/" + property._id}>
          <div className="thumbnail image-hover-effect">
            <img src={property.images[0]} />
            <div className="title">{property.price}$/night</div>
          </div>
        </Link>
        <div className="info">
          <div className="name">
            <h2>{property.name}</h2>
          </div>
          <div className="address">
            <address>{property.address}</address>
          </div>
          <div className="amenities">
            <ul>
              <li>
                <i className="fas fa-bed" /> {property.bedrooms} Bedrooms
              </li>
              <li>
                <i className="fas fa-shower" /> {property.bathrooms} Baths
              </li>
              <li>
                <i className="fas fa-shower" /> {property.guests} Guests
              </li>
            </ul>
          </div>
          <div className="type">{property.type}</div>
          <div className="stars">
            <ul>{RenderRating(property.rating.sum, property.rating.count)}</ul>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default Property;
