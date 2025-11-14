"use client";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql.anilist.co",
  }),
  cache: new InMemoryCache(),
});

export function getClient() {
  return client;
}
