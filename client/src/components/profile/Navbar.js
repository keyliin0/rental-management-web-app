import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Navbar = () => {
  return (
    <nav className="sidenav">
      <ul>
        <li>Home</li>
        <li>Listing</li>
        <li>Nearby</li>
        <li>Abous us</li>
        <li>Login</li>
      </ul>
    </nav>
  );
};

export default Navbar;
