import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { typeDefs } from "./gql/schema.ts";
import mongoose from "mongoose";

const MONGO_URL = "mongodb+srv://otheruser:123456aaabbb@nebrija-cluster.ad1qt.mongodb.net/?retryWrites=true&w=majority&appName=Nebrija-Cluster";
if (!MONGO_URL) {
  throw new Error("Please provide a MongoDB connection string");
}

// Connect to MongoDB
await mongoose.connect(MONGO_URL);

console.info("🚀 Connected to MongoDB");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation
  },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8000 },
});

console.info(`🚀 Server ready at ${url}`);