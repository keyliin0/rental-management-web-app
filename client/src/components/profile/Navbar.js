import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="sidenav">
        <ul>
          <li onClick={() => this.props.history.push("/profile/listings")}>
            listing
          </li>
          <li onClick={() => this.props.history.push("/profile/reservations")}>
            Reservations
          </li>
          <li onClick={() => this.props.history.push("/profile/invoices")}>
            Invoices
          </li>
          <li onClick={() => this.props.history.push("/profile/addlisting")}>
            Add listing
          </li>
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Navbar);
