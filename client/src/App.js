import React from "react";
import "./App.css";
import Home from "./components/home";
import Listing from "./components/listing";
import PropertyInfo from "./components/listing/PropertyInfo/";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./components/profile/";
import Nearby from "./components/nearby/";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { createUploadLink } from "apollo-upload-client";

const client = new ApolloClient({
  link: createUploadLink({
    uri: "http://localhost:5000/graphql",
    credentials: "include"
  }),

  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/listing" component={Listing} />
        <Route exact path="/listing/:city/:start/:end" component={Listing} />
        <Route exact path="/listing/:id" component={PropertyInfo} />
        <Route exact path="/nearby" component={Nearby} />
        <Route path="/profile" component={Profile} />
        <Footer />
      </Router>{" "}
    </ApolloProvider>
  );
}

export default App;
