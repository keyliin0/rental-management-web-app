import React from "react";

const Banner = () => {
  return (
    <div className="banner">
      <div className="bg-image" />
      <div className="overlay" />
      <div className="banner-caption">
        <h2 className="banner-title">Book & Experience Amazing Places</h2>
        <p className="banner-subtitle">Try Our Booking Service</p>
        <div>
          <div className="full-input" style={{ width: "300px" }}>
            <i class="fas fa-map-marker-alt" />
            <input type="text" placeholder="Where to go?" />
          </div>

          <div className="full-input" style={{ marginLeft: "13px" }}>
            <i className="far fa-calendar-minus" />
            <input type="text" placeholder="Arrive" />
          </div>

          <div className="full-input" style={{ marginLeft: "13px" }}>
            <i className="far fa-calendar-minus" />
            <input type="text" placeholder="Depart" />
          </div>

          <button
            className="btn-red"
            style={{ marginLeft: "13px", marginBottom: "5px" }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
