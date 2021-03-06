import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import resolvers from "./apollo/resolvers";
import typeDefs from "./apollo/schema";
import App from "./App";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  resolvers, // We will define this later
  typeDefs // We will define is later too :)
});

// This sets up our cache with a todos field for us to interact with
cache.writeData({
  data: {
    todos: []
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
