import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Map, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import _ from "lodash";

const DEFAULT_CENTER = [51.505, -0.09];

class OsmMap extends Component {
  renderMarkers() {
    const { Properties } = this.props;
    return _.map(Properties, property => {
      if (property.location.coordinates)
        return (
          <Marker position={property.location.coordinates.reverse()}>
            <Popup>
              <a href={"/listing/" + property._id}>
                <b>{property.price}$/night</b>
                <br />
                <i className="fas fa-map-marker-alt"></i> {property.address}
              </a>
            </Popup>
          </Marker>
        );
    });
  }
  render() {
    const { Properties } = this.props;
    if (!Properties)
      return (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="grow" />
        </div>
      );

    return (
      <Map
        center={
          Properties[0].location.coordinates
            ? Properties[0].location.coordinates
            : DEFAULT_CENTER
        }
        zoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="topright" />
        {this.renderMarkers()}
      </Map>
    );
  }
}

export default OsmMap;
