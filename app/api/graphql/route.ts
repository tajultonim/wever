import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import resolvers from "@/helper/graphql/resolvers";
import { typeDefs } from "@/helper/graphql/types";
import contextHandeler from "@/helper/graphql/context-handeler";

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: contextHandeler,
});

export { handler as GET, handler as POST };
