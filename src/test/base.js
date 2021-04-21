/* eslint-disable import/no-extraneous-dependencies */
import { createTestClient } from "apollo-server-testing";
import { ApolloServer } from "apollo-server-express";
import faker from "faker";

import UrlDB from "../dbs/UrlDB";
import typeDefs from "../schema/schema.graphql";
import resolvers from "../resolvers";

const appServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => ({
    UrlDB,
  }),
  dataSources: () => ({}),
  introspection: true,
});

const createUrl = async () => {
  const url = UrlDB.insert(faker.internet.url);
  return url;
};

const client = createTestClient(appServer);

export const url = async () => createUrl();

export default {
  appServer,
  client,
  createUrl,
  url,
  faker,
};
