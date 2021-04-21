import { gql } from "apollo-server-express";

export default gql(`

    type CreateUrl {
        data: String!
    }

    # Unused but Necessary Query root type to be provided
    type Query {
        data: String
    }

    type Mutation {
        shortenURL(url: String!): CreateUrl!
    }
`);
