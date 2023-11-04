import supabase from "@/helper/supabase/init";
import { GraphQLError } from "graphql";

const get_tokens = async (_, params, ctx) => {
  if (ctx.id != params.id || !ctx.roles.includes("admin")) {
    return new GraphQLError("You do not have sufficient permission", {
      extensions: {
        code: "PERMISSION_ERROR",
      },
    });
  }

  const { data, error } = await supabase
    .from("tokens")
    .select("*")
    .eq("user_id", params.id);
  if (error) {
    return new GraphQLError("Something went wrong", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
  return data;
};

export default get_tokens;
