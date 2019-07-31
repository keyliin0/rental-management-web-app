import React, { Component } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { graphql } from "react-apollo";
import { CreateProperty } from "../../mutations/Property.js";
import ImageViewer from "./ImageViewer";
import _ from "lodash";

class AddListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
      guests: "",
      bathrooms: "",
      bedrooms: "",
      beds: "",
      size: "",
      description: "",
      address: "",
      city: "",
      price: "",
      minimum_stay: "",
      maximum_stay: "",
      images: [],
      images_source: [],
      errors: [],
      loading: false
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    this.props
      .mutate({
        variables: this.state
      })
      .then(() => this.props.history.push("/profile/listings"))
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors, loading: false });
      });
  }
  ReadImage(file) {
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        images_source: [...this.state.images_source, reader.result]
      });
    };
    reader.readAsDataURL(file);
  }
  handleImagesChange(files) {
    this.setState({ images: files, images_source: [] });
    let reader = new FileReader();
    for (var i = 0; i < files.length; i++) {
      this.ReadImage(files[i]);
    }
  }
  RenderErrors() {
    return _.map(this.state.errors, error => {
      return (
        <Alert key={error} variant="danger">
          {error}
        </Alert>
      );
    });
  }
  render() {
    console.log(this.state);
    return (
      <div className="addlisting">
        <div className="title">
          <h1>Add a new Listing</h1>
        </div>
        <div className="content">
          <div className="errors">{this.RenderErrors()}</div>
          <form>
            <Row>
              <Col>
                <div>
                  <div>Name</div>
                  <div className="full-input">
                    <input
                      type="text"
                      placeholder="My property"
                      value={this.state.name}
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </div>
                </div>
              </Col>
              <Col>
                <div>
                  <div> Type</div>
                  <div className="full-input">
                    <input
                      type="text"
                      placeholder="House"
                      value={this.state.type}
                      onChange={e => this.setState({ type: e.target.value })}
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <div> Guests</div>
                  <div className="full-input">
                    <input
                      type="number"
                      placeholder="0"
                      value={this.state.guests}
                      onChange={e =>
                        this.setState({ guests: parseInt(e.target.value) })
                      }
                    />
                  </div>
                </div>
              </Col>
              <Col>
                <div>
                  <div> Bathrooms</div>
                  <div className="full-input">
                    <input
                      type="number"
                      placeholder="1"
                      value={this.state.bathrooms}
                      onChange={e =>
                        this.setState({ bathrooms: parseInt(e.target.value) })
                      }
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <div> Bedrooms</div>
                  <div className="full-input">
                    <input
                      type="number"
                      placeholder="2"
                      value={this.state.bedrooms}
                      onChange={e =>
                        this.setState({ bedrooms: parseInt(e.target.value) })
                      }
                    />
                  </div>
                </div>
              </Col>
              <Col>
                <div>
                  <div> Beds</div>
                  <div className="full-input">
                    <input
                      type="number"
                      placeholder="3"
                      value={this.state.beds}
                      onChange={e =>
                        this.setState({ beds: parseInt(e.target.value) })
                      }
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <div>Size</div>
                  <div className="full-input">
                    <input
                      type="number"
                      placeholder="130 (feet)"
                      value={this.state.size}
                      onChange={e =>
                        this.setState({ size: parseInt(e.target.value) })
                      }
                    />
                  </div>
                </div>
              </Col>
              <Col>
                <div>
                  <div>Description</div>
                  <div className="full-input">
                    <input
                      type="text"
                      placeholder="Description"
                      value={this.state.description}
                      onChange={e =>
                        this.setState({ description: e.target.value })
                      }
                    />
                  </div>{" "}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <div>Address</div>
                  <div className="full-input">
                    <input
                      type="text"
                      placeholder="445 Mount Eden Road, Mount Eden, Auckland"
                      value={this.state.address}
                      onChange={e => this.setState({ address: e.target.value })}
                    />
                  </div>
                </div>
              </Col>
              <Col>
                <div>
                  <div> City</div>
                  <div className="full-input">
                    <input
                      type="text"
                      placeholder="Florida"
                      value={this.state.city}
                      onChange={e => this.setState({ city: e.target.value })}
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <div>Minimum stay</div>
                  <div className="full-input">
                    <input
                      type="number"
                      placeholder="10 days"
                      value={this.state.minimum_stay}
                      onChange={e =>
                        this.setState({
                          minimum_stay: parseInt(e.target.value)
                        })
                      }
                    />
                  </div>
                </div>
              </Col>
              <Col>
                <div>
                  <div>Maximum stay</div>
                  <div className="full-input">
                    <input
                      type="number"
                      placeholder="11 days"
                      value={this.state.maximum_stay}
                      onChange={e =>
                        this.setState({
                          maximum_stay: parseInt(e.target.value)
                        })
                      }
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <div>
                  <div> Price</div>
                  <div className="full-input">
                    <input
                      type="number"
                      placeholder="150$/night"
                      value={this.state.price}
                      onChange={e =>
                        this.setState({ price: parseInt(e.target.value) })
                      }
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <input
                  type="file"
                  onChange={e => this.handleImagesChange(e.target.files)}
                  multiple="multiple"
                />
              </Col>
            </Row>
            <ImageViewer images={this.state.images_source} />
            {this.state.loading === false ? (
              <button
                type="submit"
                className="btn-red"
                onClick={e => this.handleSubmit(e)}
              >
                Submit
              </button>
            ) : (
              <Spinner animation="border" variant="secondary" />
            )}
          </form>
        </div>
      </div>
    );
  }
}
export default graphql(CreateProperty)(AddListing);
