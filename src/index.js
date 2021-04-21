import express from "express";
import { ApolloServer } from "apollo-server-express";

import UrlDB from "./dbs/UrlDB";
import loader from "./loaders";
import pool from "./config/pool";
import config from "./config";
import typeDefs from "./schema/schema.graphql";
import resolvers from "./resolvers";

const app = express();

// Initialize database connection
pool.connect(config[config.nodeEnv]);

// Initialize app with dependencies
loader.init(app);

const appServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => ({
    UrlDB,
  }),
  dataSources: () => ({}),
  introspection: true,
});
appServer.applyMiddleware({ app, path: "/graphiql" });

loader.route(app, express);

export default { app, appServer };
