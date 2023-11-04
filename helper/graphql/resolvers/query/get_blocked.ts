import supabase from "@/helper/supabase/init";
import { GraphQLError } from "graphql";

const get_blocked = async (_, params, ctx) => {
  if (ctx.id != params.id || !ctx.roles.includes("admin")) {
    return new GraphQLError("You do not have sufficient permission", {
      extensions: {
        code: "PERMISSION_ERROR",
      },
    });
  }

  const { data, error } = await supabase
    .from("block")
    .select("to_user_id(*)")
    .eq("from_user_id", params.id);
  if (error) {
    return new GraphQLError("Something went wrong", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
  return data?.map((user) => user.to_user_id);
};

export default get_blocked;
