const { ApolloServer, gql } = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const db = require("./db");
const fs = require("fs");
const resolvers = require("./resolvers");

const port = 9000;
const typeDefs = fs.readFileSync("./schema.graphql", { encoding: "utf-8" });

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers
});

app.use(cors(), bodyParser.json());
server.applyMiddleware({ app });
app.listen(port, () => console.info(`Server started on port ${port}`));
