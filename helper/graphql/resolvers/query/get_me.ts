import resolvers from "../../resolvers";
import { GraphQLError } from "graphql";

const get_me = async (_, params, ctx) => {
  if (!ctx.id) {
    return new GraphQLError("Not authenticated!", {
      extensions: {
        code: "AUTHENTICATION_ERROR",
      },
    });
  }
  return await resolvers.Query.get_user(_, { id: ctx.id }, ctx);
};

export default get_me;
