import { GraphQLError } from "graphql";
import supabase from "@/helper/supabase/init";

const get_users = async (_, params, ctx) => {
  if (!ctx.roles.includes("admin")) {
    return new GraphQLError("You don't have sufficient permission", {
      extensions: {
        code: "PERMISSION_ERROR",
      },
    });
  }
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    return new GraphQLError("Something went wrong", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
  return data;
};

export default get_users;
