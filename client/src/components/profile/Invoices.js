import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { graphql } from "react-apollo";
import { InvoicesQuery } from "../../queries/Invoice";
import _ from "lodash";
import moment from "moment";
import { withRouter } from "react-router-dom";

class Invoices extends Component {
  constructor(props) {
    super(props);
  }
  RenderInvoices() {
    return _.map(this.props.data.Invoices, invoice => {
      return (
        <Row key={invoice._id} className="invoice">
          <Col xs={3}>
            {" "}
            <div className="outer">
              <div className="inner">{invoice._id}</div>
            </div>
          </Col>
          <Col xs={3}>
            <div className="outer">
              <div className="inner">
                {moment(invoice.date).format("MMMM Do YYYY")}
              </div>
            </div>
          </Col>
          <Col xs={2}>
            <div className="outer">
              <div className="inner total">{invoice.total}$</div>
            </div>
          </Col>
          <Col xs={1}>
            <div className="outer">
              <div className="inner">
                <span className="span-status">paid</span>
              </div>
            </div>
          </Col>
          <Col xs={3}>
            <div className="outer">
              <div className="inner">
                <button
                  className="details-btn"
                  onClick={() =>
                    this.props.history.push(
                      "/profile/reservation/" + invoice.reservation._id
                    )
                  }
                >
                  Details
                </button>
              </div>
            </div>
          </Col>
        </Row>
      );
    });
  }
  render() {
    return (
      <div className="invoices">
        <div className="title">
          <h1>My Invoices</h1>
        </div>
        <div className="content">
          <Row className="header">
            <Col xs={3}>ID</Col>
            <Col xs={3}>Date</Col>
            <Col xs={2}>Total</Col>
            <Col xs={1}>Status</Col>
            <Col xs={3}>Actions</Col>
          </Row>
          {this.RenderInvoices()}
        </div>
      </div>
    );
  }
}
export default graphql(InvoicesQuery)(withRouter(Invoices));
